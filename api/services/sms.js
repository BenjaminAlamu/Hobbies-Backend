const twilio = require('twilio');

module.exports = (message) => {
  const accountSid ="ACe9d79939bba310c301db328a6e05c3a0"; 
  const authToken ="a565fd3be6bb8dfbc9260be2d7e6c6a5";   
  const fromNumber = "+13342924249";
  const toNumber = "+2348103374289"; 
  const client = new twilio(accountSid, authToken);

  return client.messages.create({
    body: message,
    to: toNumber,  // Text this number
    from: fromNumber // From a valid Twilio number
  })
}
