import admin from "firebase-admin"
import serviceAccount from './fbServiceAccountKey.json'

// var serviceAccount = require("./fbServiceAccountKey.json");

export const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),

  
});

if(!app){console.log('connection with firebase admin gone wrong')}