import { useState } from "react";
import { AllProductsProps } from "../interfaces";
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
  const { addCartTotalContext } = useDataContext();

  const navigate = useNavigate();
  const getAllProducts = async () => {
    const API_URL = "https://api.escuelajs.co/api/v1";
    try {
      const response = await fetch(`${API_URL}/products?limit=30&offset=1`, {
        method: "GET",
      });
      if (!response.ok) {
        // throw new Error(`Error fetching data: ${response.statusText}`);
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
        // throw new Error(`Error fetching data: ${response.statusText}`);
        alert(`Error fetching Single Products: ${response.statusText}`);
        navigate("/");
      }
      const responseData = await response.json();
      setSingleDataProduct([responseData]);
      // console.log(responseData);
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
        // throw new Error(`Error fetching data: ${response.statusText}`);
        alert(`Error fetching Single Products: ${response.statusText}`);
        navigate("/");
      }
      const responseData = await response.json();
      // Retrieve existing cart items from localStorage
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
        // throw new Error(`Error fetching data: ${response.statusText}`);
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
        // throw new Error(`Error fetching data: ${response.statusText}`);
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
    getSingleProducts,
    getAllProducts,
    getProductInCategories,
    getShoesProducts,
    addSingleProductToCart,
  };
};

export default useFecthData;
// import { AllProductsProps } from "../interfaces";

// // Fetch all products
// export const getAllProducts = async (): Promise<AllProductsProps[]> => {
//   const API_URL = "https://api.escuelajs.co/api/v1";
//   try {
//     const response = await fetch(`${API_URL}/products?limit=30&offset=1`, {
//       method: "GET",
//     });
//     if (!response.ok) {
//       throw new Error(`Error fetching Products: ${response.statusText}`);
//     }
//     const responseData: AllProductsProps[] = await response.json();
//     return responseData;
//   } catch (error) {
//     throw new Error(`Error fetching Products: ${error}`);
//   }
// };

// // Fetch electronic products
// export const getElectronicProducts = async (): Promise<AllProductsProps[]> => {
//   const API_URL = "https://api.escuelajs.co/api/v1";
//   try {
//     const response = await fetch(
//       `${API_URL}/categories/2/products?limit=30&offset=1`,
//       {
//         method: "GET",
//       }
//     );
//     if (!response.ok) {
//       throw new Error(`Error fetching Electronics: ${response.statusText}`);
//     }
//     const responseData: AllProductsProps[] = await response.json();
//     return responseData;
//   } catch (error) {
//     throw new Error(`Error fetching Electronics: ${error}`);
//   }
// };

// // Fetch shoes products
// export const getShoesProducts = async (): Promise<AllProductsProps[]> => {
//   const API_URL = "https://api.escuelajs.co/api/v1";
//   try {
//     const response = await fetch(
//       `${API_URL}/categories/4/products?limit=30&offset=1`,
//       {
//         method: "GET",
//       }
//     );
//     if (!response.ok) {
//       throw new Error(`Error fetching Shoes: ${response.statusText}`);
//     }
//     const responseData: AllProductsProps[] = await response.json();
//     return responseData;
//   } catch (error) {
//     throw new Error(`Error fetching Shoes: ${error}`);
//   }
// };
