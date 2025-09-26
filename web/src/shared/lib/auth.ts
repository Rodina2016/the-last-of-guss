import type { User } from "../../entities/auth/api";

  
  export function getUser(): User | null {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  }
  
  export function setUser(user: User | null) {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }
  
  export function clearUser() {
    localStorage.removeItem("user");
  }