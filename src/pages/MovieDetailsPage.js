import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);

  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="my-10">
      <div className="w-full h-[600px] relative">
        <div className="bg-black bg-opacity-70 w-full h-full absolute"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 mb-10">
        <img
          src={tmdbAPI.imageOriginal(poster_path)}
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <h1 className=" text-center text-white text-4xl font-bold mb-10">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex justify-center gap-10  mb-10">
          {genres.map((item) => (
            <span className="border-primary border py-2 px-4" key={item.id}>
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center max-w-[600px] mx-auto mb-10">{overview}</p>
      <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar>
    </div>
  );
}

function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieType(movieId, "credits"), fetcher);
  if (!data) return null;
  const { cast } = data;
  return (
    <>
      <h2 className="text-center text-3xl mb-10">Casts</h2>
      <div className="">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {cast.length > 0 &&
            cast.map((item) => (
              <SwiperSlide
                key={item.id}
                style={{ width: "300px" }}
                className="select-none"
              >
                <img
                  src={tmdbAPI.imageOriginal(item.profile_path)}
                  alt=""
                  className="w-full h-[350px] object-cover rounded-lg mb-3"
                />
                <h3 className="text-xl font-medium">{item.name}</h3>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}

function MovieVideos() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieType(movieId, "videos"), fetcher);

  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10 mt-10">
      {results.slice(0, 1).map((item) => (
        <div key={item.id} className="">
          <iframe
            width="810"
            height="506"
            src={`https://www.youtube.com/embed/${item.key}`}
            title="CSS Grid cơ bản cho người mới toàn tập phần 1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-[1000px] h-[500px] object-fill mx-auto"
          ></iframe>
        </div>
      ))}
    </div>
  );
}

function MovieSimilar() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieType(movieId, "similar"), fetcher);
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  console.log(results);
  return (
    <div className="py-10">
      <h2 className="capitalize text-3xl font-bold mb-10">similar movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
