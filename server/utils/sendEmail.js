import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, htmlContent) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                // SỬA 2 DÒNG NÀY:
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: `"Rạp Chiếu Phim CineBook" <${process.env.MAIL_USER}>`, // Sửa luôn dòng này cho chuyên nghiệp
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