const express = require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
const port = 3000;

//Middleware to parse JSON requests
app.use(bodyParser.json());

//Middleware to use the routes defined in dataRoutes.js
app.use('/api', dataRoutes);

//Serve static files from the 'public' directory
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
