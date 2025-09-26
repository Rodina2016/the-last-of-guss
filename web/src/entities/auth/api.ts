import { api } from "../../shared/api/axios";

export type User = {
  id: string;
  username: string;
  role: "admin" | "survivor" | "nikita";
};

export async function login(username: string, password: string) {
  const res = await api.post<User>("/auth/login", { username, password });
  return res.data;
}

export async function logout() {
  await api.post("/auth/logout");
}
