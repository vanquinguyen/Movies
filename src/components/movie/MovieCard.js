import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config";
import Button from "../button/Button";

function MovieCard({ item }) {
  const { release_date, poster_path, title, vote_average, id } = item;
  const navigate = useNavigate();

  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
      <img
        src={tmdbAPI.image500(poster_path)}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-60 mb-10">
          <span>{release_date}</span>
          <span>{vote_average}</span>
        </div>

        <Button
          onClick={() => navigate(`/movie/${id}`)}
          children="Watch Now"
          bgColor="secondary"
        />
      </div>
    </div>
  );
}

export default MovieCard;
