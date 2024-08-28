import React, { createContext, useState, useContext, ReactNode } from "react";
import useFecthData from "../hooks/useFecthData";

interface ArrayString {
  [key: string]: string | string[];
}

interface ProductProp {
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  images?: string[];
}

interface DataContextType {
  isAuthenticated?: boolean;
  handleAddToCart: (id: number) => void;
  itemInCart: ProductProp[];
  //   dataProducts: ArrayString[];
  //   handlePagination: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);
export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("accessToken");
  });
  const { singleDataProduct } = useFecthData();
  const [itemInCart, setItemInCart] = useState([]);
  const handleAddToCart = (id: number) => {
    const listArray = singleDataProduct.find((product) => product.id === id);
    // const list = JSON.stringify(listArray);
    // console.log(listArray);
    //   setUserData((prevData) => [...prevData, responseData]);
    setItemInCart((prevData) => [...prevData, listArray]);
    // localStorage.setItem("Carted", JSON.stringify(itemInCart));
    // console.log(itemInCart);
  };

  const [checked, setChecked] = useState<boolean>(false);
  // const { userLoginData } = useFetchData();

  return (
    <DataContext.Provider
      value={{
        isAuthenticated,
        itemInCart,
        handleAddToCart,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within an AuthProvider");
  }
  return context;
};
