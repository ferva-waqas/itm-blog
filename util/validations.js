const User = require('../models/User');

module.exports = isEmailExists = value => {
    return User.find({email: value}).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  }

  module.exports = validationError = (errorsDetail) => {
    let errors = {};

    errorsDetail.forEach(error => {
        let {fieldName, errorType, errorMessage} = error;
        errors[fieldName] = { 
            "name": errorType,
            "properties": {
                "message": errorMessage
            },
            "kind" : "",
            "path": ""
        }
    });

    return errors;
}