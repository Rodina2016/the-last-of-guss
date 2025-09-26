import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../features/auth/useLogin";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { handleLogin, loading, error } = useLogin(() => {
    navigate("/rounds"); 
  });

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(username, password);
        }}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96 space-y-4"
      >
        <h1 className="text-xl font-bold text-white">Вход</h1>

        <input
          type="text"
          placeholder="Имя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
}
