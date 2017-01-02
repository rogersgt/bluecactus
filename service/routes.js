module.exports = function(app,config) {

  const emailer = require('./email');

  // in PRD mode the '/' location will be proxied out
  // to the client endpoint instead of serving it here
  if (config.api.ENV === "DEV") {
    app.get('/', function(req,res) {
      res.sendFile(__dirname + '/app');
    });
  }

  app.get('/api', function(req,res) {
    res.json({status:200, text: "OK"});
});

  app.post('/api/contact', function(req,res) {
    let message = req.body;
    let result = emailer(message,config);
    res.send(result);
  });

};
