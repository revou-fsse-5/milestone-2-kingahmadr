import * as React from "react";
import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";

import useFecthData from "../hooks/useFecthData";
import { useDataContext } from "../contexts/UseDataContext";
import { useEffect, useState } from "react";
import PaginationRounded from "./PaginationRounded";
import Loader from "./Loader/Loader";

const pageSize = 3;
export default function CardsProductCategories() {
  const { RotatingLoader } = Loader();

  const navigate = useNavigate();
  const {
    isLoading,
    jeweleryProducts,
    getJewelryProducts,
    // getProductInCategories,
    addSingleProductToCart,
  } = useFecthData();
  const { userToken } = useDataContext();
  useEffect(() => {
    // getProductInCategories(5);
    getJewelryProducts();
  }, []);
  const [pagination, setPagination] = useState({
    count: 5, // initial of anything
    from: 0,
    to: pageSize,
  });

  const productsSlice = jeweleryProducts.slice(pagination.from, pagination.to);
  const addToCart = (id?: string | number) => {
    const accessTokenLocal: unknown = localStorage.getItem("token");
    const rememberMe: string | null = localStorage.getItem("rememberMe");

    if (rememberMe === "true") {
      console.log("remember me", rememberMe);
      addSingleProductToCart(id);
    } else {
      if (accessTokenLocal !== userToken) {
        alert(`You must login first to add product to cart`);
        console.log(userToken);
        navigate("/login");
      } else {
        addSingleProductToCart(id);
      }
    }
  };
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({
      ...pagination,
      count: jeweleryProducts.length,
      from: from,
      to: to,
    });
  };

  const renderProducts = productsSlice.map((products, index) => (
    <Card
      sx={{
        maxWidth: "20rem",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        borderColor: "black",
        borderWidth: "medium",
        p: "0.5rem",
      }}
      key={index}
    >
      <CardMedia
        component="img"
        sx={{
          maxHeight: "20rem",
          width: "full",
        }}
        // image={products.images?.[0] ? products.images[0] : "fallback-image-url"}
        image={products.image}
        alt="Gaonok gambar e slur"
      />
      <div>
        <CardContent>
          <Typography
            variant="body2"
            sx={{ color: "black", fontSize: "1rem", m: 1 }}
          >
            {`Category: ${products.category}`}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontSize: 20, m: 1 }}
          >
            {`Price: $${products.price},00`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={() => addToCart(products.id)}
            color="primary"
            aria-label="add to shopping cart"
          >
            <AddShoppingCartIcon />
          </IconButton>
          <Button variant="contained">
            <Link to={`product/${products.id}`}>See Details</Link>
          </Button>
        </CardActions>
      </div>
    </Card>
  ));

  return (
    <>
      <div className="flex gap-10 p-10 justify-center">
        {isLoading ? RotatingLoader : <>{renderProducts}</>}
      </div>
      <div className="flex justify-center items-center p-10 mx-auto">
        <PaginationRounded
          count={Math.ceil(pagination.count / pageSize)}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
