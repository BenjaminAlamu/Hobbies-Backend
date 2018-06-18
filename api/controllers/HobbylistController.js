const sendSms = require('../services/sms');
const sendEmail = require('../services/email');
const verify = require('../services/verify');
const jwt = require('jsonwebtoken');
/**
 * HobbylistController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    edit: async (req, res) => {

            //Verify tokens
            verify.verifyToken(req, res);
            jwt.verify(req.token, 'Secret', (err, authData) => {
              if(err) {
                console.log("Inside Error");
                console.log("Error");
                return res.json({
                  tokenNotFound: true,
                  status: "Error"
                });
              } 
            });

        console.log("Edit");
        console.log(req.params.id);
        
        var hobbies = await Hobbylist.findOne({
            where: {id:req.params.id},
            select: ['id', 'hobby','userid']
        });
        console.log(hobbies);
          console.log(hobbies.hobby);
          return res.json(hobbies);
        
      },

      update: async (req, res) => {

      //Verify tokens
      verify.verifyToken(req, res);
      jwt.verify(req.token, 'Secret', (err, authData) => {
        if(err) {
          console.log("Inside update Error");
          console.log("Error");
          return res.json({
            tokenNotFound: true,
            status: "Error"
          });
        } 
      });
        
        console.log("Update");
        var id = req.body.id;
        console.log(req);
        
        var hobbies = await Hobbylist.update({id:req.body.id})
        .set({hobby:req.body.hobby});
          console.log(hobbies);

          var message = "You have edited a hobby to " + req.body.hobby;
          sendSms(message).then((response) => {
              if (response.errorCode) {
                res.json({
                  status: 'failed',
                  statusCode: 500,
                  message: 'could not send sms'
                });
              }
            }).catch(error => {
              console.log("error", error);
              res.json({
                status: 'failed',
                statusCode: 200,
                message: 'could not send sms'
              });
            });

            sendEmail(message);

           

          return res.send({
            success: true,
            status: "Updated"
          });

          
        
      },

    view: async (req, res) => {

      console.log(process.env.development);
      //Verify tokens
      verify.verifyToken(req, res);
      jwt.verify(req.token, 'Secret', (err, authData) => {
        if(err) {
          console.log("Inside Error");
          console.log("Error");
          return res.json({
            tokenNotFound: true,
            status: "Error"
          });
        } 
      });
       
        var hobbies = await Hobbylist.find({
            where: {userid:req.params.id},
            select: ['id', 'hobby','userid']
        });
          console.log(hobbies);
          return res.json(hobbies);
        
      },


      delete:  async (req, res) => {

                    //Verify tokens
                    verify.verifyToken(req, res);
                    jwt.verify(req.token, 'Secret', (err, authData) => {
                      if(err) {
                        console.log("Inside Error");
                        console.log("Error");
                        return res.json({
                          tokenNotFound: true,
                          status: "Error"
                        });
                      } 
                    });
                    
        console.log("Delete");
        
        try{
            var hobbies = await Hobbylist.destroy({id:req.params.id});
            console.log("Hobby deleted");


            var message = "You have deleted a hobby ";
            sendSms(message).then((response) => {
                if (response.errorCode) {
                  res.json({
                    status: 'failed',
                    statusCode: 500,
                    message: 'could not send sms'
                  });
                }
              }).catch(error => {
                console.log("error", error);
                res.json({
                  status: 'failed',
                  statusCode: 200,
                  message: 'could not send sms'
                });
              });
              sendEmail(message);

            return res.send({
                success: true,
                status: "Deleted"
              });


        }
        catch(error){
            return res.send({
                success: false,
                status: "Error"
              });
        }
        
        

      },
      add:  async (req, res) => {
          console.log("Here Add");          

        try {var me = await Hobbylist.create({
                username: req.body.username,
                userid : req.body.userid,
                hobby: req.body.hobby
          });
        }catch(error){
            return res.send({
                success: false,
                status: "Error could not add "
              });
        }

        var message = "You have added a new hobby " + req.body.hobby;
        sendSms(message).then((response) => {
            if (response.errorCode) {
              res.json({
                status: 'failed',
                statusCode: 500,
                message: 'could not send sms'
              });
            }
          }).catch(error => {
            console.log("error", error);
            res.json({
              status: 'failed',
              statusCode: 200,
              message: 'could not send sms'
            });
          });

          sendEmail(message);

        return res.send({
            success: true,
            status: "Added"
          });

      },
      



};

