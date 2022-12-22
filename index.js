const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('jsonwebtoken')
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const multer = require('multer');
const path = require('path');

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  },
  () => {
    console.log('Connected to MongoDB');
  }
);

mongoose.connection.on('error', (err) => {
  console.log(err);
  if (err.name === 'MongooseServerSelectionError') {
    // Contains a Map describing the state of your replica set. For example:
    // Map(1) {
    //   'localhost:27017' => ServerDescription {
    //     address: 'localhost:27017',
    //     type: 'Unknown',
    //     ...
    //   }
    // }
    console.log(err.reason.servers);
  }
});

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// upload files to the server STARTS
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
app.post(`/api/upload`, upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('File uploaded successfully');
  } catch (error) {
    console.log(error);
    return res.status(500).json('Something went wrong');
  }
});
// file uploade to server ENDS

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

app.listen(8800, () => {
  console.log('Backend server is running!');
});
