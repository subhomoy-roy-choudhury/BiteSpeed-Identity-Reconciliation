import mongoose from "mongoose";
import app from "./app";
import { DB_CONFIG } from "./config";

let server: any;
mongoose.connect(DB_CONFIG.url, { dbName: DB_CONFIG.dbName }).then(() => {
  console.log("Connected to MongoDB");
  server = app.listen(3001, () => {
    console.log(`Listening to port ${3001}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});
