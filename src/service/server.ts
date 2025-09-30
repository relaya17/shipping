import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// הגדרת CORS לאפשר גישה מהלקוח (React)
app.use(cors({
  origin: 'http://localhost:5173',  // כתובת הלקוח שלך (הכתובת בה היישום הריאקט רץ)
}));


// הגדרת נתיב ל-API של מכס
app.get('/api/customs', (req, res) => {
  res.json({ message: 'Working with a trusted moving company can make your customs process easier.' });
});

// שמיעה ב-port 5000
app.listen(PORT, () => {
  console.log(`השרת רץ על פורט ${PORT}`);
});
