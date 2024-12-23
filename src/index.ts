import express from "express";
import { Express, Request, Response, Application } from "express";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import type { TaskStatus } from "@prisma/client";
import cors from "cors";

const DEFAULT_PORT_NUM = 8080;

// load in configuration information from .env
dotenv.config();

const app: Application = express();
const port = process.env.PORT || DEFAULT_PORT_NUM;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

const prisma = new PrismaClient();

app.get("/tasks", (req: Request, res: Response) => {
  prisma.task
    .findMany()
    .then((resp) => {
      res.json(resp);
      res.status(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
});

app.get("/task/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  prisma.task
    .findUnique({
      where: { id },
    })
    .then((resp) => {
      res.send(resp);
      res.status(200);
    })
    .catch((err) => {
      res.send(err);
      res.status(500);
    });
});

app.post("/tasks", (req: Request, res: Response) => {
  type PostBody = {
    title: string;
    color: string;
  };

  const { title, color } = req.body as PostBody;
  const timestamp = new Date();
  prisma.task
    .create({
      data: {
        title: title,
        color: color,
        status: "TODO",
        timestamp: timestamp,
      },
    })
    .then((resp) => {
      res.send(resp);
      res.status(200);
    })
    .catch((err) => {
      res.send(err);
      res.status(500);
    });
});

app.put("/tasks/:id", (req: Request, res: Response) => {
  const newTaskData = req.body;
  const id = parseInt(req.params.id);
  prisma.task
    .update({
      data: newTaskData,
      where: {
        id,
      },
    })
    .then((resp) => {
      res.send(resp);
      res.status(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  prisma.task
    .delete({
      where: {
        id,
      },
    })
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
