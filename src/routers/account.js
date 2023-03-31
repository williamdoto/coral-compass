const mongoose = require('mongoose');

const Account = require("../models/account");

module.exports = {
    createAccount: async function (req, res) {
        let theAccount = new Account({username: req.body.username, email: req.body.email, password: req.body.password});

        try {
            const docs = await Account.find({ 'email': theAccount.email });
            if (docs.length === 0) {
                try {
                    await theAccount.save();
                    console.log('User saved successfully');
                } catch (error) {
                    console.error('Error saving user:', error);
                }
            } else {
                console.log("Duplicate user found");
            }
        } catch (error) {
            console.error('Error fetching account:', error);
        }
    },
    findAccount: function (req,res){
        const accountEmail = req.body.email;
        console.log(accountEmail)
        Account.find({'email': accountEmail}, function (err, docs) {
            // docs is an array
          }).exec(function (err, result) {
            if (err) return res.json(err);
            else res.json(result);
        })
    }
}