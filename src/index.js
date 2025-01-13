// Import dependencies
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const router = require('./routes/routes');
const adminRouter = require('./routes/adminRoutes');

// Enable .env
dotenv.config()

// Define Express app
const app = express();

// Parse JSON into JS objects
app.use(express.json());
app.use(bodyParser.json());

// Enable CORS for all requests
app.use(cors());

// Log HTTP requests
app.use(morgan('dev'));

// Add routes
app.use("/", router)
app.use("/admin", adminRouter)

// Connect to MongoDB database
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true 
};

mongoose.set('strictQuery', false);
mongoose
	.connect(process.env.API_ADMIN_URI, connectionParams)
	.then(() => {
    console.log("Mongoose ready!")
	})

// Start server
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));