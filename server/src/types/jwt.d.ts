import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      id: string;
      username: string;
      role: "admin" | "survivor" | "nikita";
    };
    user: {
      id: string;
      username: string;
      role: "admin" | "survivor" | "nikita";
    };
  }
}
