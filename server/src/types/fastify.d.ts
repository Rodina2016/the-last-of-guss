import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authRequired: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    user: {
      id: string;
      username: string;
      role: "admin" | "survivor" | "nikita";
    };
  }
}
