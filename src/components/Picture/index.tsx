import React from "react";

import { Button, Card } from "antd";

import { IPicture } from "./type";

const { Meta } = Card;

export const Picture = ({
  date,
  explanation,
  url,
  title,
}: IPicture): JSX.Element => {
  return (
    <article>
      <Card style={{ width: 300 }} title={title} cover={<img src={url} alt={title} />}>
        <Meta title={explanation} description={date} />
      </Card>
    </article>
  );
};
