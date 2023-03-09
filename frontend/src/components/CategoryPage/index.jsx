import React, { useState, useContext, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function CategoryPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    token,
    setToken,
    userId,
    setUserId,
    isLoggedIn,
    setIsLoggedIn,
    cart,
    setCart,
    userName,
    setUserName,
    userRole,
    setUserRole,
    userData,
    setUserData,
    products,
    setProducts,
    categories,
    setCategories,
  } = useContext(UserContext);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/category/${id}`)
      .then((result) => {
        setCategoryProducts(result.data.products);
        setCategoryName(result.data.categoryName);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [categoryProducts, categoryName]);
  return (
    <>
      <Container>
        <div style={{ margin: "5px" }}>
          <h4 style={{ fontWeight: "lighter", marginTop: "15px" }}>
            {categoryName}
          </h4>
        </div>
        <div className="products-box">
          {categoryProducts.map((product) => {
            return (
              <>
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
                        if (!isLoggedIn) {
                        }
                      }}
                      variant="warning"
                    >
                      Add to cart
                    </Button>
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </div>
      </Container>
    </>
  );
}
