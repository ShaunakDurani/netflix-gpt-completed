import React from "react";
import { MovieCards } from "./MovieCards";

const MovieList = ({ title, movies }) => {
  //console.log(movies);
  return (
    <div className="px-6">
      <h1 className="py-4 text-2xl text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCards key={movie?.id} movieID={movie?.backdrop_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
