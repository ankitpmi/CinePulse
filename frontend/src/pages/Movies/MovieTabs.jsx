import { Link } from "react-router-dom";

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie }) => {
  return (
    <div>
      <section>
        {userInfo ? (
          <form onSubmit={submitHandler}>
            <div className="my-2">
              <label htmlFor="comment" className="block text-xl mb-2">
                Write a Review
              </label>

              <textarea
                id="comment"
                rows="3"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="textarea xl:w-[40rem]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn-primary"
            >
              Submit
            </button>
          </form>
        ) : (
          <p>
            Please <Link to="/login" className="text-app-secondary hover:underline">Sign In</Link> to write a review
          </p>
        )}
      </section>

      <section className="mt-[3rem]">
        <div>
          {movie?.reviews.length === 0 && (
            <p className="text-app-muted">No reviews yet</p>
          )}
        </div>

        <div>
          {movie?.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-app-surface p-4 rounded-xl w-[50%] mt-[2rem] border border-app-border"
            >
              <div className="flex justify-between">
                <strong className="text-app-muted">{review.name}</strong>
                <p className="text-app-muted">
                  {review.createdAt.substring(0, 10)}
                </p>
              </div>

              <p className="my-4">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MovieTabs;
