import express, { Express, Request, Response, NextFunction } from "express";
import emailRoutes from "./routes/emailRoutes";

const app: Express = express();

app.use(express.json())

// Middleware global para loggear todas las peticiones
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[REQUEST] ${req.method} ${req.path} - Headers: ${JSON.stringify(req.headers)}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/sendMail', emailRoutes)


export default app