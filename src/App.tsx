// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageDetails from "./pages/PageDetails";
import CategoryTab from "./components/CategoryTab";
import { DataProvider } from "./contexts/UseDataContext";
import Home from "./pages/Home";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <CategoryTab />,

//     // children: [
//     //   {
//     //     path: "product/:productID",
//     //     element: <PageDetails />,
//     //   },
//     // ],
//   },
//   {
//     path: "product/:productID",
//     element: <PageDetails />,
//   },
// ]);

function App() {
  // Render the RouterProvider with the router configuration
  return (
    <>
      {/* <DataProvider>
        <RouterProvider router={router} />
      </DataProvider> */}
      <DataProvider>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:productID" element={<PageDetails />} />
            </Routes>
          </Router>
        </div>
      </DataProvider>
    </>
  );
}

export default App;
