import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";
import { type ApiResponse} from 'shared/types'
import path from 'path'
 
const app = new Hono(); 
app.use(cors());
 
app.get("/api", (c) => {
  const data: ApiResponse = {
    date: new Date().toISOString(),
    message: 'OK',
    uptime: process.uptime()
  }

  return c.json(data)
});

// Serve static files for everything else
app.use("*", serveStatic({ root: path.join(__dirname, '../../', 'client') }));
 
app.get("*", async (c, next) => {
  return serveStatic({ root: path.join(__dirname, '../..', 'client/dist'), path: "index.html" })(c, next);
});

 
const port = parseInt(process.env.PORT || "3000");
 
export default {
  port,
  fetch: app.fetch,
};
 
console.log(`drio server running on port ${port}`);