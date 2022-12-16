import admin from "firebase-admin";
import path from "path";

var serviceAccount = require(path.join(
  __dirname,
  "fbServiceAccountKey.json"
));

export const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

if (!app) {
  console.log("connection with firebase admin gone wrong");
}
