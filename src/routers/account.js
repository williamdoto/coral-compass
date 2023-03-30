const mongoose = require('mongoose');

const Account = require("../models/account");

module.exports = {
    createAccount: function (req, res) {
        let theAccount = new Account({username: req.body.username, email: req.body.email, password: req.body.password});
        theAccount.save().then(() => {
            console.log('User saved successfully');
          })
          .catch((error) => {
            console.error('Error saving user:', error);
          });
    },
}