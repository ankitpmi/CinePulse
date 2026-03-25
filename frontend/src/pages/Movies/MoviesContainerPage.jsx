import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";

import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:justify-between items-start lg:items-start gap-8">
      <nav className="flex flex-row lg:flex-col gap-2 lg:gap-3">
        {genres?.map((g) => (
          <button
            key={g._id}
            className={`transition w-[200px] duration-300 ease-in-out block p-2 rounded-xl text-app-text border border-app-border bg-app-surface/20 hover:bg-app-surface/60 ${
              selectedGenre === g._id ? "bg-app-surface/70 border-app-accent/40" : ""
            }`}
            onClick={() => handleGenreClick(g._id)}
          >
            {g.name}
          </button>
        ))}
      </nav>

      <section className="flex flex-col justify-center items-center w-full lg:w-auto">
        <div className="w-full mb-8 ">
          <h1 className="mb-5 section-title">Recommended for you</h1>
          <SliderUtil data={randomMovies} />
        </div>

        <div className="w-full mb-8">
          <h1 className="mb-5 section-title">Top picks</h1>
          <SliderUtil data={topMovies} />
        </div>

        <div className="w-full mb-8">
          <h1 className="mb-5 section-title">Explore more</h1>
          <SliderUtil data={filteredMovies} />
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;
