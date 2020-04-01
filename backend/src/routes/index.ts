import { Router } from "express";
import * as controller from "../rest/index";

export const index = Router();

index.get("/getAllTodo", controller.getAll);
index.post("/addTodo", controller.addTodo);
index.delete("/deleteTodo/:id", controller.deleteTodo);
