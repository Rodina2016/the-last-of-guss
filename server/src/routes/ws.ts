import { FastifyPluginAsync } from "fastify";
import { getRound, getRoundCountdown, tapRound } from "../services/rounds.js";

const wsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/ws/round/:id", { websocket: true }, async (socket, req) => {
    try {
      const user = await req.jwtVerify();
      const roundId = (req.params as any).id;
      let round = await getRound(roundId);

      if (!round) {
        socket.send(JSON.stringify({ error: "Round not found" }));
        socket.close();
        return;
      }

      const interval = setInterval(async () => {
        round = await getRound(roundId);

        if (!round) {
          socket.send(JSON.stringify({ error: "Round not found" }));
          socket.close();
          return;
        }

        const countdown = getRoundCountdown(round);
        const myScore = round.scores.find((s) => s.userId === user.id)?.points || 0;
        const totalPoints = round.scores.reduce((sum, s) => sum + s.points, 0);


        socket.send(
          JSON.stringify({
            status: countdown.status,
            secondsLeft: countdown.secondsLeft,
            myPoints: myScore,
            totalPoints,
          })
        );

        if (countdown.status === "finished") {
          clearInterval(interval);
          socket.close();
        }
      }, 1000);

      socket.on("message", async (raw: { toString: () => string; }) => {
        
        const data = JSON.parse(raw.toString());
      
        if (data.type === "tap") {
          await tapRound(roundId, user.id, user.role);
      
          const updatedRound = await getRound(roundId);

          if (!updatedRound) {
            socket.send(JSON.stringify({ error: "Round not found" }));
            socket.close();
            return;
          }

          const countdown = getRoundCountdown(updatedRound);
      
          const myScore = updatedRound.scores.find((s) => s.userId === user.id)?.points || 0;
          const totalPoints = updatedRound.scores.reduce((sum, s) => sum + s.points, 0);
      
          socket.send(JSON.stringify({
            status: countdown.status,
            secondsLeft: countdown.secondsLeft,
            myPoints: myScore,
            totalPoints,
          }));
        }
      });

      socket.on("close", () => clearInterval(interval));
    } catch (err: any) {
      fastify.log.error("❌ WS auth failed:", err);
      socket.close();
    }
  });
};

export default wsRoutes;
