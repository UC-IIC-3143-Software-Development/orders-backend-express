import express, { Request, Response } from "express";
import dotenv from "dotenv";
import prisma from "./prisma";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.get("/health", (req: Request, res: Response) => {
  res.send("Ok");
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/user", async (req, res) => {
  const { firstName, lastName } = req.body;
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
    },
  });
  res.json(user);
});

app.put("/users/:id", async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  res.json("bye");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
