const express = require('express');
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const fs = require('fs');
const app = express();
const httpServer = require("http").createServer(app);
const io = require('socket.io')(httpServer,{
  cors:{
    origin: '*',
  }         
}); 
const PORT = 3002;

io.on('connection',socket=>{
  console.log(socket.id)
  socket.on('new',()=>{
    // console.log('notification')
    socket.emit('notification',{  
      name:"AB",
      sub:'Your email was just opened',
      color:'light-success',
      title:'Hello'

    })
  }) 
}
)
httpServer.listen(5500)
// const fsPromises = require('fs').promises;
// const path = require('path');

const data = {
    general: {
    //   avatar: avatar11, 
      username: 'johndoe',
      fullName: 'John Doe',
      email: 'granger007@hogward.com',
      company: 'PIXINVENT'
    },
    info: {
      bio: '',
      dob: null,
      country: 'USA',
      website: '',
      phone: 6562542568
    },
    social: {
      socialLinks: {
        twitter: 'https://www.twitter.com',
        facebook: '',
        google: '',
        linkedIn: 'https://www.linkedin.com',
        instagram: '',
        quora: ''
      },
      connections: {
        twitter: {
        //   profileImg: avatar11,
          id: 'johndoe'
        },
        google: {
        //   profileImg: avatar3,
          id: 'luraweber'
        },
        facebook: {},
        github: {}
      }
    },
    notification: {
      commentOnArticle: true,
      answerOnForm: true,
      followMe: false,
      newAnnouncements: true,
      productUpdates: true,
      blogDigest: false 
    },
    preferences:{
      mode: true,
      events:[{read:true,link:false,attachment:true}],
      send: 'individually',
      notification: 'sms',
      emailReadCount: 3,
      linkClickedCount: 2,
    }
  }
app.use(logger) ;//log requests to console and logfile 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser());
//https://stormy-worm-scrubs.cyclic.app
const whitelist = ["http://localhost:3001","http://localhost:3000","https://getnotify.netlify.app"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  } 
}
app.use(cors({
  optionsSuccessStatus: 200,
}))
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.options('*',cors())
app.get('/noti',(req,res)=>{
  res.status(200).send("gotchya")
})
app.use('/update', require('./routes/update'));
app.post('/noti',(req,res)=>{
  res.status(200).send("gotchya again")
})
app.get('/account', (req, res) => {
  fs.readFile('./data/account.txt','utf8',(err,data) => { 
    // console.log(data)
    res.status(200).send({data})
  })  
      
})

app.listen(PORT,()=>{ console.log(`Express server listening on port ${PORT}`) });