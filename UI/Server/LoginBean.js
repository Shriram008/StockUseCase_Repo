const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ID = new Schema({

  FirstName :{
    type: String
  },
  LastName: {
    type: String
  },
  Gender : {
    type: String
  },
   CreatedOn: {
    type: Date
  }, 
  UserName: {
    type: String
  },

  Email: {
    type: String
  },
  Password: {
    type: String
  }
  
});
module.exports = mongoose.model('Profile_Login', ID);