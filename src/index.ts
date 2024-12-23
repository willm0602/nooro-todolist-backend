import express from 'express';
import {Express, Request, Response, Application} from 'express';
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import type { TaskStatus } from '@prisma/client';

const DEFAULT_PORT_NUM = 8080;

// load in configuration information from .env
dotenv.config();

const app: Application = express();
const port = process.env.PORT || DEFAULT_PORT_NUM;

const prisma = new PrismaClient();

app.get('/tasks', (res: Response) => {
    res.json(prisma.task.findMany())
})

app.post('/tasks', (req: Request, res: Response) => {
    
    type PostBody = {
        title: string,
        color: string,
        status: TaskStatus
    }
    
    try{
        const {
            title,
            color,
            status
        } = req.body as PostBody;
        const timestamp = new Date();
        prisma.task.create({
            data: {
                title: title,
                color: color,
                status: status,
                timestamp: timestamp
            }
        })
    } catch{
        // TODO: add error logging
        res.status(500);
    } finally{
        res.status(200);
    }
});

app.put('/tasks/:id', (req: Request, res: Response) => {
    try{

        const newTaskData = req.body();
        const id = parseInt(req.params.id);
        prisma.task.update({
            data: newTaskData,
            where: {
                id
            }
        });
    } catch {
        res.status(500);
    } finally{
        res.status(200);
    }
});

app.delete('/tasks/:id', (req: Request, res: Response) => {
    try{

        const id = parseInt(req.params.id);
        prisma.task.delete({
            where: {
                id
            }
        });
    } catch {
        res.status(500);
    } finally{
        res.status(200);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})