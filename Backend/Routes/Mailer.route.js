import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Your existing routes...

router.post('/send-email', async (req, res) => {
    const { email, downloadLink } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other services
        auth: {
            user: 'earn10203@gmail.com', // Your email
            pass: 'gmpr syfl uxhp nipn',  // Your email password or app-specific password
        },
    });

    const mailOptions = {
        from: 'earn10203@gmail.com',
        to: email,
        subject: 'File Share',
        text: `Here is the file link: ${downloadLink}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
    }
});

export default router;
