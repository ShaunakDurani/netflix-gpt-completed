import React from "react";
import { IMG_CDN_URL } from "../Utils/constants";

export const MovieCards = ({ movieID }) => {
  if (!movieID) return;

  return (
    <div className="w-60 pr-4">
      <img alt="movie_poster" src={IMG_CDN_URL + movieID}></img>
    </div>
  );
};
