import * as React from "react";
// import { styled } from "@mui/material/styles";
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
import { useEffect, useState } from "react";
import PaginationRounded from "./PaginationRounded";
import { useDataContext } from "../contexts/UseDataContext";

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

const pageSize = 3;
export default function CardsShoesProducts() {
  const navigate = useNavigate();
  const { dataShoes, getShoesProducts, addSingleProductToCart } =
    useFecthData();
  const { userToken } = useDataContext();

  useEffect(() => {
    getShoesProducts();
  }, []);
  const [pagination, setPagination] = useState({
    count: 5, // initial of anything
    from: 0,
    to: pageSize,
  });

  console.log(
    pagination.count,
    pagination.from,
    pagination.to,
    "Data Products: ",
    dataShoes.length
  );
  const productsSlice = dataShoes.slice(pagination.from, pagination.to);
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
      count: dataShoes.length,
      from: from,
      to: to,
    });
  };

  //   const [expanded, setExpanded] = React.useState(false);

  //   const handleExpandClick = () => {
  //     setExpanded(!expanded);
  //   };

  const renderProducts = productsSlice.map((products, index) => (
    <Card sx={{ maxWidth: 345 }} key={index}>
      <CardHeader
        //   avatar={
        //     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //       R
        //     </Avatar>
        //   }
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
        alt="Gak onok Gambar e slur"
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
