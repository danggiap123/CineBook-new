import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, htmlContent) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'giap100404@gmail.com', // <--- Thay Email Gmail của bạn
                pass: 'wfrc flvz ieme cjbf'            // <--- Thay Mật khẩu ứng dụng 16 ký tự
            }
        });

        const mailOptions = {
            from: '"Rạp Chiếu Phim CineBook" <giap100404@gmail.com>', // <--- Thay Email của bạn
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