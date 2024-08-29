import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface userLoginProps {
  access_token: string;
}

interface DataContextType {
  isAuthenticated?: boolean;
  triggerInContext: boolean;
  userToken?: userLoginProps;
  total: number;
  addCartTotalContext: () => void;
  handleTrigger: () => void;
  login: () => void;
  handleToken: (access_token: userLoginProps) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);
export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("access_token");
  });
  const [total, setTotal] = useState(0);
  const [triggerInContext, setTriggerInContext] = useState(false);
  const [userToken, setUserToken] = useState<userLoginProps>();
  // const [checked, setChecked] = useState<boolean>(false);
  // useEffect(() => {
  //   const valueRememberMe = localStorage.getItem("rememberMe");
  //   if (valueRememberMe) {
  //     setIsAuthenticated(true);
  //   }
  //   console.log(isAuthenticated);
  // }, [isAuthenticated]);
  const login = () => {
    setIsAuthenticated(true);
  };
  const handleToken = (access_token: userLoginProps) => {
    setUserToken(access_token);
  };
  const handleTrigger = () => {
    setTriggerInContext(!triggerInContext);
  };
  const addCartTotalContext = () => {
    const existingCartItems = JSON.parse(
      localStorage.getItem("Carted") || "[]"
    );
    const itemTotal = existingCartItems.length;
    setTotal(itemTotal);
  };
  useEffect(() => addCartTotalContext(), [triggerInContext]);

  return (
    <DataContext.Provider
      value={{
        isAuthenticated,
        triggerInContext,
        total,
        userToken,
        handleToken,
        login,
        addCartTotalContext,
        handleTrigger,
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
