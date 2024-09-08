import * as React from "react";
import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

import useFecthData from "../hooks/useFecthData";
import { useEffect, useState } from "react";
import PaginationRounded from "./PaginationRounded";
import { useDataContext } from "../contexts/UseDataContext";
import Loader from "./Loader/Loader";

const pageSize = 3;

export default function CardsAllProducts() {
  const navigate = useNavigate();
  const { isLoading, dataProducts, getAllProducts, addSingleProductToCart } =
    useFecthData();
  const { RotatingLoader } = Loader();

  const { userToken } = useDataContext();

  useEffect(() => {
    getAllProducts();
  }, []);
  const [pagination, setPagination] = useState({
    count: 5, // initial of anything
    from: 0,
    to: pageSize,
  });

  const addToCart = (id?: string | number) => {
    const accessTokenLocal: unknown = localStorage.getItem("token");
    const rememberMe: string | null = localStorage.getItem("rememberMe");

    if (rememberMe === "true" && accessTokenLocal) {
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

  // console.log(pagination.count, pagination.from, pagination.to);
  const productsSlice = dataProducts.slice(pagination.from, pagination.to);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({
      ...pagination,
      count: dataProducts.length,
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
        height="2rem"
        // image={
        //   products.images?.[0] ? products.images[0] : "fallback-image-url"
        // }
        image={products.image}
        alt="Gaonok gambar e slurr"
        sx={{
          maxHeight: "20rem",
          width: "full",
        }}
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
            <Link to={`${products.id}`}>See Details</Link>
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
