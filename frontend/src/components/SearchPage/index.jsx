import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Container, Card, Button, Pagination, Spinner } from "react-bootstrap";
import axios from "axios";

export default function SearchPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(UserContext);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/search/${name}`)
      .then((result) => {
        setSearchResult(result.data.products);
      })
      .catch((error) => console.log(error.response.data.message));
  }, [name]);

  return (
    <>
      <Container>
        <div style={{ margin: "5px" }}>
          <h4
            className="title-name"
            style={{ fontWeight: "lighter", marginTop: "15px" }}
          >
            <span>Search results</span>
          </h4>
        </div>
        {searchResult.length > 0 ? (
          <>
            <div className="products-box">
              {searchResult.map((product) => {
                return (
                  <Card
                    key={product._id}
                    style={{ width: "18rem", margin: "10px auto" }}
                  >
                    <Card.Img
                      onClick={() => {
                        navigate(`/product/${product._id}`);
                      }}
                      style={{
                        height: "18rem",
                        cursor: "pointer",
                        padding: "5px",
                      }}
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
                          const included = cart.find(
                            (e) => e._id === product._id
                          );
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
          </>
        ) : (
          <Spinner
            style={{
              height: "300px",
              width: "300px",
              margin: "auto",
              marginTop: "30px",
            }}
            animation="border"
            variant="warning"
          />
        )}
      </Container>
    </>
  );
}
