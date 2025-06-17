import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { protect } from './middleware/authMiddleware.js';
import connectWithMongoDB from './utils/connection1.db.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/admin', adminRoutes);

connectWithMongoDB();



app.get('/',(req,res)=>{
    res.send({
        activeStatus:true,
        error:false,
    })
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => console.error(err));
