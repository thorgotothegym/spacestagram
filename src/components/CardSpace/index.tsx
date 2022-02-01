import React, { useEffect, useState } from "react";

import { Button, Card } from "antd";
import { HeartFilled } from "@ant-design/icons";

import { IPicture } from "./type";

interface IHistory {
  date: string;
  isFav: boolean;
}

export const CardSpace = ({
  date,
  explanation,
  url,
  title,
}: IPicture): JSX.Element => {
  const [like, setLike] = useState<boolean>(false);
  const [meme, setMeme] = useState<IHistory[]>([]);

  /* const handleClick = () => {
    let notesStorage = localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes") || "")
      : [];
    const existe = notesStorage.filter((item: string) => {
      if (item === date) {
        return true;
      } else {
        return false;
      }
    });
    console.log('existe', existe)
    notesStorage.push(date);
    localStorage.setItem("notes", JSON.stringify(notesStorage));
  }; */
  const handleClick = () => {
    setLike(!like);
    const obj = {
      date: date,
      isFav: like,
    };
    setMeme([...meme, obj]);
    // let create store
    let items = JSON.parse(localStorage.getItem("favs") || "");
    items = items.filter((item: string) => item !== item);
    localStorage.setItem("favs", JSON.stringify(items));
    if (items.length === 0) {
      localStorage.removeItem("item");
    }
  };
  return (
    <section>
      <Card
        style={{ width: 500, marginBottom: 10 }}
        cover={<img src={url} alt={title} />}
      >
        <h1>{title}</h1>
        <h3>{date}</h3>
        <p>{explanation}</p>
        {like ? <>true</> : <>false</>}
        <Button
          type="primary"
          danger={like ? true : false}
          shape="circle"
          icon={<HeartFilled />}
          onClick={() => handleClick()}
        />
      </Card>
    </section>
  );
};
