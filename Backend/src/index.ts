// src/index.ts
import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { addressRouter } from './routes/address';
import { cors } from 'hono/cors';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
        GOOGLE_CLIENT_ID: string,
	}
}>();

// Enable CORS
app.use('/*', cors());

// Routes
app.route('/api/user', userRouter);
app.route('/api/address', addressRouter);

export default app;