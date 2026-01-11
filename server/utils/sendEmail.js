import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, htmlContent) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                // Lấy từ biến môi trường Vercel/Local
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: `"CineBook Ticket" <${process.env.MAIL_USER}>`,
            to: to,
            subject: subject,
            html: htmlContent
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully to:', to);
    } catch (error) {
        console.error('❌ Error sending email:', error);
    }
};