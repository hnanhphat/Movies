import { useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../apiService";
import noImg from "../../images/img_404.jpg";
import { TPopup } from "../../types/movie";
import "./FirstView.scss";

const API_KEY = process.env.REACT_APP_API;

const FirstView = ({ movie, setMovie, setShowTrailer }: TPopup) => {
  useEffect(() => {
    const getMovie = async () => {
      let url = `movie/791373?api_key=${API_KEY}&language=en-US`;
      const res = await api.get(url);
      setMovie && setMovie(res.data);
    };
    getMovie();
  }, [setMovie]);

  return (
    <div
      className="first-view"
      style={{
        backgroundImage: `url('${
          movie && movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : noImg
        }')`,
      }}
    >
      <div className="first-view__container">
        <h1 className="title">{movie && movie.title}</h1>
        <p className="overview">{movie && movie.overview}</p>
        <div className="group">
          <div className="btn">
            <Link
              to="/"
              className="btn__play"
              onClick={() => setShowTrailer && setShowTrailer(true)}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="play"
                className="svg-inline--fa fa-play fa-w-14"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                ></path>
              </svg>
              Play
            </Link>
            <Link to={`/movie/${movie && movie.id}`} className="btn__more">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="info-circle"
                className="svg-inline--fa fa-info-circle fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
                ></path>
              </svg>
              More Info
            </Link>
          </div>
          <div className="rated">{movie && movie.adult ? "16+" : "13+"}</div>
        </div>
      </div>
    </div>
  );
};

export default FirstView;
