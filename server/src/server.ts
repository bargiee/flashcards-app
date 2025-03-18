import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';

dotenv.config();
const app = express();

const corsOptions = {
    origin: ['http://localhost:5173'],
};

app.use(cors(corsOptions));

app.get('/api', (req, res) => {
    res.json({ fruits: ['apple', 'orange', 'banana'] });
});

app.get('/api/flashcards', (req, res) => {
    res.json([
        { id: 2, front: 'Dog', back: 'Pies' },
        { id: 3, front: 'Cat', back: 'Kot' },
    ]);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
