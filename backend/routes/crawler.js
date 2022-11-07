import express from 'express';
import { crawl, getHistory } from '../controllers/crawlerController';
let crawlerRouter = express.Router();

// we protect the POST, PUT and DELETE methods
crawlerRouter.post('/crawl', crawl);
crawlerRouter.get('/history', getHistory);

export default crawlerRouter;
