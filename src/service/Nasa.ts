import axios from "axios";

import { IApod } from "./type";

export const getPhotosFromNasa = async (
  start_date: string = "2023-01-01",
  optional_date?: string
): Promise<IApod[]> => {
  const { REACT_APP_SECREET } = process.env;
  const formatTodayDate = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    return today.toISOString().slice(0, 10);
  };
  const { data } = await axios.get<IApod[]>(
    `https://api.nasa.gov/planetary/apod?start_date=${
      start_date !== "" ? start_date : optional_date
    }&end_date=${formatTodayDate()}&api_key=${REACT_APP_SECREET}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return data;
};
