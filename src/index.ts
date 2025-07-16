import { app } from './app.js';
import dotenv from 'dotenv';
import { dbConnect } from './services/db.services.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

dbConnect();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
