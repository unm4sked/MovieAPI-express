import express from 'express';
import dotenv from 'dotenv';
import { router as moviesRouter } from './routes';
import { catchErrors, notFound } from './middlewares/errors';
import bodyParser from 'body-parser';
import expressWinston from 'express-winston';
import winston from 'winston';

dotenv.config();

const port = process.env.SERVER_PORT;

const app = express();

app.use(bodyParser.json());
app.use(
    expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    }),
);
app.use('/api/v1/', moviesRouter);
app.use(
    expressWinston.errorLogger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    }),
);
app.use(notFound);
app.use(catchErrors);

const server = app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

server.setTimeout(5000);
