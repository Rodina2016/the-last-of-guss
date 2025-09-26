import { useState } from "react";
import { login, type User } from "../../entities/auth/api";
import { setUser } from "../../shared/lib/auth";

export function useLogin(onSuccess?: (user: User) => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const user = await login(username, password);
      setUser(user);  
      onSuccess?.(user);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
}
