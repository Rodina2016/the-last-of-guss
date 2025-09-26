import { useParams, Link } from "react-router-dom";
import { getUser } from "../shared/lib/auth";
import { useRound, useRoundWS } from "../entities/round/hooks";
import { RoundHeader } from "../entities/round/ui/RoundHeader";
import { RoundTimer } from "../entities/round/ui/RoundTimer";
import { RoundStats } from "../entities/round/ui/RoundStats";
import { TapButton } from "../entities/round/ui/TapButton";

export default function RoundPage() {
  const { id } = useParams<{ id: string }>();
  const { data: round, isPending } = useRound(id!);
  const { data: wsData, sendTap } = useRoundWS(id!);
  const user = getUser();

  if (isPending) return <p>Загрузка...</p>;
  if (!round) return <p className="text-red-400">Раунд не найден</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-2xl shadow-2xl border border-indigo-700 space-y-4">
      <RoundHeader
        status={wsData?.status || "pending"}
        username={user?.username}
      />
      <RoundTimer
        status={wsData?.status || "pending"}
        timeLeft={wsData?.secondsLeft || 0}
      />
      <RoundStats
        status={wsData?.status ?? "pending"}
        myPoints={wsData?.myPoints ?? 0}
        totalPoints={wsData?.totalPoints ?? 0}
        winner={round?.winner || ""}
      />
      {wsData?.status === "active" && user?.role !== "admin" && (
        <TapButton onTap={sendTap} />
      )}

      {/* Кнопка назад */}
      <div className="pt-4 border-t border-gray-700">
        <Link
          to="/rounds"
          className="inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition"
        >
          ⬅ Назад к списку раундов
        </Link>
      </div>
    </div>
  );
}
