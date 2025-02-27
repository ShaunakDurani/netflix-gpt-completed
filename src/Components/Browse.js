import React from "react";
import { Header } from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();

  const gptState = useSelector((store) => store.gpt.showGptSearch);

  return (
    <div>
      <Header />
      {gptState ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
