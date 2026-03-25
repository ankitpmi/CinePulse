import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div key={movie._id} className="relative group m-[2rem] rounded-xl overflow-hidden">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.image}
          alt={movie.name}
          className="w-[20rem] h-[20rem] m-0 p-0 transition duration-300 ease-in-out transform group-hover:scale-[1.02]"
        />
      </Link>

      <p className="absolute inset-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 bg-gradient-to-t from-app-surface/90 via-app-surface/30 to-transparent flex items-end p-4">
        <span className="text-app-text font-semibold">{movie.name}</span>
      </p>
    </div>
  );
};

export default MovieCard;
