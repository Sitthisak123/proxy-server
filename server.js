const express = require('express');
const app = express();

// Add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api', async (req, res) => {
  try {
    const { url } = req.query;
    console.log(`Proxy -> ${url}`)

    if (!url) {
      return res.status(400).json({ error: 'Missing URL parameter' });
    }

    try {
      new URL(url);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid URL' });
    }


    try {
      await fetch(url, { method: 'POST' });
    } catch (error) {
      return res.status(400).json({ error: "Failed to fetch" });
    }

    const response = await fetch(url);
    const data = await response.text();

    res.status(200).json(data);

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.post('/*', async (req, res) => {
  try {
    const { url } = req.query;
    console.log(`Proxy:\t'/*'\t->\t${url}`)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));