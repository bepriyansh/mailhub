import express from 'express'
import mailRoute from './routes/mail.js'
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static('public'));

app.get('/api/v1/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/', mailRoute)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
