
module.exports = (message) => {
    var api_key = '65e28f7b7fa9339ff1aab6259b3cfa34-47317c98-201cf00a';
    var domain = 'sandboxa9aad8d89c2c4fafb0153b4ff8443021.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

    var data = {
        from: 'Benjamin Alamu <ayanbukolaalamu@gmail.com>',
        to: 'oluwaseunalamu@gmail.com',
        subject: 'Hello',
        text: message
      };
       
      mailgun.messages().send(data, function (error, body) {
        console.log(body);
      });
}
