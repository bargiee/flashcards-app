import express from 'express';
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

const PORT = process.env.PORT || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(
    cors({
        origin: CORS_ORIGIN,
        credentials: true,
    }),
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api', routes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
