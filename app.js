const linebot = require('linebot');
const firebase = require('firebase');

const bot = linebot({
  channelId: process.env.channelId,
  channelSecret: process.env.channelSecret,
  channelAccessToken: process.env.channelAccessToken,
})

const firebaseConfig = {
  apiKey: process.env.firebaseApiKey,
  authDomain: process.env.firebaseAuthDomain,
  databaseURL: process.env.firebaseDBUrl,
  projectId: process.env.firebaseProjectId,
  storageBucket: process.env.firebaseStorageBucket,
  messagingSenderId: process.env.firebaseMessagingSenderId,
  appId: process.env.firebaseAppId,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
firebase.auth().signInWithEmailAndPassword("shanpigliao@gmail.com", process.env.firebasepwd)
  .then((user) => {
    console.log('firebase successfully logged in');
    database.ref('/test').once('value').then(snap=>{
      data = snap.val();
    });
  })
  .catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode+": "+errorMessage);
  });

bot.on('message', (e)=>{
  let message = e.message.text;
  console.log(message);
  console.log('hiiiii')
  e.reply(message);
})

bot.listen('/linewebhook', process.env.PORT, ()=>{
  console.log('準備就緒');
})