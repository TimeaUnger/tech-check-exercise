import { useState } from "react";

const moviesData = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    favorite: true,
  },
  {
    id: 2,
    title: "The Godfather",
    genre: "Crime",
    favorite: false,
  },
  {
    id: 3,
    title: "Gladiator",
    genre: "Action",
    favorite: false,
  },
  {
    id: 4,
    title: "Inception",
    genre: "Sci-Fi",
    favorite: true,
  },
];

interface Movie {
  id: number;
  title: string;
  genre: string;
  favorite: boolean;
}

interface MoviesListProps {
  moviesData: Movie[];
}

interface MovieCardProps {
  movie: Movie;
  handleFavorite: (id: number) => void;
}

export const App = () => {
  return <MovieList moviesData={moviesData} />;
};

export const MovieList = ({ moviesData }: MoviesListProps) => {
  const [movies, setMoviesData] = useState<Movie[]>(moviesData);

  const handleFavorite = (id: number) => {
    setMoviesData((prev) =>
      prev.map((movie) =>
        movie.id === id 
          ? { ...movie, favorite: !movie.favorite } 
          : movie,
      ),
    );
  };

  return (
    <>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          handleFavorite={handleFavorite}
        />
      ))}
    </>
  );
};

export const MovieCard = ({ movie, handleFavorite }: MovieCardProps) => {
  return (
    <>
      <div>{movie.title}</div>
      <div>{movie.genre}</div>
      <div>{movie.favorite ? "Favorite" : "Not Favorite "}</div>
      <button onClick={() => handleFavorite(movie.id)}>Add to Favorites</button>
    </>
  );
};
