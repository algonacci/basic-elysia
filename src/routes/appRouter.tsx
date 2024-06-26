import { Elysia, t } from "elysia";

export const appRouter = new Elysia()
  .get("/", () => "Hello Elysia")
  .onBeforeHandle(({ set, headers }) => {
    const token = headers.authorization;
    if (!token) {
      set.status = 401;
      return {
        message: "No token provided",
      };
    }
    console.log("onBeforeHandle hook");
  })
  .onAfterHandle(() => {
    console.log("afterHandle hook");
  })
  .get("/users", () => "Users data", {
    beforeHandle: () => {
      console.log("local hook");
    },
  })
  .get("/books", () => <h1>Books Data</h1>)
  .get("/todos", () => {
    return { message: "Todos data" };
  })
  .post(
    "/books",
    ({ body }) => {
      console.log(body);
      const { name } = body;
      return "handling body";
    },
    {
      body: t.Object({
        name: t.String(),
        description: t.String(),
        author: t.String(),
      }),
    }
  )
  .post(
    "/users",
    ({ headers }) => {
      console.log(headers);
      console.log(headers.authorization);
      return "handling headers";
    },
    {
      headers: t.Object({
        authorization: t.String(),
      }),
    }
  )
  .post("/admin", ({ query }) => {
    console.log(query);
    return "handling query";
  })
  .get("/books/:id", ({ params }) => <h1>Book ID: {params.id}</h1>);
