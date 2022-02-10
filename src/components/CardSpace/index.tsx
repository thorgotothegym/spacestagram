import React, { useState } from "react";

import { Button, Card } from "antd";
import { HeartTwoTone, LikeTwoTone, ShareAltOutlined } from "@ant-design/icons";

import styled from "styled-components";

import { IPicture } from "./type";

const BlockButtons = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

export const CardSpace = ({
  date,
  explanation,
  url,
  title,
  media_type,
}: IPicture): JSX.Element => {
  const useLocalStorage = (key: string, initialValue: boolean) => {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });
    const setValue = (value: any) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    };
    return [storedValue, setValue];
  };

  const [like, setLike] = useLocalStorage(date, false);

  return (
    <section>
      <Card
        style={{ width: 500, marginBottom: 10 }}
        cover={
          media_type === "image" ? (
            <img src={url} alt={title} />
          ) : (
            <>
              <embed width="400" height="350" src={url} />
            </>
          )
        }
      >
        <h1>{title}</h1>
        <h3>{date}</h3>
        <p>{explanation}</p>
        <BlockButtons>
          <Button
            type="link"
            size="middle"
            block
            icon={
              like ? <LikeTwoTone twoToneColor="#eb2f96" /> : <HeartTwoTone />
            }
            onClick={() => setLike(!like)}
          />
          <Button
            title="Do you want to share?"
            size="middle"
            type="link"
            block
            icon={<ShareAltOutlined />}
            onClick={() => alert("share to love")}
          />
        </BlockButtons>
      </Card>
    </section>
  );
};
