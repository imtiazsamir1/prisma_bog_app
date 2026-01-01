import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { postRouter } from "./module/post/post.router";
import { auth } from "./lib/auth";

const app: Application = express();

app.use(express.json());


app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/posts", postRouter);

app.get("/", (req, res) => {
    res.send("hello world");
});

export default app;