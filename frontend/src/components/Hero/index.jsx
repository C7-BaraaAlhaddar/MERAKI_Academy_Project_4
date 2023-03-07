import React from "react";
import { Carousel, Container } from "react-bootstrap";

export default function Hero() {
  return (
    <Container>
      <Carousel fade>
        <Carousel.Item>
          <img
            style={{ borderRadius: "0.375rem", maxHeight: "600px" }}
            className="d-block w-100"
            src="https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-iPhone-14-Plus-hero-220907_Full-Bleed-Image.jpg.large.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ borderRadius: "0.375rem", maxHeight: "600px" }}
            className="d-block w-100"
            src="https://www.apple.com/v/apple-watch-se/j/images/meta/gps-lte__eksacwutyu2q_og.png?202211100419"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ borderRadius: "0.375rem", maxHeight: "600px" }}
            className="d-block w-100"
            src="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/business/matebook-b7/imgs03/huawei-matebook-b7-kv.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}
