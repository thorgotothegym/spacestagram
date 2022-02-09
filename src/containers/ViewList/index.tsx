import React, { useEffect, useState } from "react";

import { Alert, Image, Affix, Button } from "antd";
import { getPhotosFromNasa } from "../../service/Nasa";

import { CardSpace } from "../../components/CardSpace";
import { RangeDate } from "../../components/DatePicker";
import { IApod } from "./type";

import styled from "styled-components";

import monster404 from "../../image/monster-404.jpg";
import { SearchOutlined } from "@ant-design/icons";

const StyleError = styled.div`
  text-align: center;
`;

const WrapperRangeDate = styled.div`
  flex-direction: row;
`;

const AffixContent = styled.div`
  display: flex;
`;

const ContainterViewList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const ViewList = (): JSX.Element => {
  const [apod, setApod] = useState<IApod[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [dummy, setDummy]= useState<any>();

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  console.log("today", today.toISOString().slice(0, 10));

  useEffect(() => {
    const controller = new AbortController();
    const dataApi = async (): Promise<void> => {
      try {
        const response = await getPhotosFromNasa();
        const data = await response;
        setApod([...apod, ...data]);
        setLoading(false);
      } catch (error) {
        console.log("error", JSON.stringify(error));
        setError(true);
      }
    };
    dataApi();
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      {loading ? (
        <Alert
          message="Loading nice experiencies"
          description="Do not worry i am loading the data from the NASA"
          type="info"
          showIcon
        />
      ) : (
        <article>
          {error === true ? (
            <StyleError>
              <Alert
                message="Something went wrong! I think this monster ate something"
                type="error"
              />
              <Image width={200} src={monster404} alt="404" />
            </StyleError>
          ) : null}
          <>
            <Affix offsetTop={120} onChange={(affixed) => console.log(affixed)}>
              <AffixContent>
                <Button
                  icon={<SearchOutlined />}
                  type="primary"
                  onClick={() => {
                    setShowFilter(!showFilter);
                  }}
                />
                {showFilter ? (
                  <WrapperRangeDate>
                    <RangeDate clickHandler={ (dateStrings) => {
                      setDummy(dateStrings); console.log('at', dateStrings)
                    }}/>
                  </WrapperRangeDate>
                ) : null}
              </AffixContent>
            </Affix>
          </>
          <ContainterViewList>
            {apod.map((item: IApod, key: number) => {
              return (
                <CardSpace
                  date={item.date}
                  explanation={item.explanation}
                  url={item.url}
                  title={item.title}
                  media_type={item.media_type}
                  key={key.toString()}
                />
              );
            })}
          </ContainterViewList>
        </article>
      )}
    </>
  );
};
