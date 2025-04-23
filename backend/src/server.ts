import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';

dotenv.config();

const app = express();

const corsOptions = {
    origin: ['http://localhost:5173'],
};

// Middleware
app.use(cors({ origin: ['http://localhost:5173'] }));
app.use(express.json());

//Router
app.use('/api', routes);

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
