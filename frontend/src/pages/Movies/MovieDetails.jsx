import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();

      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 pt-24">
        <Link to="/" className="inline-flex text-app-text font-semibold hover:underline">
          Back to Movies
        </Link>

        <div className="mt-10">
          <div className="flex justify-center items-center">
          <img
            src={movie?.image}
            alt={movie?.name}
            className="w-full max-w-3xl rounded-xl border border-app-border"
          />
          </div>

          {/* Container One */}
          <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-10">
            <section>
              <h2 className="text-4xl sm:text-5xl my-2 font-extrabold text-app-text">
                {movie?.name}
              </h2>
              <p className="mt-4 text-app-muted max-w-[46rem]">
                {movie?.detail}
              </p>
            </section>

            <div>
              <p className="text-2xl font-semibold text-app-text">
                Release year: {movie?.year}
              </p>

              <div className="mt-6">
                {movie?.cast.map((c) => (
                  <p key={c._id} className="text-app-muted mt-2">
                    {c}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <MovieTabs
              loadingMovieReview={loadingMovieReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              movie={movie}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
