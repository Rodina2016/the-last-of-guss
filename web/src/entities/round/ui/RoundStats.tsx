type Props = {
  status: string;
  myPoints: number;
  totalPoints: number;
  winner: string | null;
};

export const RoundStats = ({ status, myPoints, totalPoints, winner }: Props) => (
  <div className="mt-6 space-y-3 text-lg">
    {status === "active" && (
      <p className="text-yellow-400 font-bold text-center text-2xl animate-pulse">
        ✨ Мои очки: {myPoints}
      </p>
    )}
    {status === "finished" && (
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <p className="flex justify-between text-blue-400 font-semibold">
          <span>Всего</span>
          <span>{totalPoints}</span>
        </p>
        <p className="flex justify-between text-green-400 font-semibold">
          <span>🏆 Победитель</span>
          <span>{winner ?? "—"}</span>
        </p>
        <p className="flex justify-between text-yellow-400 font-semibold">
          <span>✨ Мои очки</span>
          <span>{myPoints}</span>
        </p>
      </div>
    )}
  </div>
);
