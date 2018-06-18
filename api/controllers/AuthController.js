/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var auth = require('../services/auth.js');

module.exports = {
  register: function (req, res) {
    auth.register(req, res);
  },
  login: function (req, res) {
      
    auth.login(req, res);
  },
  logout: function (req, res) {
    console.log("Pre logout");
    req.logout();

  }
};
