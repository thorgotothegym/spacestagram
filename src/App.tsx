import React from "react";
import { Col, Row } from "antd";
import { RocketFilled } from "@ant-design/icons";

import { ViewList } from "./containers/ViewList";

export const App = () => {
  return (
    <>
      <Row>
        <Col>
          <header>
            <h1>
              <RocketFilled />
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
