import React from "react";
import { Accordion, Container, Card } from "react-bootstrap";
import Map, { Marker } from "react-map-gl";
import { Link } from "react-router-dom";
import { BsInstagram, BsTwitter, BsFacebook } from "react-icons/bs";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYmFyYWEtYWxoYWRkYXIiLCJhIjoiY2xmOXprcHRhMTEyczNzbzR0Zjc1cGpocCJ9.c8nIRe52BoWy_MCZNPGhcA";

export default function About() {
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
                    <Map
                      initialViewState={{
                        longitude: 36.102744146249144,
                        latitude: 32.08101420061598,
                        zoom: 14,
                      }}
                      style={{ width: "100%", height: 400 }}
                      mapStyle="mapbox://styles/mapbox/streets-v9"
                    >
                      {" "}
                      <Marker
                        longitude={36.102744146249144}
                        latitude={32.08101420061598}
                        anchor="bottom"
                      >
                        <img
                          style={{ height: "60px", width: "60px" }}
                          src="mapbox-icon.png"
                        />
                      </Marker>
                    </Map>
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
