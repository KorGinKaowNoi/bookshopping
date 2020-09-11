const email = require('nodemailer');
exports.emailing = email.createTransport({
    service:'gmail',
    auth:{
        user:'bookshopprojectnoreply@gmail.com',
        pass:'Bookcart123'
    }
});
