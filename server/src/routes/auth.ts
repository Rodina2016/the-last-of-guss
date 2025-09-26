import { type FastifyInstance } from "fastify";
import { findOrCreateUser } from "../services/user.js";

export default async function authRoutes(server: FastifyInstance) {
  server.post("/login", async (req: any, reply) => {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    try {
      const user = await findOrCreateUser(username, password);
      const token = server.jwt.sign({ id: user.id, username: user.username, role: user.role });

      reply
        .setCookie("token", token, {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          maxAge: 24 * 60 * 60,
        })
        .send({ id: user.id, username: user.username, role: user.role });
    } catch (err: any) {
      if (err.message === "invalid-password") {
        reply.code(400).send({ error: "Неверный пароль" });
      } else {
        reply.code(500).send({ error: "Ошибка логина" });
      }
    }
  });

  server.post("/logout", async (_req, reply) => {
    reply.clearCookie("token").send({ ok: true });
  });
}
