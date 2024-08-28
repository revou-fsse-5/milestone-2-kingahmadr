import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import useFecthData from "../hooks/useFecthData";

interface ArrayString {
  [key: string]: string | string[];
}

interface ProductProp {
  isAuthenticated: boolean;
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  images?: string[];
}

interface DataContextType {
  isAuthenticated?: boolean;
  total: number;
  addCartTotalContext: () => void;
  // handleAddToCart: (id: number) => void;
  // itemInCart: ProductProp[];
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
  useEffect(() => addCartTotalContext(), []);
  const [total, setTotal] = useState(0);
  const addCartTotalContext = () => {
    const existingCartItems = JSON.parse(
      localStorage.getItem("Carted") || "[]"
    );
    const itemTotal = existingCartItems.length;
    setTotal(itemTotal);
  };

  const [checked, setChecked] = useState<boolean>(false);
  // const { userLoginData } = useFetchData();

  return (
    <DataContext.Provider
      value={{
        isAuthenticated,
        total,
        addCartTotalContext,
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
