import axios from "axios";

import { IApod } from "./type";

export const getPhotosFromNasa = async (
  start_date: string = "2022-01-01"
): Promise<IApod[]> => {
  const { REACT_APP_SECREET } = process.env;
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const TODAYISO = today.toISOString().slice(0, 10)
  const { data } = await axios.get<IApod[]>(
    `https://api.nasa.gov/planetary/apod?start_date=${start_date}&end_date=${TODAYISO}&api_key=${REACT_APP_SECREET}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return data;
};
