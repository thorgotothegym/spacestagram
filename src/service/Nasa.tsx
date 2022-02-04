import axios from "axios";

import { IApod } from "./type";

export const getPhotosFromNasa = async (
  start_date: string = "2022-01-01",
  end_date: string = "2022-01-20"
): Promise<IApod[]> => {
  const { REACT_APP_SECREET } = process.env;
  const { data } = await axios.get<IApod[]>(
    `https://api.nasa.gov/planetary/apod?start_date=${start_date}&end_date=${end_date}&api_key=${REACT_APP_SECREET}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return data;
};
