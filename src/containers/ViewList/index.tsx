import React, { useEffect, useState } from "react";

import axios from "axios";

import { Col, Row } from "antd";

import { Picture } from "../../components/Picture";
import { IApod } from "./type";

export const ViewList = (): JSX.Element => {
  const { REACT_APP_SECREET } = process.env;
  const [apod, setApod] = useState<IApod[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    const dataApi = async (): Promise<void> => {
      try {
        const response = await axios.get<IApod[]>(
          `https://api.nasa.gov/planetary/apod?api_key=${REACT_APP_SECREET}&count=10`
        );
        const data = await response.data;
        setApod([...apod, ...data]);
      } catch (error) {}
    };
    dataApi();
    return () => {
      controller.abort();
      console.log("cancel");
    };
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly"
        }}
      >
        {apod.map((item: IApod, key: number) => {
          return (
            <Picture
              date={item.date}
              explanation={item.explanation}
              url={item.url}
              title={item.title}
              key={key.toString()}
            />
          );
        })}
      </div>
    </>
  );
};
