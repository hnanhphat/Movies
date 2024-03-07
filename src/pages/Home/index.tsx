import { Link } from "react-router-dom";
import { TMovies, TPopup } from "../../types/movie";
import FirstView from "../../modules/FirstView";
import MovieCarousel from "../../modules/MovieCarousel";
import Pagination from "../../components/Pagination";
import noImg from "../../images/img_404.jpg";
import "./Home.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useEffect } from "react";

type THomeProps = TPopup & {
  setCurrentPageActive: React.Dispatch<React.SetStateAction<string>>;
  search: TMovies | null;
  setSearch: React.Dispatch<React.SetStateAction<TMovies | null>>;
  searchCurrentPage: number;
  setSearchCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  searchTotalPage: number;
};

const Home = ({
  movie,
  setMovie,
  setShowTrailer,
  setCurrentPageActive,
  search,
  setSearch,
  searchCurrentPage,
  setSearchCurrentPage,
  searchTotalPage,
}: THomeProps) => {
  useEffect(() => {
    if (search) {
      setCurrentPageActive("");
    } else {
      setCurrentPageActive("Home");
    }
  }, [search, setCurrentPageActive]);

  return search ? (
    <div className="search">
      <div className="search__title">
        <h2>Search Results:</h2>
        <button onClick={() => setSearch(null)}>×</button>
      </div>
      <ul className="search__list">
        {search.results.map((movie) => (
          <li key={movie.id}>
            <Link to={`/${movie.media_type}/${movie.id}`}>
              <LazyLoadImage
                className="img"
                effect="opacity"
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    : noImg
                }
              />
            </Link>
          </li>
        ))}
      </ul>
      {searchTotalPage > 1 && (
        <Pagination
          currentPage={searchCurrentPage}
          setCurrentPage={setSearchCurrentPage}
          totalPage={searchTotalPage}
        />
      )}
    </div>
  ) : (
    <div>
      <FirstView
        movie={movie}
        setMovie={setMovie}
        setShowTrailer={setShowTrailer}
      />

      {/* NOW PLAYING */}
      <MovieCarousel
        setMovie={setMovie}
        setShowTrailer={setShowTrailer}
        txt="Now Playing"
        type="movie/now_playing"
        url="movies"
      />

      {/* POPULAR */}
      <MovieCarousel
        setMovie={setMovie}
        setShowTrailer={setShowTrailer}
        txt="New &amp; Popular"
        type="movie/popular"
        url="popular"
      />

      {/* TV SHOW */}
      <MovieCarousel
        setMovie={setMovie}
        setShowTrailer={setShowTrailer}
        txt="TV Shows"
        type="tv/popular"
        url="tvshows"
      />

      {/* TRENDING */}
      <MovieCarousel
        setMovie={setMovie}
        setShowTrailer={setShowTrailer}
        txt="Trending"
        type="trending/all/day"
        url="trending"
      />

      {/* TOP RATED */}
      <MovieCarousel
        setMovie={setMovie}
        setShowTrailer={setShowTrailer}
        txt="Top Rated"
        type="movie/top_rated"
        url="toprated"
      />
    </div>
  );
};

export default Home;
