import { useState } from "react";
import { AllProductsProps, UserProps } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../contexts/UseDataContext";

const useFecthData = () => {
  const [dataProducts, setDataProducts] = useState<AllProductsProps[]>([]);
  const [dataProductInCategories, setDataProductInCategories] = useState<
    AllProductsProps[]
  >([]);
  const [dataShoes, setDataShoes] = useState<AllProductsProps[]>([]);
  const [singleDataProduct, setSingleDataProduct] = useState<
    AllProductsProps[]
  >([]);
  const [itemInCart, setItemInCart] = useState(0);
  const { userToken, handleToken, addCartTotalContext, login } =
    useDataContext();

  const navigate = useNavigate();

  const userLogin = async (data: UserProps, isChecked: boolean) => {
    const API_URL = "https://api.escuelajs.co/api/v1";
    const bodyData = JSON.stringify(data);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyData,
      });
      if (!response.ok) {
        alert(`Error On Login: ${response.statusText}`);
        return;
      }
      const responseData = await response.json();
      handleToken(responseData.access_token);
      console.log(userToken);
      if (isChecked) {
        localStorage.setItem("rememberMe", "true");
      }
      login();
      alert(`Login Success`);

      localStorage.setItem("access_token", responseData.access_token);
      console.log(responseData.access_token);
      navigate("/");
    } catch (error) {
      alert(`Error On Login: ${error}`);
    }
  };
  const registerUser = async (data: UserProps) => {
    const API_URL = "https://api.escuelajs.co/api/v1";
    const bodyData = JSON.stringify(data);

    try {
      const response = await fetch(`${API_URL}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyData,
      });
      if (!response.ok) {
        alert(`Error Adding new user: ${response.statusText}`);
        return;
      }
      const responseData = await response.json();
      alert(`Success adding new user`);
      navigate("/login");

      console.log(responseData);
    } catch (error) {
      alert(`Error Adding new user: ${error}`);
    }
  };
  const getAllProducts = async () => {
    const API_URL = "https://api.escuelajs.co/api/v1";
    try {
      const response = await fetch(`${API_URL}/products?limit=30&offset=1`, {
        method: "GET",
      });
      if (!response.ok) {
        alert(`Error fetching Products: ${response.statusText}`);
      }
      const responseData = await response.json();
      setDataProducts(responseData);

      console.log(responseData);
    } catch (error) {
      alert(`Error fetching data Products: ${error}`);
    }
  };
  const getSingleProducts = async (id: string | undefined) => {
    const API_URL = "https://api.escuelajs.co/api/v1";
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "GET",
      });
      if (!response.ok) {
        alert(`Error fetching Single Products: ${response.statusText}`);
        navigate("/");
      }
      const responseData = await response.json();
      setSingleDataProduct([responseData]);
    } catch (error) {
      alert(`Error fetching data Single Products: ${error}`);
      navigate("/");
    }
  };
  const addSingleProductToCart = async (id: string | undefined) => {
    const API_URL = "https://api.escuelajs.co/api/v1";
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "GET",
      });
      if (!response.ok) {
        alert(`Error fetching Single Products: ${response.statusText}`);
        navigate("/");
      }
      const responseData = await response.json();

      const existingCartItems = JSON.parse(
        localStorage.getItem("Carted") || "[]"
      );
      // Check if the item already exists in the cart
      // const itemExists = existingCartItems.find(
      //   (item: { id: string }) => item.id === id
      // );

      // if (itemExists) {
      //   alert("This item is already in your cart.");
      //   return;
      // }

      existingCartItems.push(responseData);

      localStorage.setItem("Carted", JSON.stringify(existingCartItems));

      const itemTotal = existingCartItems.length;
      setItemInCart(itemTotal);
      addCartTotalContext();
      console.log("Hook item Total", itemTotal);
      return responseData;
    } catch (error) {
      alert(`Error fetching data Single Products: ${error}`);
      navigate("/");
    }
  };

  const getProductInCategories = async (id: number) => {
    const API_URL = "https://api.escuelajs.co/api/v1";
    try {
      const response = await fetch(
        `${API_URL}/categories/${id}/products?limit=30&offset=1`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        alert(`Error fetching Product In Categories: ${response.statusText}`);
      }
      const responseData = await response.json();
      setDataProductInCategories(responseData);

      console.log(responseData);
    } catch (error) {
      alert(`Error fetching Product In Categories: ${error}`);
    }
  };
  const getShoesProducts = async () => {
    const API_URL = "https://api.escuelajs.co/api/v1";
    try {
      const response = await fetch(
        `${API_URL}/categories/4/products?limit=30&offset=1`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        alert(`Error fetching Books: ${response.statusText}`);
      }
      const responseData = await response.json();
      setDataShoes(responseData);

      console.log(responseData);
    } catch (error) {
      alert(`Error fetching Books: ${error}`);
    }
  };

  return {
    dataProducts,
    dataProductInCategories,
    dataShoes,
    singleDataProduct,
    itemInCart,
    userLogin,
    getSingleProducts,
    getAllProducts,
    getProductInCategories,
    getShoesProducts,
    addSingleProductToCart,
    registerUser,
  };
};

export default useFecthData;
