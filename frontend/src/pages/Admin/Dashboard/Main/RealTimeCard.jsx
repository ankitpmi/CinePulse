import { useGetUsersQuery } from "../../../../redux/api/users";
import PrimaryCard from "./PrimaryCard";

const RealTimeCard = () => {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="w-[30rem] mt-10 bg-app-surface text-app-text rounded-xl border border-app-border shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-2">Realtime</h2>
      <p className="text-app-muted mb-4">Update Live</p>
      <div className="border-t border-app-border my-7"></div>
      <h2 className="text-2xl font-bold mb-2">{visitors?.length}</h2>
      <p className="text-app-muted mb-2">Subscribe</p>
      <hr />

      <PrimaryCard />
    </div>
  );
};

export default RealTimeCard;
