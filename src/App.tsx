import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TMovies, TMovie } from "./types/movie";
import "./App.scss";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import MovieTrailer from "./modules/MovieTrailer";

/* PAGES */
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Movies from "./pages/Movies";

function App() {
  const [movie, setMovie] = useState<TMovie | null>(null);
  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  const [currentPageActive, setCurrentPageActive] = useState<string>("Home");

  const [search, setSearch] = useState<TMovies | null>(null);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [searchTotalPage, setSearchTotalPage] = useState(1);

  const getOnLineStatus = () =>
    typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
      ? navigator.onLine
      : true;

  const [status, setStatus] = useState(getOnLineStatus());

  const setOnline = () => setStatus(true);
  const setOffline = () => setStatus(false);

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  return (
    <BrowserRouter>
      <Header
        currentPageActive={currentPageActive}
        setCurrentPageActive={setCurrentPageActive}
        setSearch={setSearch}
        searchCurrentPage={searchCurrentPage}
        setSearchCurrentPage={setSearchCurrentPage}
        setSearchTotalPage={setSearchTotalPage}
      />

      <Routes>
        <Route
          path="/"
          index
          element={
            <Home
              movie={movie}
              setMovie={setMovie}
              setShowTrailer={setShowTrailer}
              setCurrentPageActive={setCurrentPageActive}
              search={search}
              setSearch={setSearch}
              searchCurrentPage={searchCurrentPage}
              setSearchCurrentPage={setSearchCurrentPage}
              searchTotalPage={searchTotalPage}
            />
          }
        />
        <Route
          path="/movie/:id"
          element={
            <Detail
              movie={movie}
              setMovie={setMovie}
              setShowTrailer={setShowTrailer}
            />
          }
        />
        <Route
          path="/tvshows"
          element={
            <Movies
              type="tv/popular"
              setCurrentPageActive={setCurrentPageActive}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <Movies
              type="movie/now_playing"
              setCurrentPageActive={setCurrentPageActive}
            />
          }
        />
        <Route
          path="/popular"
          element={
            <Movies
              type="movie/popular"
              setCurrentPageActive={setCurrentPageActive}
            />
          }
        />
        <Route
          path="/trending"
          element={
            <Movies
              type="trending/all/day"
              setCurrentPageActive={setCurrentPageActive}
            />
          }
        />
        <Route
          path="/toprated"
          element={
            <Movies
              type="movie/top_rated"
              setCurrentPageActive={setCurrentPageActive}
            />
          }
        />
      </Routes>

      {/* NOTIFICATION */}
      {!status && <Notification />}

      {/* MOVIE TRAILER */}
      <MovieTrailer
        movie={movie && movie}
        showTrailer={showTrailer}
        setShowTrailer={setShowTrailer}
      />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
