import mysql from "mysql2";
import dotenv from "dotenv";

const pool = mysql
  .createPool({
    host: process.env.todo_HOST,
    user: process.env.todo_USER,
    password: process.env.todo_PASSWORD,
    database: process.env.todo_DATABASENAME,
  })
  .promise();

async function closePool() {
  try {
    await pool.end();
    console.log("Database pool closed successfully.");
  } catch (error) {
    console.error("Error closing database pool:", error);
  }
}

export default pool;
export { closePool };
