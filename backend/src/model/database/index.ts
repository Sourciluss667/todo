import { Pool } from "pg";
// tslint:disable-next-line: no-var-requires
const config = require("./config");
// tslint:disable-next-line: no-var-requires
const pgtools = require("pgtools");

module.exports = class Db {

public pool: Pool;

public async init() {
  this.pool = await new Pool(config);
}

public async getAllTodo() {
  const result = await this.pool.query("SELECT * FROM todo ORDER BY id ASC");
  return result;
}

public async addTodo(str: string) {
  try {
    await this.pool.query({
      text: `INSERT INTO todo (str)
        VALUES ($1) RETURNING *`,
      values: [str],
    });
    return true;
  } catch (err) {
    console.log("Create user error : ", err);
    return false;
  }
}

public async initDatabase() {
  const initDbConfig = {
    host: config.host,
    password: config.password,
    port: config.port,
    user: config.user,
  };

  try {
    await pgtools.dropdb(initDbConfig, config.database);
    console.log("Delete db success");
  } catch (err) {
    console.log("Drop db error (not important)", err);
  }

  try {
    await pgtools.createdb(initDbConfig, config.database);
    console.log("Create db success");
  } catch (err) {
    console.log("Create db error !!", err);
  }

  // Connect to db
  await this.init();

  // Create TABLE
  const q = `
  CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    str TEXT NOT NULL
  )
  `;

  try {
    await this.pool.query(q);
    console.log("Create todo table success");
  } catch (err) {
    console.log("Create table error !!", err);
  }
}
};
