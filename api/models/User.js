/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt-nodejs');

module.exports = {

  attributes: { 

      username: {
        type: 'STRING',
        required: true,
        unique: true
      },
      phonenumber: {
        type: 'number',
        required: true,
      },
      firstname: {
        type: 'STRING',
        required: true,
      },
      lastname: {
        type: 'STRING',
        required: true,
      },
      email: {
        type: 'STRING',
        required: true,
        unique: true
      },
      password: {
        type: 'STRING',
        required: true
      }

  },
  customToJSON: function () {
    return _.omit(this, ['password']);
  },
  beforeCreate: function (user, cb) {
    delete user.password_confirmation;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function () {}, function (err, hash) {
        user.password = hash;
        cb(null, user);
      });
    });
  }

};

