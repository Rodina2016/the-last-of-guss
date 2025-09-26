type Props = { status: string; username?: string | null };

export const RoundHeader = ({ status, username }: Props) => (
  <div className="flex justify-between items-center border-b pb-2 mb-4">
    <h2 className="font-bold text-lg">
      {status === "pending" && "Cooldown"}
      {status === "active" && "Раунд активен"}
      {status === "finished" && "Раунд завершен"}
    </h2>
    <span className="text-gray-500">{username}</span>
  </div>
);
