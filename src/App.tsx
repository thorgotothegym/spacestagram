import React from "react";
import { Col, Row } from "antd";

import { ViewList } from "./containers/ViewList";

export const App = () => {
  return (
    <>
      <Row>
        <Col>
          <header />
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
