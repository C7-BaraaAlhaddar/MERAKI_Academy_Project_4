import React, { useState, useContext, useEffect } from "react";
import { Container, Card, Button, Pagination } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function CategoryPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { cart, setCart, addToCart, removeFromCart } = useContext(UserContext);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/category/${id}?from=${page}`)
      .then((result) => {
        if (result.data.products) {
          setCategoryProducts(result.data.products);
          setCategoryName(result.data.categoryName);
        } else {
          setPage(lastPage);
        }
      })
      .catch((error) => {
        setPage(lastPage);
        console.log(error.response.data.message);
      });
  }, [categoryProducts, categoryName, page]);
  return (
    <>
      <Container>
        <div style={{ margin: "5px" }}>
          <h4
            className="title-name"
            style={{ fontWeight: "lighter", marginTop: "15px" }}
          >
            <span>{categoryName}</span>
          </h4>
        </div>
        <div className="products-box">
          {categoryProducts.map((product) => {
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
                setLastPage(page);
                setPage(page - 8);
              }
            }}
          />

          <Pagination.Next
            onClick={(e) => {
              setLastPage(page);
              setPage(page + 8);
            }}
          />
        </Pagination>
      </Container>
    </>
  );
}
