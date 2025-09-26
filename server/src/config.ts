export const config = {
    jwtSecret: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL,
    frontendOrigin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173",
  };
  
  for (const [k, v] of Object.entries(config)) {
    if (!v) {
        console.error(`❌ Missing env: ${k}`);
      }
    if (v == null || v === "") {
      
      if (k === "jwtSecret" || k === "dbUrl") {
        throw new Error(`Missing required env: ${k}`);
      }
    }
  }
  