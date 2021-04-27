const express = require('express');
const ownerRouter = require('./router/owner.router');
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json())
app.use('/api', ownerRouter);

app.listen(PORT, function () {
  console.log('%s listening at %s', app.name, app.url);
});
