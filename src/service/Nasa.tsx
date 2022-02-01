import axios from "axios";

import { IApod } from "./type";

export const getNasa = async (count: string): Promise<IApod[]> => {
  const { REACT_APP_SECREET } = process.env;
  const { data } = await axios.get<IApod[]>(
    `https://api.nasa.gov/planetary/apod?api_key=${REACT_APP_SECREET}&count=${count}`
  );
  return data;
};
