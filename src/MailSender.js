import nodemailer from 'nodemailer';

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.STMP_HOST,
      port: process.env.STMP_PORT,
      auth: {
        user: process.env.STMP_USER,
        pass: process.env.STMP_PASS,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Notes Apps',
      to: targetEmail,
      subject: 'Ekspor Catatan',
      text: 'Terlampir hasil dari ekspor catatan',
      attachments: [
        {
          filename: 'notes.json',
          content,
        },
      ],
    };
    return this.transporter.sendMail(message);
  }
}

export default MailSender;
