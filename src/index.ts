import express from 'express';
import {Express, Request, Response, Application} from 'express';
import * as dotenv from 'dotenv';

const DEFAULT_PORT_NUM = 8080;

// load in configuration information from .env
dotenv.config();

const app: Application = express();
const port = process.env.PORT || DEFAULT_PORT_NUM;

app.get('/test', (req: Request, res: Response) => {
    res.send('Test!')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})