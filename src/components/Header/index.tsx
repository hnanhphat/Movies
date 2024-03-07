import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../images/avatar.png";
import { TMovies } from "../../types/movie";
import api from "../../apiService";
import Loading from "../../components/Loading";
import DropdownList from "../../modules/DropdownList";
import "./Header.scss";

const API_KEY = process.env.REACT_APP_API;

type THeaderProps = {
  currentPageActive: string;
  setCurrentPageActive: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<TMovies | null>>;
  searchCurrentPage: number;
  setSearchCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchTotalPage: React.Dispatch<React.SetStateAction<number>>;
};

const Header = ({
  currentPageActive,
  setCurrentPageActive,
  setSearch,
  searchCurrentPage,
  setSearchCurrentPage,
  setSearchTotalPage,
}: THeaderProps) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("");
  const [movies, setMovies] = useState<TMovies | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>("");

  const handleSearch = async () => {
    navigate(`/`);
    setCurrentPageActive("Home");
    let url = `search/movie?query=${keyword}&include_adult=false&language=en-US&page=${searchCurrentPage}`;
    const res = await api.get(url);
    setSearch(res.data);
    setSearchTotalPage(res.data.total_pages);
  };

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 100) {
        setStatus("header--scroll");
      } else {
        setStatus("");
      }
    };
  }, [status]);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(false);
      let url = `movie/upcoming?api_key=${API_KEY}&language=en-US&page=${currentPage}`;
      const res = await api.get(url);
      setMovies((currentMovies) => {
        // If there are already movies in the state, concatenate the new results array
        if (currentMovies) {
          return {
            ...currentMovies,
            results: [...currentMovies.results, ...res.data.results],
          };
        } else {
          // If there are no current movies, set the results to the new results array
          return { results: res.data.results };
        }
      });
      setLoading(true);
    };
    getMovies();
  }, [currentPage]);

  useEffect(() => {
    if (!keyword) return;
    const handleSearchChange = async () => {
      let url = `search/movie?query=${keyword}&include_adult=false&language=en-US&page=${searchCurrentPage}`;
      const res = await api.get(url);
      setSearch(res.data);
      setSearchTotalPage(res.data.total_pages);
    };
    handleSearchChange();
  }, [setSearch, setSearchTotalPage, keyword, searchCurrentPage]);

  return (
    <header className={`header ${status ? "header--scroll" : ""}`}>
      <div className="hd-left">
        <Link to="/" className="hd-left__logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1896.206"
            height="509.458"
            viewBox="0 0 1896.206 509.458"
          >
            <g id="logo" transform="translate(-779.155 -774.176)">
              <path
                id="Path_1"
                data-name="Path 1"
                d="M2040.791,774.176h-79.848v446.571q108.849,3.745,216.794,10.956v-78.677q-68.287-4.555-136.946-7.741Zm634.57.045h-87.714L2529.83,908.232l-51.943-134.011h-86.4l92.844,239.46L2382.984,1248.6q42.057,4.1,83.927,8.735l58.946-136.589,58.374,150.569q45.6,5.864,91,12.309l.133-.052L2571.341,1015.3Zm-988.514,442.623,79.852-.017V1035.174h108.244V956.5H1766.7V853.61h143.059V774.225h-222.91ZM1388.665,853.6h83.572v367.917q39.857-1.507,79.849-2.529V853.6h83.569V774.221h-246.99Zm-272.989,390.784q110.393-10.032,221.8-16.477v-78.686q-71.179,4.114-141.952,9.7V1039.81c30.957-.308,71.721-1.253,107.834-.8V960.322c-28.851-.07-75.221.4-107.834.82V853.61h141.952V774.225h-221.8ZM959.041,1062.5l-104-288.277H779.155v509.412Q819,1277.96,859,1272.757V995.74l92.473,265.642q43.627-5.058,87.415-9.57V774.221h-79.85ZM2243.566,1236.44q39.983,3.06,79.861,6.593V774.221h-79.861Z"
                transform="translate(0 0)"
                fill="#ed1c24"
              />
            </g>
          </svg>
        </Link>
        <ul className="hd-left__directory">
          <li>
            <Link
              to="/"
              onClick={() => setCurrentPageActive("Home")}
              className={currentPageActive === "Home" ? "current" : ""}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/tvshows"
              onClick={() => setCurrentPageActive("TV Shows")}
              className={currentPageActive === "TV Shows" ? "current" : ""}
            >
              TV Shows
            </Link>
          </li>
          <li>
            <Link
              to="/movies"
              onClick={() => setCurrentPageActive("Movies")}
              className={currentPageActive === "Movies" ? "current" : ""}
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              to="/popular"
              onClick={() => setCurrentPageActive("Popular")}
              className={currentPageActive === "Popular" ? "current" : ""}
            >
              New &amp; Popular
            </Link>
          </li>
          <li>
            <Link
              to="/trending"
              onClick={() => setCurrentPageActive("Trending")}
              className={currentPageActive === "Trending" ? "current" : ""}
            >
              Trending
            </Link>
          </li>
          <li>
            <Link
              to="/toprated"
              onClick={() => setCurrentPageActive("Top Rated")}
              className={currentPageActive === "Top Rated" ? "current" : ""}
            >
              Top Rated
            </Link>
          </li>
          <li>
            <Link
              to="/mylist"
              onClick={() => setCurrentPageActive("My List")}
              className={currentPageActive === "My List" ? "current" : ""}
            >
              My List
            </Link>
          </li>
        </ul>
      </div>
      <div className="hd-right">
        <ul className="hd-right__personal">
          <li>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearchCurrentPage(1);
                handleSearch();
              }}
            >
              <input
                type="text"
                name="searchInput"
                placeholder="Titles, people, genres"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setKeyword(e.target.value)
                }
              />
              <button type="submit">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search"
                  className="svg-inline--fa fa-search fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  ></path>
                </svg>
              </button>
            </form>
          </li>
          <li>
            <Link to="/">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="gift"
                className="svg-inline--fa fa-gift fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"
                ></path>
              </svg>
            </Link>
          </li>
          <li className="dropdown">
            <Link to="/">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="bell"
                className="svg-inline--fa fa-bell fa-w-14"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"
                ></path>
              </svg>
            </Link>
            <div className="dropdown__list">
              {movies &&
                movies.results.map((movie) => <DropdownList movie={movie} />)}
              {loading ? "" : <Loading />}
              <button
                className="dropdown__btn"
                onClick={() => setCurrentPage((state) => state + 1)}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="spinner"
                  className="svg-inline--fa fa-spinner fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"
                  ></path>
                </svg>
                Load more
              </button>
            </div>
          </li>
          <li>
            <Link to="/">
              <div
                className="avatar"
                style={{ backgroundImage: `url('${avatar}')` }}
              ></div>
              <div className="caret"></div>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
