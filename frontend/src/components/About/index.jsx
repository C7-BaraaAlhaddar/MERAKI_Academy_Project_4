import React, { useRef, useEffect, useState } from "react";
import { Accordion, Container, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { BsInstagram, BsTwitter, BsFacebook } from "react-icons/bs";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYmFyYWEtYWxoYWRkYXIiLCJhIjoiY2xmOXprcHRhMTEyczNzbzR0Zjc1cGpocCJ9.c8nIRe52BoWy_MCZNPGhcA";

export default function About() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(36.102744146249144);
  const [lat, setLat] = useState(32.08101420061598);
  const [zoom, setZoom] = useState(18);
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <div style={{ margin: "10px" }}>
      <Container>
        <div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                How much does the delivery cost ?
              </Accordion.Header>
              <Accordion.Body style={{ textAlign: "start" }}>
                Its free.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                Why are we the best in the business?
              </Accordion.Header>
              <Accordion.Body style={{ textAlign: "start" }}>
                Because.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div>
            {" "}
            <div>
              <div style={{ margin: "10px" }}>
                <Card>
                  <Card.Header style={{ padding: "10px" }}>
                    <strong>Our location</strong>
                  </Card.Header>
                  <Card.Body>
                    {" "}
                    <div ref={mapContainer} className="map-container" />
                  </Card.Body>
                </Card>{" "}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "10px",
                }}
              >
                <Link target={"_blank"} to={`https://twitter.com/baraaweeb`}>
                  <BsTwitter size={30} />
                </Link>
                <Link
                  target={"_blank"}
                  style={{ color: "black" }}
                  to={`https://www.instagram.com/baraaweeb/`}
                >
                  <BsInstagram size={30} />
                </Link>
                <Link
                  target={"_blank"}
                  to={`https://web.facebook.com/baraa.alhaddar/`}
                >
                  {" "}
                  <BsFacebook size={30} />
                </Link>
              </div>
            </div>
          </div>{" "}
        </div>
      </Container>
    </div>
  );
}
