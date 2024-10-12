import express from 'express'
import cors from 'cors';
import workshopRouter from './routes/workshops.js'
import eventRouter from './routes/events.js'
import locationRouter from './routes/locations.js'

const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.get('/', (req, res) => { res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Codelock server</h1>') })

app.use('/workshops', workshopRouter)
app.use('/api/events', eventRouter)
app.use('/api/locations', locationRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server started. Listening on port: ${PORT}`)
})