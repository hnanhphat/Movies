import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../apiService";
import MovieCard from "../../components/MovieCard";
import "./MovieCarousel.scss";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import { TMovies, TMovie, TPopup } from "../../types/movie";

const API_KEY = process.env.REACT_APP_API;

type MovieCarouselProps = TPopup & {
  txt: string;
  type: string;
  url: string;
};

const MovieCarousel = ({
  setMovie,
  setShowTrailer,
  txt,
  type,
  url,
}: MovieCarouselProps) => {
  const [movies, setMovies] = useState<TMovies | null>(null);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "4vw",
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  useEffect(() => {
    const getMovies = async () => {
      let url = `${type}?api_key=${API_KEY}&language=en-US&page=1`;
      const res = await api.get(url);
      setMovies(res.data);
    };
    getMovies();
  }, [type]);

  return (
    <div id="movies-popular" className="movies movies--popular">
      <Link to={`/${url}`} className="movies__title">
        {txt}
        <span>Explore All</span>
      </Link>
      <Slider {...settings}>
        {movies &&
          movies.results.map((movie: TMovie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              setMovie={setMovie}
              setShowTrailer={setShowTrailer}
            />
          ))}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
