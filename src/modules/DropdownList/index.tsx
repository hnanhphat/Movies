import { TMovie } from "../../types/movie";
import noImg from "../../images/img_404.jpg";
import './DropdownList.scss';

const DropdownList = ({ movie }: { movie: TMovie }) => {
  return (
    <div className="dropdown-item">
      <div
        className="img"
        style={{
          backgroundImage: `url('${
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
              : noImg
          }')`,
        }}
      ></div>
      <div className="info">
        <p className="title">{movie.title}</p>
        <p className="time">{movie.release_date}</p>
      </div>
    </div>
  );
};

export default DropdownList;
