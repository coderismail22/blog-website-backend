/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import seedAdmin from "./app/DB/seedAdmin";

// eslint-disable-next-line no-unused-vars
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    // seedSuperAdmin();
    seedAdmin();
    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
