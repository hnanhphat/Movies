import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TMovie } from "../../types/movie";
import api from "../../apiService";
import noImg from "../../images/img_404.jpg";
import { TTrailer } from "../../types/movie";
import "./MovieTrailer.scss";

type TMovieTrailerProps = {
  movie: TMovie | null;
  showTrailer: boolean;
  setShowTrailer: React.Dispatch<React.SetStateAction<boolean>>;
};

const API_KEY = process.env.REACT_APP_API;

const MovieTrailer = ({
  movie,
  showTrailer,
  setShowTrailer,
}: TMovieTrailerProps) => {
  const [trailer, setTrailer] = useState<TTrailer | null>(null);

  useEffect(() => {
    const getTrailer = async () => {
      if (showTrailer && movie && movie.id !== undefined) {
        let url = `${movie.adult === false ? "movie" : "tv"}/${
          movie.id
        }/videos?api_key=${API_KEY}&language=en-US`;
        const res = await api.get(url);
        setTrailer(res.data.results);
      }
    };
    getTrailer();
  }, [movie, showTrailer]);

  return movie && showTrailer ? (
    <div className={`modal ${showTrailer && "modal--active"}`}>
      <div className="modal-backdrop"></div>
      <div className="modal-dialog">
        <div className="md-header">
          <div className="md-header__ttl">{movie.title}</div>
          <button
            className="md-header__close"
            onClick={() => {
              setShowTrailer(false);
              setTrailer(null);
            }}
          >
            ×
          </button>
        </div>
        <div className="md-body">
          {trailer && trailer.length === 0 ? (
            <div
              className="img"
              style={{ backgroundImage: `url('${noImg}')` }}
            ></div>
          ) : (
            <div className="video">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${
                  trailer && trailer[trailer.length - 1].key
                }?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
        <div className="md-footer">
          <button className="md-footer__add">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="plus"
              className="svg-inline--fa fa-plus fa-w-14"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
              ></path>
            </svg>
            Add to Favorites
          </button>
          <Link
            to={`/movie/${movie && movie.id}`}
            className="md-footer__more"
            onClick={() => setShowTrailer(false)}
          >
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
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MovieTrailer;
