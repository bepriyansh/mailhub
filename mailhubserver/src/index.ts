import express from 'express';
import mailRoute from './routes/mail';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello from Mailhub');
});

app.get("/keepalive", (req, res) => {
  const time = new Date(Date.now()).toLocaleString();
  console.log(time, "Keep Alive Ping");
  res.send(`${time} : Hello from Mailhub`);
});

app.use('/api/v1/', mailRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
