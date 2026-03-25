import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const AllComments = () => {
  const { data: movie, refetch } = useGetAllMoviesQuery();

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId });
      toast.success("Comment Deleted");
      refetch();
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  return (
    <div>
      {movie?.map((m) => (
        <section
          key={m._id}
          className="flex flex-col justify-center items-center"
        >
          {m?.reviews.map((review) => (
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

              <button
                className="text-app-accent hover:underline"
                onClick={() => handleDeleteComment(m._id, review._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};
export default AllComments;
