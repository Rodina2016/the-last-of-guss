import { useState } from "react";

export const TapButton = ({ onTap }: { onTap: () => void }) => {
  const [isTapped, setIsTapped] = useState(false);

  const handleTap = () => {
    setIsTapped(true);
    onTap();

    // сброс цвета через 200мс
    setTimeout(() => setIsTapped(false), 200);
  };

  return (
    <button
      onClick={handleTap}
      className={`mt-8 w-full flex flex-col items-center justify-center rounded-2xl shadow-2xl py-6 transition-colors duration-200 
        ${isTapped 
          ? "bg-yellow-500 text-black" // при тапе яркий цвет
          : "bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-500 hover:to-blue-500"
        }`}
    >
      <span className="text-6xl">🦢</span>
      <span className="mt-2 text-2xl font-extrabold tracking-widest">
        TAP!
      </span>
    </button>
  );
};
