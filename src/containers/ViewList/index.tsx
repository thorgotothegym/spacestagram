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

  const [rangeDate, setRangeDate] = useState<Array<string>>([]);

  const formatDate = (dateStrings: Array<string>): void => {
    const date = dateStrings.slice(1);
    const dateToString = date.toString();
    setApod([]);
    setLoading(true);
    getPhotoNasa("", dateToString);
  };

  const getPhotoNasa = async (
    dateString?: string,
    optionalDate?: string
  ): Promise<void> => {
    try {
      const response = await getPhotosFromNasa(dateString, optionalDate);
      const data = await response;
      setApod([...apod, ...data]);
      setLoading(false);
    } catch (error) {
      console.log("error", JSON.stringify(error));
      setError(true);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    getPhotoNasa();
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
                    <RangeDate
                      clickHandler={(dateStrings) => {
                        setRangeDate(dateStrings);
                        formatDate(dateStrings);
                      }}
                    />
                  </WrapperRangeDate>
                ) : null}
              </AffixContent>
            </Affix>
          </>
          <ContainterViewList>
            {apod
              .sort(
                (first: IApod, second: IApod) =>
                  0 - (first.date > second.date ? 1 : -1)
              )
              .map((item: IApod, key: number) => {
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
