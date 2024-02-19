import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getMessaging} from "firebase-admin/messaging";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

initializeApp({
  credential: applicationDefault(),
  databaseURL: "https://pulserythm-1e02c-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const messaging = getMessaging();

app.get("/send", async function (req, res) {
  const receivedToken = req.body.fcmToken;
  const message = {
    notification: {
      title: "Notif",
      body: "This is a test notification"
    },
    token: receivedToken,
  };

  /*app.get("/", (req, res) => {
      res.send("hello");
    });*/

  try {
    const response = await send(messaging, message);
    res.status(200).json({
      message: "msg sent successfully",
      token: receivedToken,
      response: response,
    });
    console.log("msg sent successfully:", response);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log("error sending message:", error);
  }
});


  app.listen(3000, "0.0.0.0", () => {
    console.log("Server started on port 3000");
  });
  
