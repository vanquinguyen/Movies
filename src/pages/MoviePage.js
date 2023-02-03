import React, { useEffect, useState } from "react";
import { fetcher, tmdbAPI } from "../config";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import ReactPaginate from "react-paginate";

const itemsPerPage = 20;

function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState();
  const [nextPage, setNextPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const [url, setUrl] = useState(tmdbAPI.getMoviePage("popular", nextPage));
  const { data, error } = useSWR(url, fetcher);
  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);

  const loading = !data && !error;
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (filter) {
      setUrl(tmdbAPI.getMoviePageFilter(filter, nextPage));
    } else {
      setUrl(tmdbAPI.getMoviePage("popular", nextPage));
    }
  }, [filter, nextPage]);

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data]);

  const handlePageClick = (e) => {
    setNextPage(e.selected + 1);
  };

  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <input
          className="w-full p-4 bg-slate-800 outline-none text-white"
          placeholder="Type Here ..."
          onChange={handleChange}
        />
        <button className="p-4 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>

      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
}

export default MoviePage;
