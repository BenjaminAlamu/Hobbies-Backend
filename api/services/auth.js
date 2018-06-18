const passport = require('passport');
const jwt = require('jsonwebtoken');



module.exports = {
  //Login function
  login: function(req, res){
      passport.authenticate('local', function(err, user, info){
        console.log("Here");
        //Checks if error is found or if user doesnt exist
        if(err || !user){
            return res.send({
              success: false,
              status: "Error",
              message: info.message,
                user
            });
        }
        var token = jwt.sign(user, "Secret",(err, token) => {
          expiresIn: 60 * 60 * 24 
          res.send({
            success: true,
            status: "Successful",
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            phonenumber: user.phonenumber,
            email: user.email,
            id: user.id,
            token:token
          });
        });



        // })
      })(req, res);
  },

  //Logout function
  logout: function(req, res) {
    console.log("Here");
      req.logout();
      //Should send something back here

      return res.send({
        success: true,
        status: "Successful",
      });
      console.log("Logged Out");
  },


  //Register function
  register: function(req, res){
    console.log("Create user function");

    data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phonenumber: req.body.phonenumber,
  }


    User.create(data).exec(function (err, user) {
      if(err){
        success = {
          "success": false,
          "status": "Successful",
        }
        res.json(success);
    }
      console.log("Here");
      console.log('User Created.');
      success = {
        "success": true,
        "status": "Successful",
      }

      res.json(success);
    })

  },
  // isvalidtoken: function (token) {
  //   if (token) {
  //     return jwt.verify(token.replace('Bearer ', ''), "Secret");
  //   }
  // }

};