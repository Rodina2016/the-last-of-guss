import { FastifyInstance } from "fastify/types/instance.js";
import { createRound, listRounds, getRound } from "../services/rounds.js";

export default async function roundRoutes(server: FastifyInstance) {
  server.addHook("onRequest", server.authRequired);

  server.post("/", async (req: any, reply) => {
    if (req.user.role !== "admin") {
      return reply.code(403).send({ error: "Forbidden" });
    }
    return createRound();
  });

  server.get("/", async (req: any, reply)  => {
    return listRounds();
  });

  server.get("/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const round = await getRound(id);
    if (!round) return reply.code(404).send({ error: "Not found" });
    return round;
  });
}
