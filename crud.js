const express = require('express');
const app = express();
const port = 8080;
const Pool = require('pg').Pool;

const pool = new Pool({
    database: 'latihanapi',
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: '04012003'
});

 pool.connect()
   .then(() => console.log('masih Terhubung ke PostgreSQL'))
   .catch(err => console.error('Gagal terhubung:', err));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('nona revafidela');
});

 // get all events
  app.get('/events', async (req, res) => {
      let events = await pool.query('SELECT * FROM events');
      res.send(events.rows);
  });

  // get events details
  app.get('/events/:id', async (req, res) => {
      let id = req.params.id;
      let events = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
      res.send(events.rows);
  });

  
  app.post('/events', async (req, res) => {
      let event_name = req.body.event_name;
      let organizer_name = req.body.organizer_name;
      let event_date = req.body.event_date;
      let is_registered = req.body.is_registered;

      let events = await pool.query('INSERT INTO events (event_name, organizer_name, event_date, is_registered) values ($1, $2, $3, $4)', [event_name, organizer_name, event_date, is_registered]);
      res.json({ data: events.rowCount });
  });

 app.listen(port, () => {
     console.log('running on port', port);
 });