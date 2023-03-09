import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Container, Card, Button, Pagination } from "react-bootstrap";
import axios from "axios";

export default function ProductsPage() {
  const navigate = useNavigate();
  const { cart, setCart, products, setProducts, addToCart, removeFromCart } =
    useContext(UserContext);
  const [page, setPage] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product?from=${page}`)
      .then((result) => {
        setProducts(result.data.products);
        localStorage.setItem("products", JSON.stringify(result.data.products));
      })
      .catch((error) => console.log(error.response.data.message));
  }, [page]);
  return (
    <>
      <Container>
        <div style={{ margin: "5px" }}>
          <h4
            className="title-name"
            style={{ fontWeight: "lighter", marginTop: "15px" }}
          >
            <span>All Products</span>
          </h4>
        </div>
        <div className="products-box">
          {products.map((product) => {
            return (
              <Card
                key={product._id}
                style={{ width: "18rem", margin: "10px auto" }}
              >
                <Card.Img
                  onClick={() => {
                    navigate(`/product/${product._id}`);
                  }}
                  style={{ height: "18rem", cursor: "pointer" }}
                  variant="top"
                  src={product.img}
                />
                <Card.Body>
                  <Card.Title style={{ fontSize: "15px" }}>
                    {product.label}
                  </Card.Title>
                  <Card.Text style={{ fontSize: "15px" }}>
                    {product.price} JD
                  </Card.Text>
                  <Button
                    onClick={(e) => {
                      const included = cart.find((e) => e._id === product._id);
                      if (!included) {
                        addToCart(product._id);
                      }
                    }}
                    variant="warning"
                  >
                    Add to cart
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
        <Pagination style={{ display: "flex", justifyContent: "center" }}>
          <Pagination.Prev
            onClick={(e) => {
              if (page > 0) {
                setPage(page - 8);
              }
            }}
          />

          <Pagination.Next
            onClick={(e) => {
              if (products.length === 8) {
                setPage(page + 8);
              }
            }}
          />
        </Pagination>
      </Container>
    </>
  );
}
