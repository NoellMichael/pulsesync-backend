import {initializeApp, applicationDefault } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";
import express, { json } from "express";

initializeApp({
  credential: applicationDefault(),
  databaseURL: "https://pulserythm-1e02c-default-rtdb.asia-southeast1.firebasedatabase.app"
});
