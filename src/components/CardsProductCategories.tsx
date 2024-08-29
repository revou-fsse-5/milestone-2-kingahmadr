import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";

import useFecthData from "../hooks/useFecthData";
import { useDataContext } from "../contexts/UseDataContext";
import { useEffect, useState } from "react";
import PaginationRounded from "./PaginationRounded";

const pageSize = 3;
export default function CardsProductCategories() {
  const navigate = useNavigate();
  const {
    dataProductInCategories,
    getProductInCategories,
    addSingleProductToCart,
  } = useFecthData();
  const { userToken } = useDataContext();
  useEffect(() => {
    getProductInCategories(5);
  }, []);
  const [pagination, setPagination] = useState({
    count: 5, // initial of anything
    from: 0,
    to: pageSize,
  });

  const productsSlice = dataProductInCategories.slice(
    pagination.from,
    pagination.to
  );
  const addToCart = (id?: string | number) => {
    const accessTokenLocal: any = localStorage.getItem("access_token");
    if (accessTokenLocal !== userToken) {
      alert(`You must login first to add product to cart`);
      console.log(userToken);
      navigate("/login");
    } else {
      addSingleProductToCart(id);
    }
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({
      ...pagination,
      count: dataProductInCategories.length,
      from: from,
      to: to,
    });
  };

  const renderProducts = productsSlice.map((products, index) => (
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
        height="194"
        image={products.images[0]}
        alt="Gaonok gambar e slur"
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
  ));

  return (
    <>
      <div className="flex gap-10 p-10 m-10 justify-center">
        {renderProducts}
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
