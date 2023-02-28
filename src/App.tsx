import React, { useState } from "react";
import { Col, Row } from "antd";
import { RocketFilled, RocketTwoTone, RocketOutlined } from "@ant-design/icons";

import { ViewList } from "./containers/ViewList";

export const App = () => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <>
      <Row justify="center">
        <Col>
          <header>
            <h1
              onMouseEnter={() => {
                setHover(!hover);
              }}
            >
              {hover ? <RocketFilled /> : <RocketTwoTone />}
              Spacestagram
            </h1>
          </header>
        </Col>
      </Row>
      <Row>
        <Col>
          <main>
            <ViewList />
          </main>
        </Col>
      </Row>
      <Row>
        <Col>
          <footer />
        </Col>
      </Row>
    </>
  );
};
