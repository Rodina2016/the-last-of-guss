import { Link } from "react-router-dom";
import { getUser } from "../../../shared/lib/auth";
import { LogoutButton } from "../../../features/auth/ui/LogoutButton";

export function Header() {
  const user = getUser();

  return (
    <header className="w-full bg-gray-900 text-white shadow px-4 py-3 flex justify-between items-center">
      <Link to="/rounds" className="text-lg font-bold text-indigo-400">
        🦆 The Last of Guss
      </Link>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-gray-300">{user.username}</span>
        )}
        <LogoutButton />
      </div>
    </header>
  );
}
