import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;
const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://hamadismail:KKYtUaagMYSD0yxW@cluster0.donur6y.mongodb.net/note-app?retryWrites=true&w=majority&appName=Cluster0"
    );

    server = app.listen(PORT, () => {
      console.log(`App is listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
