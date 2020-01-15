const express = require('express');
const os = require('os');
const cluster = require('cluster');
const config = require('./config');
const { PORT } = config;
const scrapper = require('./src/routes/Amazon/scrapper');
const mysqlConnection = require('./src/database/connect');
const clusters = os.cpus().length;

if (cluster.isMaster) {
  console.log('Master cluster setting up ' + clusters + ' workers...');
  for (let i = 0; i < clusters; i++) {
    cluster.fork();
  }
  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });
  cluster.on('exit', function(worker) {
    console.log('Worker', worker.process.pid, ' has exitted.');
    console.log('Satrting new worker');
    cluster.fork();
  });
} else {
  const app = express();

  //routes
  app.use('/search', scrapper);
  app.use('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  app.listen(PORT, function() {
    console.log(
      `Express server listening on port ${PORT} and worker ${process.pid}`
    );
  });
}
