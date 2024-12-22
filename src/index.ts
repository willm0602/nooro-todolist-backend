import express, {Express, Request, Response, Application} from 'express';
import dotenv from 'dotenv';

const DEFAULT_PORT_NUM = 8080;

// load in configuration information from .env
dotenv.config();

const app: Application = express();