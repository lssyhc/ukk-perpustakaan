const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

const bukuRoutes = require('./routes/bukuRoutes');

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

const db = require('./models');
db.sequelize.sync();

app.use('/api/bukus', bukuRoutes);

app.listen(port, () => {console.log(`App listening on port http://localhost:${port}`)});