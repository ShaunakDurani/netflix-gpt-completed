import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  //console.log(movies.PopularMovies);
  //console.log(movies.nowPlayingMovies);
  //console.log(movies.TopRatedMovies);
  return (
    <div className="bg-black">
      <div className="mt-0 md:-mt-28 relative">
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies?.nowPlayingMovies} />
        <MovieList title={"Trending"} movies={movies?.nowPlayingMovies} />
        <MovieList title={"Upcoming"} movies={movies?.nowPlayingMovies} />
        <MovieList title={"Fictional"} movies={movies?.nowPlayingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
