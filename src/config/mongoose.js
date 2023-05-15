import mongoose from "mongoose";

const URL_DB = "mongodb+srv://Rizqila:a2Pp38Csxtv6QnnP@cluster0.1jtvr8z.mongodb.net/?retryWrites=true&w=majority";

try {
  mongoose.connect(URL_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  console.log("Connected to DB");
} catch (error) {
  handleError(error);
}

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});

export default mongoose;