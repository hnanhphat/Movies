import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import api from '../../apiService';
import noImg from '../../images/img_404.jpg';
import { TPopup } from 'types/movie';
import "./Detail.scss";

const API_KEY = process.env.REACT_APP_API;

const Detail = ({ movie, setMovie, setShowTrailer }: TPopup) => {
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let url = `movie/${id}?api_key=${API_KEY}&language=en-US`;
      const res = await api.get(url);
      setMovie && setMovie(res.data);
    };
    fetchData();
  }, [setMovie, id]);

  return movie ? (
    <div id="movie-detail" className="movie-detail">
      <div className="movie-detail__bg" style={{backgroundImage: `url('${movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : noImg}')`}}></div>
      <div className="movie-detail__container">
        <div className="poster">
          <img src={`${movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : noImg}`} alt={movie.title ? movie.title : 'Unknown'}/>
        </div>
        <div className="info">
          <h2 className="name">{movie.title ? movie.title : 'Unknown'}</h2>
          <p className="match">
            {movie.vote_average ? <span className="match__vote">{movie.vote_average.toString()}% Match</span> : ''}
            {movie.first_air_date ? <span className="match__year">{movie.first_air_date.slice(0, 4)}</span> : ''}
            <span className="match__adult">{movie.adult ? "16+" : "13+"}</span>
          </p>
          <p className="genres">
            {movie.genres && movie.genres.map((item: {id: number; name: string}) => <span key={item.id}>{item.name}</span>)}
          </p>
          <p className="overview">{movie.overview}</p>
          <div className="btn">
            <button className="red">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" className="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
              Add to My List
            </button>
            <button className="white" onClick={() => setShowTrailer && setShowTrailer(true)}>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" className="svg-inline--fa fa-play fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : <></>
}

export default Detail