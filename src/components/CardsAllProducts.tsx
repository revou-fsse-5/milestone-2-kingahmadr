import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
import { Link, useNavigate } from "react-router-dom";

import useFecthData from "../hooks/useFecthData";
import { useEffect, useState } from "react";
import PaginationRounded from "./PaginationRounded";
import { useDataContext } from "../contexts/UseDataContext";

const pageSize = 3;

export default function CardsAllProducts() {
  const navigate = useNavigate();
  const { dataProducts, getAllProducts, addSingleProductToCart } =
    useFecthData();
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
    const accessTokenLocal: unknown = localStorage.getItem("access_token");
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

  console.log(pagination.count, pagination.from, pagination.to);
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

  return (
    <>
      <div className="flex gap-10 p-10 m-10 justify-center">
        {productsSlice.map((products, index) => (
          <Card sx={{ maxWidth: 345 }} key={index}>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={products.title}
              subheader={products.description}
            />
            <CardMedia
              component="img"
              height="2rem"
              // image={
              //   products.images?.[0] ? products.images[0] : "fallback-image-url"
              // }
              image={products.image}
              alt="Gaonok gambar e slurr"
            />

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
            <CardContent>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontSize: 20, m: 1 }}
              >
                {`Price: $${products.price},00`}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center items-center p-10 my-4 mx-auto">
        <PaginationRounded
          count={Math.ceil(pagination.count / pageSize)}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
