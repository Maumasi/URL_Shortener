
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

const PORT = 3000;


// new route
// app.get('/', (req, res) => {
//   res.json({helo:'world'});
// });


// from here all routes will start with '/api'
app.use('/api/v1', require('../routes/api.js')(express));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}` );
});
