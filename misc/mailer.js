const nodemailer = require('nodemailer')

const sendEmail = (email, nameUser) => {
    const mailOptions = {
        from: 'nelydwia@gmail.com',
        to: email,
        subject: 'Welcome!',
        text: `Hi ${nameUser}, you have successfully registered`
    }
    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
            user: 'nelydwia@gmail.com',
            pass: 'XA9c7zsnHkNatb10'
        }
    });
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) reject(err)
            else resolve(info)
        })
    })
}

const sendOTP = (receiver, messageToBeSent) => {
    const mailOptions = {
        from: 'nelydwia@gmail.com',
        to: `${receiver}`,
        subject: 'Verification Code!',
        text: `${messageToBeSent}`
    }
    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
            user: 'nelydwia@gmail.com',
            pass: 'XA9c7zsnHkNatb10'
        }
    });
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) reject(err)
            else resolve(info)
        })
    })
}

module.exports = {
    sendEmail,
    sendOTP
}
