import React from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";
import SecondaryContainer from "./SecondaryContainer";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return;

  const mainMovie = movies[6];
  //console.log(mainMovie);

  const { original_title, overview, id } = mainMovie;

  return (
    <div className="pt-[40%] bg-black md:py-0">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground id={id} />
      <SecondaryContainer />
    </div>
  );
};

export default MainContainer;
