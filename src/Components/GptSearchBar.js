import React, { useRef } from "react";
import lang from "./languageConstants";
import { useSelector } from "react-redux";
import { API_OPTIONS } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../Utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.langconfig.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  //Search movie in TMDB
  const searchMovieTmdb = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    const query =
      "Act like a movie recommendation system and suggest some movies for the query" +
      searchText?.current?.value +
      ". Only give me names of 5 movies, comma separated like the example result give ahead. Example Result: Golmaal, 3 Idiots, Maharaja, Gadar, Mufasa";

    const { GoogleGenerativeAI } = require("@google/generative-ai");

    const genAI = new GoogleGenerativeAI(
      "AIzaSyBXqmUy0xK2h7dyVdIWvEe6Nm5evmWH6I8"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(query);
    //console.log(result.response.text());

    const gptMovies = result.response.text().split(",");
    //console.log(gptMovies);

    //For each movie search them on the TMDB API.
    const promiseArray = gptMovies.map((movie) => searchMovieTmdb(movie));
    const tmdbResults = await Promise.all(promiseArray);
    //console.log(tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[35%] md:pt-40 flex justify-center">
      <form
        className="w-full md:w-6/12 p-4 m-4 bg-black rounded-lg grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-3 col-span-9 mr-3 rounded-lg"
          type="text"
          placeholder={lang[langKey].gptPlaceholderText}
        ></input>
        <button
          className="p-2 bg-red-500 col-span-3 rounded-lg hover:bg-red-700"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
