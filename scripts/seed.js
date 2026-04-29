import { seedAdmin } from "./../src/seed/admin.seed.js";
import dotenv from "dotenv";
dotenv.config();



seedAdmin().then(() => {
  console.log("Done");
  process.exit();
});