import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Container, Card, Button, Pagination } from "react-bootstrap";

export default function SearchPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { cart, setCart, products, setProducts, addToCart, removeFromCart } =
    useContext(UserContext);
  return <div>SearchPage</div>;
}
