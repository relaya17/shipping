import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5055;

// הגדרת CORS לאפשר גישה מהלקוח (React)
app.use(cors({
  origin: 'http://localhost:3639',  // כתובת הלקוח (פורט dev של Vite)
}));


// הגדרת נתיב ל-API של מכס
app.get('/api/customs', (_req, res) => {
  res.json({ message: 'Working with a trusted moving company can make your customs process easier.' });
});

// שמיעה ב-port 5000
app.listen(PORT, () => {
  console.log(`השרת רץ על פורט ${PORT}`);
});
