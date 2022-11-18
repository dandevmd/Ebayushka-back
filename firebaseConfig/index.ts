import admin from "firebase-admin"

var serviceAccount = require("./fbServiceAccountKey.json");

export const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

  
});

if(!app){console.log('connection with firebase admin gone wrong')}