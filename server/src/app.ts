import Fastify from "fastify";
import cookie from "@fastify/cookie";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors";
import websocket from "@fastify/websocket";

import authRoutes from "./routes/auth.js";
import roundRoutes from "./routes/rounds.js";
import wsRoutes from "./routes/ws.js";
import authRequired from "./plugins/authRequired.js";


export function buildApp() {
  const server = Fastify({ logger: false });

  try {
    server.register(cookie);
    server.register(jwt, {
      secret: process.env.JWT_SECRET!,
      cookie: {
        cookieName: "token",
        signed: false,
      },
    });
    server.register(cors, {
      origin: "http://localhost:5173",
      credentials: true,
    });

    // websocket
    server.register(websocket);

    // декоратор для проверки токена
    server.decorate("authRequired", authRequired);

    // роуты REST
    server.register(authRoutes, { prefix: "/auth" });
    server.register(roundRoutes, { prefix: "/rounds" });
    
    // роуты WS
    server.register(wsRoutes);
    
    
  } catch (err) {
    console.error("❌ Error while building app:", err);
    throw err;
  }

  return server;
}
