import { useGetUsersQuery } from "../../../../redux/api/users";

const PrimaryCard = () => {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="w-[100%] h-[10%] bg-app-surface text-app-text rounded-xl p-6 border border-app-border shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
      <h2 className="text-2xl font-bold mb-4">Welcome to CinePulse</h2>
      <p className="text-app-muted">You have {visitors?.length} new users watching your content.</p>
    </div>
  );
};

export default PrimaryCard;
