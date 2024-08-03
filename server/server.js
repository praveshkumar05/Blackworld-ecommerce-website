// import express from 'express'
// import colors from  'colors';
// import dotenv from 'dotenv'
// import connectDB from './config/db.js';
// import cors from 'cors'
// import morgan from 'morgan';
// import authRoute from './routes/authRoute.js'
// import categoryRoute from './routes/categoryRoute.js'
// import productRoute from './routes/productRoute.js'
// import path from 'path'
// import { fileURLToPath } from 'url';
// // configure env
// dotenv.config();

// // databse config
// connectDB();
// const __filename=fileURLToPath(import.meta.url)
// const __dirname=path.dirname(__filename);

// // rest object
// const app=express();

// // middlewares
// app.use(express.json());
// app.use(cors());
// app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname,'../client/build')));

// // routes
// app.use("/api/v1/auth",authRoute);
// app.use("/api/v1/category",categoryRoute);
// app.use("/api/v1/product",productRoute);

// const port=process.env.PORT||6010;

// // rest api
// app.use('*',function(req,res){
//     res.sendFile(path.join(__dirname,"../client/build/index.html"))
// })
// app.listen(port,()=>{
//     console.log(`server is running on ${port}`.bgCyan.yellow);   
// })


// // import express from 'express';
// // import colors from 'colors';
// // import dotenv from 'dotenv';
// // import connectDB from './config/db.js';
// // import cors from 'cors';
// // import morgan from 'morgan';
// // import authRoute from './routes/authRoute.js';
// // import categoryRoute from './routes/categoryRoute.js';
// // import productRoute from './routes/productRoute.js';
// // import path from 'path';
// // import { fileURLToPath } from 'url';

// // // Configure environment variables
// // dotenv.config();

// // // Connect to the database
// // connectDB();

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // // Initialize express
// // const app = express();

// // // Middleware
// // app.use(express.json());
// // app.use(cors());
// // app.use(morgan('dev'));

// // // Serve static files from the React app
// // app.use(express.static(path.join(__dirname, 'client/build')));

// // // API routes
// // app.use("/api/v1/auth", authRoute);
// // app.use("/api/v1/category", categoryRoute);
// // app.use("/api/v1/product", productRoute);

// // // Catch-all handler for any request not matched above
// // app.use('*', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'client/build/index.html'));
// // });

// // const port = process.env.PORT || 6010;
// // app.listen(port, () => {
// //     console.log(`Server is running on port ${port}`.bgCyan.yellow);
// // });




import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import morgan from 'morgan';
import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js';

// Configure environment variables
dotenv.config();

// Database configuration
connectDB();

// Create an Express application
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// API routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

const port = process.env.PORT || 6010;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on ${port}`.bgCyan.yellow);
});
