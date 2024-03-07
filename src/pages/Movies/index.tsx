import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../apiService";
import noImg from "../../images/img_404.jpg";
import { TMovies } from "../../types/movie";
import "./Movies.scss";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";

import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/opacity.css';

const API_KEY = process.env.REACT_APP_API;

type TMoviesProps = {
  type: string;
  setCurrentPageActive: React.Dispatch<React.SetStateAction<string>>;
};

const Movies = ({ type, setCurrentPageActive }: TMoviesProps) => {
  const [movies, setMovies] = useState<TMovies | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const [gridLayout, setGridLayout] = useState<boolean>(true);

  const settings = {
    autoplay: true,
    arrows: false,
    dots: true,
    speed: 3000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const getMovies = async () => {
      setLoading(false);
      let url = `${type}?api_key=${API_KEY}&language=en-US&page=${currentPage}`;
      const res = await api.get(url);
      setMovies(res.data);
      setTotalPage(res.data.total_pages);
      setLoading(true);
    };
    getMovies();
  }, [type, currentPage, totalPage]);

  useEffect(() => {
    switch (type) {
      case "tv/popular":
        setCurrentPageActive("TV Shows");
        break;
      case "movie/popular":
        setCurrentPageActive("Popular");
        break;
      case "trending/all/day":
        setCurrentPageActive("Trending");
        break;
      case "movie/top_rated":
        setCurrentPageActive("Top Rated");
        break;
      default:
        setCurrentPageActive("Movies");
        break;
    }
  }, [type, setCurrentPageActive]);

  return (
    <div className="archive archive--tvshow">
      {loading ? (
        <div>
          <div className="archive__first-view">
            <Slider {...settings}>
              {movies &&
                movies.results.map((movie, i) =>
                  i < 5 ? (
                    <div className="item" key={movie.id}>
                      <div
                        className="img"
                        style={{
                          backgroundImage: `url('${
                            movie.backdrop_path
                              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                              : noImg
                          }')`,
                        }}
                      ></div>
                    </div>
                  ) : (
                    ""
                  )
                )}
            </Slider>
          </div>
          <div className="archive__title">
            <h2>Now Playing</h2>
            <div className="list-control">
              <button
                className="list-control__opt"
                onClick={() => setGridLayout(true)}
              >
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                >
                  <path d="M176.792,0H59.208C26.561,0,0,26.561,0,59.208v117.584C0,209.439,26.561,236,59.208,236h117.584C209.439,236,236,209.439,236,176.792V59.208C236,26.561,209.439,0,176.792,0z M196,176.792c0,10.591-8.617,19.208-19.208,19.208H59.208C48.617,196,40,187.383,40,176.792V59.208C40,48.617,48.617,40,59.208,40h117.584C187.383,40,196,48.617,196,59.208V176.792z" />
                  <path d="M452,0H336c-33.084,0-60,26.916-60,60v116c0,33.084,26.916,60,60,60h116c33.084,0,60-26.916,60-60V60 C512,26.916,485.084,0,452,0z M472,176c0,11.028-8.972,20-20,20H336c-11.028,0-20-8.972-20-20V60c0-11.028,8.972-20,20-20h116c11.028,0,20,8.972,20,20V176z" />
                  <path d="M176.792,276H59.208C26.561,276,0,302.561,0,335.208v117.584C0,485.439,26.561,512,59.208,512h117.584C209.439,512,236,485.439,236,452.792V335.208C236,302.561,209.439,276,176.792,276z M196,452.792c0,10.591-8.617,19.208-19.208,19.208H59.208C48.617,472,40,463.383,40,452.792V335.208C40,324.617,48.617,316,59.208,316h117.584c10.591,0,19.208,8.617,19.208,19.208V452.792z" />
                  <path d="M452,276H336c-33.084,0-60,26.916-60,60v116c0,33.084,26.916,60,60,60h116c33.084,0,60-26.916,60-60V336C512,302.916,485.084,276,452,276z M472,452c0,11.028-8.972,20-20,20H336c-11.028,0-20-8.972-20-20V336c0-11.028,8.972-20,20-20h116c11.028,0,20,8.972,20,20V452z" />
                </svg>
              </button>
              <button
                className="list-control__opt"
                onClick={() => setGridLayout(false)}
              >
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 60.123 60.123"
                >
                  <path d="M57.124,51.893H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3S58.781,51.893,57.124,51.893z" />
                  <path d="M57.124,33.062H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3C60.124,31.719,58.781,33.062,57.124,33.062z" />
                  <path d="M57.124,14.231H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3S58.781,14.231,57.124,14.231z" />
                  <circle cx="4.029" cy="11.463" r="4.029" />
                  <circle cx="4.029" cy="30.062" r="4.029" />
                  <circle cx="4.029" cy="48.661" r="4.029" />
                </svg>
              </button>
            </div>
          </div>
          <ul
            className={`archive__list ${
              gridLayout ? "" : "archive__list--row"
            }`}
          >
            {movies &&
              movies.results.map((movie) => (
                <li key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>
                    <LazyLoadImage
                      className="img"
                      effect="opacity"
                      src={
                        movie.backdrop_path
                          ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                          : noImg
                      }
                    />
                    <div className="info">
                      <h2 className="name">
                        {movie.title ? movie.title : "Unknown"}
                      </h2>
                      <p className="match">
                        {movie.vote_average ? (
                          <span className="match__vote">
                            {movie.vote_average.toString()}% Match
                          </span>
                        ) : (
                          ""
                        )}
                        {movie.first_air_date ? (
                          <span className="match__year">
                            {movie.first_air_date.slice(0, 4)}
                          </span>
                        ) : (
                          ""
                        )}
                        <span className="match__adult">
                          {movie.adult ? "16+" : "13+"}
                        </span>
                      </p>
                      <p className="genres">
                        {movie.genres &&
                          movie.genres.map(
                            (item: { id: number; name: string }) => (
                              <span key={item.id}>{item.name}</span>
                            )
                          )}
                      </p>
                      <p className="overview">{movie.overview}</p>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>

          {totalPage > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={totalPage}
            />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Movies;
