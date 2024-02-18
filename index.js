import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getMessaging, onMessage } from 'firebase-admin/messaging';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  })
);

app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://pulserythm-1e02c-default-rtdb.asia-southeast1.firebasedatabase.app',
});

app.post('/send', function (req, res) {
  const receivedToken = req.body.fcmToken;
  const message = {
    notification: {
      title: 'Notif',
      body: 'This is a test notification',
    },
  };

  getMessaging()
    .sendToDevice(receivedToken, message)
    .then((response) => {
      res.status(200).json({
        message: 'msg sent successfully',
        token: receivedToken,
      });
      console.log('msg sent successfully:', response);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log('error sending message:', error);
    });
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});
