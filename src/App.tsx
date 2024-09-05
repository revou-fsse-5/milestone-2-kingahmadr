// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageDetails from "./pages/PageDetails";
// import CategoryTab from "./components/CategoryTab";
import { DataProvider } from "./contexts/UseDataContext";
import HomePage from "./pages/Home";
import CartPage from "./pages/CartPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./modules/ProtectedRoute";
import Pages404 from "./pages/Pages404";

const router = createBrowserRouter([
  {
    path: "/products",
    element: <HomePage />,
    // children: [
    //   {
    //     path: "/products/:productID",
    //     element: <PageDetails />,
    //   },
    // ],
  },
  {
    path: "/products/:productID",
    element: <PageDetails />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/checkout",
        element: <CartPage />,
      },
    ],
  },
  // {
  //   path: "/checkout",
  //   element: <CartPage />,
  // },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Pages404 />,
  },
]);

function App() {
  // Render the RouterProvider with the router configuration
  return (
    <>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
      {/* <DataProvider>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:productID" element={<PageDetails />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/checkout" element={<CartPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </DataProvider> */}
    </>
  );
}

export default App;
