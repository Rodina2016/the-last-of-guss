import { useNavigate } from "react-router-dom";
import { logout } from "../../../entities/auth/api";
import { clearUser, getUser } from "../../../shared/lib/auth";

export function LogoutButton() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
      navigate("/");
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  if (!user) return null;

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
    >
      Выйти
    </button>
  );
}
