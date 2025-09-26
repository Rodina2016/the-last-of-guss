
const authRequired = async (request: any, reply: any) => {
    try {
      const payload = await request.jwtVerify();
      request.user = payload;
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  }

export default authRequired;
