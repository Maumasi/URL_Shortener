
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

const PORT = 3000;


// new route
// app.get('/', (req, res) => {
//   res.json({helo:'world'});
// });

app.use('/api', require('../routes/api.js')(express));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}` );
});
