const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { connectToMongoDb } = require("./connect");
const { URL } = require("./models/url");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middleware/auth");

const urlRoute = require("./routers/url");
const userRoute = require("./routers/user");
const staticRoute = require("./routers/staticRouter");

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://localhost:27017/short-url").then(() => {
  console.log("Mongodb connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server is started at PORT : ${PORT}`);
});
