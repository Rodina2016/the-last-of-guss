type Props = { status: string; timeLeft: number };

export const RoundTimer = ({ status, timeLeft }: Props) => {
  if (status === "pending") return <p>До начала: {formatTime(timeLeft)}</p>;
  if (status === "active") return <p>До конца: {formatTime(timeLeft)}</p>;
  return null;
};

function formatTime(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
