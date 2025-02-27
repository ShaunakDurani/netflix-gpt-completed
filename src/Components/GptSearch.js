import React from "react";
import GptSearchBar from "./GptSearchBar";
import { BG_IMAGE } from "../Utils/constants";
import GptMovieSuggesstions from "./GptMovieSuggesstions";

const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-20">
        <img
          className="h-screen object-cover"
          src={BG_IMAGE}
          alt="bg-image"
        ></img>
      </div>
      <div className="pt-[20%] md:p-0">
        <GptSearchBar />
        <GptMovieSuggesstions />
      </div>
    </>
  );
};

export default GptSearch;
