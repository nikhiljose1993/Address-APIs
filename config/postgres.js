import pg from "pg";

const { USER, HOST, DATABASE, PASSWORD, PORT } = process.env;

const pool = new pg.Pool({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORT,
});

export default pool;
