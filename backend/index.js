
import express from 'express';
import dotenv  from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './Database/connect.js';
import { User } from './Database/db.js';
import cors from 'cors';



// Simulate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'http://34.131.95.237:5173'], // Adjust this to your frontend URL
  methods: ['GET', 'POST'],
  credentials: true
}));
const port = process.env.PORT;

app.use(express.json());

await connectDB();


app.get('/', (req, res) => {
  res.send('Hello World by lav!');
});

app.post('/user', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    User.create({ email, password }); 
    console.log('User created:', { email, password });
    res.status(201).json({ email, password });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at by locally http://localhost:${port}`);
});
