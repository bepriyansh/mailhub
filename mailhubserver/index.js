import express from 'express'
import mailRoute from './routes/mail.js'
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static('public'));

app.get('/api/v1/', (req, res) => {
  res.send('Hello World!');
});
app.get("/keepalive", (req, res) => {
  const time = new Date(Date.now()).toLocaleString();
  console.log(time, "Keep Alive Ping");
  res.send(`${time} : Hello from Mailhub`);
});

app.use('/api/v1/', mailRoute)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
