import { sendMail } from './sendMail';
const macOsBattery = require('macos-battery');
const BATTERY_LIMIT = 10;

setInterval(() => {
    macOsBattery.getBatteryChargePercent()
      .then(batteryPercent => {
        if (batteryPercent != -1) {
          if(batteryPercent == BATTERY_LIMIT){
            console.log(`BATTERY IS AT ${BATTERY_LIMIT}`);
          }
        } else {
          console.log(`Battery charge can't be determined. Possibly running on a device with no battery.`)
        }
      }).catch(err => {
        console.log(`error: ${err}.`);
      });
})




// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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






export default contactFormHandler
