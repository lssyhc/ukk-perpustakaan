const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const bukuRoutes = require('./routes/bukuRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./models');
db.sequelize.sync();

app.use('/api/bukus', bukuRoutes);

app.listen(port, () => {console.log(`App listening on port http://localhost:${port}`)});