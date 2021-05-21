const express = require('express');
const getRandomAffirmation = require('./random_affirmation');
const allAffirmations = require('./all_affirmations');
var cors = require('cors');
const shibaService = require('./shibes');
const cacheMiddleware = require('./memory-cache-middleware');

const app = express();
app.use(cors());

let PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({affirmation: getRandomAffirmation()});
});

app.get('/all', (req, res) => {
  page = req.query.page;
  perPage = req.query.perPage;
  res.json(allAffirmations(page, perPage));
});

app.get('/shibes', cacheMiddleware(30), (req, res) => {
  shibaService.getShibes(req.query.count, (shibeResp) => {
    let data = '';
    shibeResp.on('data', (chunk) => {
      data += chunk;
    });
    shibeResp.on('end', () => {
    res.send(data);
    })
  });
});

app.get('/dogeTranslate', (req, res) => {
  res.json(shibaService.dogeTranslate(req.query.text));
});


const server = app.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));

module.exports = server;
