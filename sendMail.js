import nodemailer from 'nodemailer'
import {google} from 'googleapis'

// create OAuth2 client credentials
const CLIENT_ID = process.env.CLIENT_ID 
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
})
// replace with your refresh token
oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});


const sendMail = async ({ email, name, message }) => {

    const accessToken = await oAuth2Client.getAccessToken()
  
    let transporter = nodemailer.createTransport({
      // @ts-ignore
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "infotorch2014@gmail.com", // replace with your Gmail email address
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        accessToken: accessToken,
        refreshToken: REFRESH_TOKEN
      },
    });
    console.log(`Email: ${email}`)
    const mailOptions = {
      from: `${name} <${email}>`,
      to: "infotorch2014@gmail.com",
      subject: "Message From Your Portfolio Website",
      text: `From: ${name} (${email}) ${message}`,
      html: `From: <i>${name} (${email})  <br>-------------------<br> <b>${message}</b>`,
    }
  
    // send mail with defined transport object
    return transporter.sendMail(mailOptions,(error,info) => {
      if(error){
        console.log(JSON.stringify(error))
      }else{
        console.log(info.envelope)
        console.log("Message sent: %s ", info.messageId)
      }
  
    });
}
  
export { sendMail }