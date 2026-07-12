import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';

await connectDB(env.MONGO_URI);
app.listen(env.PORT, () => console.log(`Backend running on port ${env.PORT}`));
