const express = require('express');
const app = express();
const port = 3100;

app.use(express.json());

let directors = [
  { id: 1, name: 'Moh. Jevon Attaillah', birthYear: 2005 },
  { id: 2, name: 'Mima Hayatun Nikma', birthYear: 1981 },
  { id: 3, name: 'Ferry Prayitno', birthYear: 1981 }
];

app.get('/directors', (req, res) => {
  res.json(directors);
});

// get
app.get('/directors/:id', (req, res) => {
  const director = directors.find(d => d.id === parseInt(req.params.id));
  if (director) {
    res.json(director);
  } else {
    res.status(404).json({ error: 'Sutradara tidak ditemukan' });
  }
});

// post
app.post('/directors', (req, res) => {
  const { name, birthYear } = req.body || {};
  if (!name || !birthYear) {
    return res.status(400).json({ error: 'name dan birthYear wajib diisi' });
  }

  const newDirector = {
    id: directors.length ? directors[directors.length - 1].id + 1 : 1,
    name,
    birthYear
  };
  directors.push(newDirector);
  res.status(201).json(newDirector);
});

// put
app.put('/directors/:id', (req, res) => {
  const id = Number(req.params.id);
  const directorIndex = directors.findIndex(d => d.id === id);

  if (directorIndex === -1) {
    return res.status(404).json({ error: 'Sutradara tidak ditemukan' });
  }

  const { name, birthYear } = req.body || {};
  if (!name || !birthYear) {
    return res.status(400).json({ error: 'name dan birthYear wajib diisi' });
  }

  const updatedDirector = { id, name, birthYear };
  directors[directorIndex] = updatedDirector;
  res.json(updatedDirector);
});

// delete
app.delete('/directors/:id', (req, res) => {
  const id = Number(req.params.id);
  const directorIndex = directors.findIndex(d => d.id === id);

  if (directorIndex === -1) {
    return res.status(404).json({ error: 'Sutradara tidak ditemukan' });
  }

  directors.splice(directorIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});