import { useState } from "react";
import { AllProductsProps } from "../interfaces";
// import { AllProductsProps } from "../interfaces";

const useFecthData = () => {
  const [dataProducts, setDataProducts] = useState<AllProductsProps[]>([]);
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

  return {
    dataProducts,
    getAllProducts,
  };
};

export default useFecthData;
