import noImg from "../../images/img_404.jpg";
import { TPopup } from "../../types/movie";
import "./MovieCard.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const MovieCard = ({ movie, setMovie, setShowTrailer }: TPopup) => {
  return movie ? (
    <div>
      <div className="movie-card">
        <button
          className="movie-card__box"
          onClick={() => {
            setMovie && setMovie(movie);
            setShowTrailer && setShowTrailer(true);
          }}
        >
          <LazyLoadImage
            className="movie-card__poster"
            effect="opacity"
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                : noImg
            }
          />
          <div className="movie-card__info">
            <h2 className="title">
              {movie.title
                ? movie.title
                : movie.original_name
                ? movie.original_name
                : "Unknown"}
            </h2>
          </div>
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MovieCard;
