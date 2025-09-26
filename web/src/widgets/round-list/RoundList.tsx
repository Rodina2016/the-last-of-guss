import { Link } from "react-router-dom";
import type { Round } from "../../entities/round/hooks";
import { formatDate } from "../../shared/lib/formatDate";
import { getUser } from "../../shared/lib/auth";
import { useEffect, useState } from "react";

function getStatus(now: number, startAt: string, endAt: string): "pending" | "active" | "finished" {
  const start = new Date(startAt).getTime();
  const end = new Date(endAt).getTime();

  if (now < start) return "pending";
  if (now > end) return "finished";
  return "active";
}

type Props = {
  rounds: Round[];
};

export const RoundList = ({ rounds }: Props) => {
  const user = getUser();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ul className="mt-6 space-y-6">
      {rounds.map((r) => {
        const totalPoints = r.scores.reduce((sum, s) => sum + s.points, 0);
        const winnerScore = r.scores[0]?.points ?? 0;
        const myPoints =
          r.scores.find((s) => s.user.username === user?.username)?.points ?? 0;

        const status = getStatus(now, r.startAt, r.endAt);

        return (
          <li
            key={r.id}
            className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-200"
          >
            <Link to={`/rounds/${r.id}`} className="flex flex-col gap-3 w-full p-5">
              <div className="flex justify-between items-center">
                <span className="text-xs tracking-widest uppercase text-gray-400">
                  Round {r.id.slice(0, 6)}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-lg ${
                    status === "active"
                      ? "bg-green-700 text-white"
                      : status === "pending"
                      ? "bg-yellow-600 text-white"
                      : "bg-gray-600 text-white"
                  }`}
                >
                  {status}
                </span>
              </div>

              <div className="text-sm text-gray-400">
                <span>Начало: {formatDate(r.startAt)}</span> •{" "}
                <span>Окончание: {formatDate(r.endAt)}</span>
              </div>

              <div className="mt-3 space-y-2 text-base font-semibold">
                <div className="flex justify-between border-b border-gray-700 pb-1">
                  <span>Всего</span>
                  <span className="text-blue-400">{totalPoints}</span>
                </div>

                {r.winner && (
                  <div
                    className={`flex justify-between border-b border-gray-700 pb-1 ${
                      r.winner === user?.username ? "text-green-400" : "text-yellow-400"
                    }`}
                  >
                    <span>🏆 Победитель – {r.winner}</span>
                    <span>{winnerScore}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>✨ Мои очки</span>
                  <span
                    className={`${
                      r.winner === user?.username ? "text-green-400" : "text-indigo-400"
                    }`}
                  >
                    {myPoints}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
