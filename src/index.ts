import { Elysia } from "elysia";
import { appRouter } from "./routes/appRouter";
import { html } from "@elysiajs/html";

const app = new Elysia()
  .use(html())
  .use(appRouter)
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
