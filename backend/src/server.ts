import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from './config/passport';
import routes from './routes';
import { startImportConsumer } from './queue/importConsumer';
import { errorHandler } from './middleware/errorHandler';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './config/swagger';

dotenv.config();

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api', routes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

startImportConsumer().catch((err) => {
    console.error('Failed to start consumer:', err);
});
