const express = require('express'); /* para inicializar el servidor con express*/
const app = express();
const cors = require('cors');

require('./database'); /* anclar base de datos*/

app.use(cors());
app.use(express.json());

app.use('/api',require('./routes/index'))

app.listen(3000);
console.log('server on port',3000);