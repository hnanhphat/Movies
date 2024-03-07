export type TMovie = {
  id?: number;
  backdrop_path?: string;
  title?: string;
  overview?: string;
  adult?: boolean;
  original_name?: string;
  poster_path?: string;
  vote_average?: string;
  first_air_date?: string;
  media_type?: string;
  release_date?: string;
  genres?: {
    id: number;
    name: string;
  }[];
};

export type TMovies = {
  results: TMovie[];
};

export type TTrailer = {
  key: string;
}[];

export type TPopup = {
  movie?: TMovie | null;
  setMovie?: React.Dispatch<React.SetStateAction<TMovie | null>>;
  setShowTrailer?: React.Dispatch<React.SetStateAction<boolean>>;
};
