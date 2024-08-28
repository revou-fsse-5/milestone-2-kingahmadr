import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "../components/Navbar";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

// import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { useDataContext } from "../contexts/UseDataContext";

export default function CartPage() {
  const [value, setValue] = useState([]);
  //   const { storage, getValue } = useLocalStorage();
  const [trigger, setTrigger] = useState(false);
  const { handleTrigger } = useDataContext();
  useEffect(() => {
    const storeData = localStorage.getItem("Carted");
    const itemArray = storeData ? JSON.parse(storeData) : [];

    const aggregatedItems = itemArray.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.title === item.title);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
      return acc;
    }, []);

    setValue(aggregatedItems);
    console.log(aggregatedItems);
  }, [trigger]);
  //   const handleRemoveFromCart = () => {
  //     const storeData = localStorage.getItem("Carted");
  //     const itemArray = storeData ? JSON.parse(storeData) : [];
  //     const filteredItems = itemArray.filter((i) => i.id === itemArray.id);

  //     filteredItems.remove();
  //     console.log("item array local storage", itemArray);
  //   };
  const handleRemoveFromCart = (idToRemove) => {
    const storeData = localStorage.getItem("Carted");
    const itemArray = storeData ? JSON.parse(storeData) : [];

    // Filter out the item with the given id
    const filteredItems = itemArray.filter((i) => i.id !== idToRemove);

    // Update localStorage with the filtered array
    setTrigger(!trigger);
    handleTrigger();
    localStorage.setItem("Carted", JSON.stringify(filteredItems));

    console.log("Updated item array in localStorage", filteredItems);
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto">
        <TableContainer
          component={Paper}
          sx={{
            p: 4,
            width: "auto",
            mx: "auto",
            m: "2rem",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Items</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {value.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{`$ ${row.price},00`}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  {/* <TableCell align="right">{row.id}</TableCell> */}
                  <TableCell align="right">
                    <IconButton
                      color="primary.contrastText"
                      aria-label="add to shopping cart"
                      onClick={() => handleRemoveFromCart(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="absolute right-8">
        <Button variant="contained" onClick={() => getLocalItemToArray()}>
          Checkout
        </Button>
      </div>
    </>
  );
}
