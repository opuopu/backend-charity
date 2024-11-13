import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'info@helpforpakstudents.com',
      pass: 'AAHFPS11#@#@',
    },
  });

  await transporter.sendMail({
    from: 'info@helpforpakstudents.com', // sender address
    to, // list of receivers
    subject,
    text: '', // plain text body
    html, // html body
  });
};
