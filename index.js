import { initializeApp, cert } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import express from "express";
import cors from "cors";
import admin from "firebase-admin";

const app = express();

var temperature;
var heartRate;

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

// Directly import serviceAccountKey.json
//import * as serviceAccount from './serviceaccountkey.json';

initializeApp({
  credential: cert({
    projectId: "pulserythm-1e02c",
    clientEmail:
      "firebase-adminsdk-4b6u4@pulserythm-1e02c.iam.gserviceaccount.com",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJGIKN4/BsldMf\nwsT8n5cdzMPqEas97Je+fj7X4ygTmcTDpx6XwNKJAhpzfdnUBTzi4wKcA5RBgIGS\nyc1OfIPmVgMAKngDo/fiCN8G8bLyxcxLltuyR9hh3pTRZ0igL4rBoc/aHYQL4W/G\nG2qR7/7kKrcFu3WBzwvpRMRXGvVi9cX9cpu9E485IzzQX/b0FlwbQA0cibAM+5GF\n8SqI1f0VL5tEHnskR41UsyrXb3J2N5qzryXzn/k3jyQJ6dqfsxNh/qjZDZ8u8rsY\nIR/RoWHJ/hqG+F+VQmgkpDWFfm8ZiHmiQa2GFIPdhHQMlYJ99nxMi/jPw6Tcm5bQ\nWzUfolARAgMBAAECggEAB/jf5xxh2gosBSKxcMLqaKDnJOrHp0QvhVqnpuMfYfyK\n+Ycw7irzpcEWt5ymA7Lj9aoyfqkhKeIccOttZ1bGG13uT0W/vYQ09ensXo/7LEb1\naQs9YTFaNZIPhAg0T75mwbOmo/Le2uI4bkoEtO2m5RiA6joi588jnZ8vafUchIxg\nDBJ7zAuFXnxg4hDrSfz04HtZYiBX2ErW0eAPXMYG2eGeva5iW2hqKx0kRQekg4S6\nMmoD8GLwb+udF8UjKb5vPZzDen8SxkALmtJq+yR7jAX5ewCKBPqRlRcmySx8MmL8\nZI8t16ZZiCc1BxBor8ucT2TcrMZ4yp6snZXUiTyUQQKBgQDkiUG8nQFCpoyHfokG\nMWasSMRW1deESEMZ1f7ZEq5SkfLvrDbTCyEdBPVOMIzjhQGx6jj9ogrQG/7At9k1\nPZ5tJP4SuoPVwHZjurRyQkY4Xn6pyFHSRdTkW1VINse2FzIYDUVllgY8LeTSJI4S\nuCGIORSO6FvnTV3Kgq8jJQ2KYQKBgQDhQxHCrvlXhXjHlAxiUO5K/hLvlmxpqH9b\nWbFviu5+GIduojOYzAJhbiU1n0tX7s9KgUpGk+6FutZCM0//K5tuYMTqfKG6bDmT\nOWibuDngRWzXjbC2Bu+iJLLprdH99ScrOXdbn8g0mFWBfK8dR+cMY3U9OwIMWhlH\n5jfgQzaDsQKBgQC25mqn6vexQd3CKrC7Nho309zeqjHbeoHJUYyuadb92jSVQDx4\nVrXfpbI1K4H2LOKYYx3NTzxcJauSzRCXHYOHUk3M61zLW0bkte3oa8YLIwU4GEvz\nf1PMlpQAQWdAAfxjZ2ucy56d1xUEYaEatiaQAS7E2I2E5lQj2McV13eowQKBgFlH\n0uc9oHfO3+MCS7I/72JrtyeckBWEgg27y/awsvvpTuxLf3XFDgB9vmO1YhBVB3W5\nLq4wfa4lMjyEx+UT7IPf+MwTX6pasKsoasylRNMd0RjSAML0ls/GCd9SVFN6ce7Q\n1PzMpHYsFl+/AkzxraKcXOBK3fH1V+XGWkkZeqbRAoGBAMExkGireXqlhi12fjuK\n/t6CMUJPg6TmM8HZciujOO1k6Q1ZPtAf+RjhD+rkDaY79mU4Pz4d5E0Z3HUMMTYN\nLchhLG7NX17IkuK0ak9m0cJMnmHZBp9i7xSBQrozJT/WxSHVokO3lOiJaAMaqVcz\n8dVoEPHiA/bG3yp2EdkSn7g1\n-----END PRIVATE KEY-----\n",
  }),
  databaseURL:
    "https://pulserythm-1e02c-default-rtdb.asia-southeast1.firebasedatabase.app",
});

//const messaging = getMessaging();
const db = admin.database();
const patientRef = db.ref("/PatientRecord/12285");
const receivedToken =
"c0fGrfLxQTic1DwoP5Dnog:APA91bFwup5zGkiCl7hh1wmIM1RU4lMFVnSn5pE3lG_P0vUVIZB55_uvhiVYPz1ebBlZzfkz9NRfpQuc-0d5Y-vBlHtDzBD7TXx_23zI2ZzVIABGghrEC4c0dYv0B5mYE4SZt5RNGaks";
// nimisha = "cXhP3F00TZm7O5PyN2Z3za:APA91bEQ4pJuAF6E6ZROFjwZAR95HtxbvdW2L0hMukCm-amdIbK11eOdqncj1_J4syg7bi1jyCdtq6BICEiGaiYVVWT9BvkISz8Zh2n-lMKY71EW64ShuSMMqn7trBN5kCkRWkCToHmk";

// Function to send notification
async function sendNotification(title, body) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: receivedToken,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Message sent successfully:", response);
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

app.get("/get-notification", async (req, res) => {

  try {
    // CODE FOR GETTING VALUES FROM UR FIREBASE REALTIME FIREBASE
    //STORE THE VALUES INTO HEARTRATE AND TEMP
    // Listen for changes in Heart_Rate
    patientRef.child("Heart_Rate").on('value', (snapshot) => {
      heartRate = snapshot.val();
      if (heartRate < 60 || heartRate > 90) {
        sendNotification("Heart Rate Alert", "Your heart rate is fluctuating.");
      }
    });

    // Listen for changes in Temperature
    patientRef.child("Temperature").on('value', (snapshot) => {
     temperature = snapshot.val();
      if (temperature < 32) {
        sendNotification("Temperature Alert", "Your temperature is low.");
      } else if (temperature > 40) {
        sendNotification("Temperature Alert", "Your temperature is high.");
      }
    });
    res.send(`${temperature},${heartRate}`);
  
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});
