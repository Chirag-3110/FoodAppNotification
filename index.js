
var admin = require("firebase-admin");
const express=require('express');
const app=express();
const port=process.env.PORT || 8000
var serviceAccount = require("./ordermanagement-f98c2-firebase-adminsdk-ed4c1-e069279b36.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.listen(port,()=>{
  console.log("server starrted at ",port);
})


app.post('/triggerNotification',(req,res)=>{
    admin.messaging().sendToDevice(
      req.body.tokens,
      {
        notification: {
            title: 'Notification recieved!!!!',
            body: req.body.notificationBody,
        },
      },
      {
        contentAvailable: true,
        priority: 'high',
      },
    )
    .then(respnse=>{
      res.send({message:"Order Placed"})
    })
    .catch((e)=>{
      res.send({message:"Can't place order"})
    })
})
