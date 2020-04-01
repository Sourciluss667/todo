import { Request, Response } from "express";
// tslint:disable-next-line: no-var-requires
const db = require("../model/database/index");

// Init db
const bdd = new db();
bdd.init();

/**
 * GET /getAllTodo
 * All todo store in db
 */
export let getAll = async (req: Request, res: Response) => {
  const result = await bdd.getAllTodo();
  res.json(result.rows).status(200);
};

/**
 * POST /addTodo
 * Add Todo
 */
export let addTodo = async (req: Request, res: Response) => {
  const str = req.body.str;
  const result = await bdd.addTodo(str);
  if (result) {
    res.sendStatus(200);
    console.log("Add: " + str);
  } else {
    res.sendStatus(400);
  }
};

/**
 * Delete /deleteTodo
 * Delete Todo with id
 */
export let deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await bdd.deleteTodo(id);
  if (result) {
    res.sendStatus(200);
    console.log("Delete todo with id: " + id);
  } else {
    res.sendStatus(400);
  }
};
