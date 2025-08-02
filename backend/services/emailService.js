const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Base64 encoded icons for email client compatibility
const ICONS = {
  email: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACEklEQVRIie2UvWtTURjGf+fek9ybm48mTW2T2n5QU0VaBUEcdBIEJ3EQdHB0chBcBP8AcRUXQXBxUxQHK4pL1UVwqaKDgqWKtQbT5t7ce46DSdDm3ksGXXzgwPu+h/M8z3nPgX+NUwDdHPVd0+oVIWqe0lqXnVK5ePXSxVqrF71WsNlsnrkwPzE2NhZYXhbPyxGGIZubmzQaDZrNJmEYopQKPM87Njk5eWxhYSF8r0Cj0bg+NTX1aGpykkQiwZ3799jY2CAIAoQQKKVQSmGMwRjD8vIyS0tLrK6uXs1ms/cBVhZfRe6gB+Dc7MzS9PT0uBCCx0+fEEURxhiMMQghiKIIYwxKKZRSGGNYW1vj5YsF7+zZM+fX19fnAXZ29+yDhw/QWqO1RkqJlBIpJUophBBIKQmCAKUUWmv6+/s5efIEYRiitQ6TyaRbLpf9g4DWGgBrLUopjDEopbDWIqXEGIPWGmstxhi01iilsNZiraW3t5e+vj6UUlhrD0DWWqy1SCmx1hKGIVprjDEHea01UkqstQRBgNYarTVRFNHV1UUqlSIMQ6y1hxuttVhriaIIrTVBEKC1JgxDtNYHVzHGIIQgiiKstUgpiaKI7u5uEokEQRAcPnRrLVJKoigiDEOCICAIAowxSCmJoghrbWyeEIIwDPF9n3Q6jed5RFH0+9A/jZ/NIx6dR4e4YAAAAABJRU5ErkJggg==',
  phone: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACDklEQVRIie2UO2gUURSGv3NnZ3Y3m8Rk8yAkwRgTNYqCYqGgIFgoCFYWFhYWgp2FjY2FhYWFhYWgkEZQtLAQFERQfKGIGo0aH/GR3c3uzNw7x2JjzGZnk0KxEA8Mc+89/zn/f84M/NdvjgK6OuK7jq4XpFQ1X2tTdkqVwpXzZ2utXvRawWazefr83NSRkZHQ87KEYUgQBGxsbNBsNmk2m4RhiFIq9H3/8Pj4+KH5+fnojQLNZvPa5OTk/YmJCZLJJLcf3GV9fZ0wDBFCoJRCKYUxBmMMy8vLLC4usrKycjmbzd4DWHr9JnYHPQBnZ6aXpqamRoUQPHn2lDiOMcZgjEEIQRzHGGNQSqGUwhiD53m8evnCPzU9fXZ1dXUOYHtnzz18/AitNVprpJRIKZFSopRCCIGUkjAMUUqhtWZwcJDjx44RRRFaa5FKpdxyuez/BGitAbDWopTCGINSCmst1wNBhEBai9YaYwxaa5RSWGux1jIwMMDg4CBKKay1PwHWWqy1SCmx1hJFEVrr+MX7FZ6/XSPjJTg1NshkxkNrjZQSay1hGKK1RmtNHMf09PTQ399PFEVH0oOXpqamMMYQxzFaa8IwRGtNFEVorZFSYowhiiKstUgpieOYvr4+kslkY3h4+GhXV9dTYwzWWqSUxHFMFEWEYUgYhhhjkFISxzHW2sQ8IQRRFNFoNEin03ieh7WWer3+7tChv4wvwFEgnZ+IVNAAAAAASUVORK5CYII=',
  calendar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACDklEQVRIie2UPWgUQRiGn9m93b3L5c5EjZ6JGhM1KgpqYyEIFoKFhYWFhYWFjYWFhYWFhYWFhYWgkEZQtLAQFERQTIxG84Mk5n67t7s3OxYXL8n+7BWCheAHw8z3zfvO+8wM/Nd/HgVwZTRwbaMvSKlqgTGm4pSrhYvnztRbvei1gs1m88T5uemxsbHI93NEUUQYhmxsbNBsNmk2m0RRhFIq8n3/4Pj4+IH5+fnkjQLNZvPq5OTknYmJCVKpFLce3mZ9fZ0oihBCoJRCKYUxBmMMy8vLLCwssLKycimXy90BWHzzNnUHPQBnZqaXpqamxoUQPH32hCRJMMZgjEEIQZIkGGNQSqGUwhiD53m8fvXSPzk9fWZ1dXUOYHtnz3348BFaa7TWpNNp0uk0UkqUUgghkFIShRFKKbTWDA0NcfTIEeI4RmsjUum0Wy6X/Z8ArTUA1lqUUhhjUEphrUUIgZQSrTXGGLTWKKWw1mKtZXBwkKGhIZRSWGt/AlhrsdbS09NDPp8niiK01mitsdYipURrjZQSYwxxHGOtRUpJkiT09/czMDBAHMdYaw/uoLu7G2MMSZKgtSaMQrTWxHGM1hqlFMYY4jjGWouUkiRJ6OvrI5VKNYaHh4+4rvvEGIO1FiklSZIQxzFRFBFFEcYYpJQkSYK1NjVPCEEcRzQaDTKZDJ7nYa2lXq+/O3jo38YX4JIgnbB4Eg4AAAAASUVORK5CYII=',
  time: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACEklEQVRIie2UO2gUURSGv3NnZ3Y3m8Rk8yAkwRgTNYqCYqGgIFgoCFYWFhYWgp2FjY2FhYWFhYWgkEZQtLAQFERQfKGIGo0aH/GR3c3uzNw7x2JjzGZnk0KxEA8Mc+89/zn/f84M/NdvjgK6OuK7jq4XpFQ1X2tTdkqVwpXzZ2utXvRawWazefr83NSRkZHQ87KEYUgQBGxsbNBsNmk2m4RhiFIq9H3/8Pj4+KH5+fnojQLNZvPa5OTk/YmJCZLJJLcf3GV9fZ0wDBFCoJRCKYUxBmMMy8vLLC4usrKycjmbzd4DWHr9JnYHPQBnZ6aXpqamRoUQPHn2lDiOMcZgjEEIQRzHGGNQSqGUwhiD53m8evnCPzU9fXZ1dXUOYHtnzz18/AitNVprpJRIKZFSopRCCIGUkjAMUUqhtWZwcJDjx44RRRFaa5FKpdxyuez/BGitAbDWopTCGINSCmstUkqklGitMcagtUYphbUWay0DAwMMDg6ilMJa+xPAWou1FiklSZIQRRFaa6SUGGOIoghrrX2fJ0kSent76e/vJ4oirLUHd9DV1YUxhjiO0VoThiFaa+I4RmuNUgpjDHEcY61FSkkURfT19ZFMJhvDw8NHXNd9YozBWouUkjiOiaKIMAyJoui9tfaFtfaVMeattTYxTwhBFEU0Gg0ymQye52GtpV6vvzt46G/jC/AJhZ+dR/4sMHgAAAAASUVORK5CYII=',
  location: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACFUlEQVRIie2UPWgUQRiGn9m93b3L5c5EjZ6JGhM1KgpqYyEIFoKFhYWFhYWFjYWFhYWFhYWFhYWgkEZQtLAQFERQTIxG84Mk5n67t7s3OxYXL8n+7BWCheAHw8z3zfvO+8wM/Nd/HgVwZTRwbaMvSKlqgTGm4pSrhYvnztRbvei1gs1m88T5uemxsbHI93NEUUQYhmxsbNBsNmk2m0RRhFIq8n3/4Pj4+IH5+fnkjQLNZvPq5OTknYmJCVKpFLce3mZ9fZ0oihBCoJRCKYUxBmMMy8vLLCwssLKycimXy90BWHzzNnUHPQBnZqaXpqamxoUQPH32hCRJMMZgjEEIQZIkGGNQSqGUwhiD53m8fvXSPzk9fWZ1dXUOYHtnzz18/AitNVprpJRIKZFSopRCCIGUkjAMUUqhtWZwcJDjx44RRRFaa5FKpdxyuez/BGitAbDWopTCGINSCmstUkqklGitMcagtUYphbUWay0DAwMMDg6ilMJa+xPAWou1FiklSZIQRRFaa6SUGGOIoghrrX2fJ0kSent76e/vJ4oirLUHd9DV1YUxhjiO0VoThiFaa+I4RmuNUgpjDHEcY61FSkkURfT19ZFMJhvDw8NHXNd9YozBWouUkiRJiOOYKIqIoui9tfaFtfaVMeattTYxTwhBHEc0Gg0ymQye52GtpV6vvzt46G/jC/AJhZ+dR/4sMHgAAAAASUVORK5CYII=',
  user: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACEklEQVRIie2UO2gUQRiGv3NnZ3Y3m8Rk8yAkwRgTNYqCYqGgIFgoCFYWFhYWgp2FjY2FhYWFhYWgkEZQtLAQFERQfKGIGo0aH/GR3c3uzNw7x2JjzGZnk0KxEA8Mc+89/zn/f84M/NdvjgK6OuK7jq4XpFQ1X2tTdkqVwpXzZ2utXvRawWazefr83NSRkZHQ87KEYUgQBGxsbNBsNmk2m4RhiFIq9H3/8Pj4+KH5+fnojQLNZvPa5OTk/YmJCZLJJLcf3GV9fZ0wDBFCoJRCKYUxBmMMy8vLLC4usrKycjmbzd4DWHr9JnYHPQBnZ6aXpqamRoUQPHn2lDiOMcZgjEEIQRzHGGNQSqGUwhiD53m8evnCPzU9fXZ1dXUOYHtnzz18/AitNVprpJRIKZFSopRCCIGUkjAMUUqhtWZwcJDjx44RRRFaa5FKpdxyuez/BGitAbDWopTCGINSCmstUkqklGitMcagtUYphbUWay0DAwMMDg6ilMJa+xPAWou1FiklSZIQRRFaa6SUGGOIoghrrX2fJ0kSent76e/vJ4oirLUHd9DV1YUxhjiO0VoThiFaa+I4RmuNUgpjDHEcY61FSkkURfT19ZFMJhvDw8NHXNd9YozBWouUkiRJiOOYKIqIoui9tfaFtfaVMeattTYxTwhBHEc0Gg0ymQye52GtpV6vvzt46G/jC/AJhZ+dR/4sMHgAAAAASUVORK5CYII='
};

// Email styles with glassmorphism
const emailStyles = `
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #f3f4f6 0%, #fff 100%);
  }
  .container {
    max-width: 600px;
    margin: 20px auto;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  .header {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 30px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
    backdrop-filter: blur(5px);
  }
  .header h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    position: relative;
  }
  .content {
    padding: 30px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
  }
  .details-box {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    padding: 25px;
    margin: 20px 0;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
  }
  .details-box h3 {
    color: #10b981;
    margin: 0 0 20px 0;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid #10b981;
    padding-bottom: 10px;
    display: inline-block;
  }
  .detail-row {
    display: flex;
    align-items: center;
    margin: 15px 0;
    padding: 12px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    border: 1px solid rgba(16, 185, 129, 0.1);
    transition: transform 0.2s;
  }
  .detail-row:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  .icon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    vertical-align: middle;
  }
  .button {
    display: inline-block;
    padding: 12px 30px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    text-decoration: none;
    border-radius: 25px;
    font-weight: 500;
    margin: 20px 0;
    text-align: center;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
  }
  .button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
  }
  .footer {
    text-align: center;
    padding: 30px;
    background: rgba(249, 250, 251, 0.9);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.3);
  }
  .footer p {
    margin: 5px 0;
    color: #666;
  }
`;

// Rest of the validation functions remain the same...

const generateSecureAppointmentConfirmationEmail = (data) => {
  const sanitizedData = {
    patientName: sanitizeInput(data.patientName || data.name || ''),
    email: sanitizeInput(data.email || data.patientEmail || ''),
    phone: sanitizeInput(data.phone || data.patientPhone || ''),
    date: sanitizeInput(data.date || data.appointmentDate || ''),
    time: sanitizeInput(data.time || data.appointmentTime || ''),
    reason: sanitizeInput(data.reason || '')
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>${emailStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Your Submission!</h1>
        </div>
        
        <div class="content">
          <div class="details-box">
            <h3>
              <img src="${ICONS.user}" class="icon" alt="User">
              Personal Information
            </h3>
            <div class="detail-row">
              <img src="${ICONS.user}" class="icon" alt="Name">
              <div>
                <strong>Patient Name:</strong><br>
                ${sanitizedData.patientName}
              </div>
            </div>
            <div class="detail-row">
              <img src="${ICONS.email}" class="icon" alt="Email">
              <div>
                <strong>Email:</strong><br>
                ${sanitizedData.email}
              </div>
            </div>
            <div class="detail-row">
              <img src="${ICONS.phone}" class="icon" alt="Phone">
              <div>
                <strong>Phone:</strong><br>
                ${sanitizedData.phone}
              </div>
            </div>
          </div>

          <div class="details-box">
            <h3>
              <img src="${ICONS.calendar}" class="icon" alt="Calendar">
              Appointment Details
            </h3>
            <div class="detail-row">
              <img src="${ICONS.calendar}" class="icon" alt="Date">
              <div>
                <strong>Date:</strong><br>
                ${sanitizedData.date}
              </div>
            </div>
            <div class="detail-row">
              <img src="${ICONS.time}" class="icon" alt="Time">
              <div>
                <strong>Time:</strong><br>
                ${sanitizedData.time}
              </div>
            </div>
            ${sanitizedData.reason ? `
            <div class="detail-row">
              <img src="${ICONS.user}" class="icon" alt="Reason">
              <div>
                <strong>Reason:</strong><br>
                ${sanitizedData.reason}
              </div>
            </div>
            ` : ''}
          </div>

          <div class="details-box">
            <h3>
              <img src="${ICONS.time}" class="icon" alt="Next">
              Next Steps
            </h3>
            <div class="detail-row">
              <img src="${ICONS.calendar}" class="icon" alt="Review">
              Our team will review your submission within 2-3 business days
            </div>
            <div class="detail-row">
              <img src="${ICONS.email}" class="icon" alt="Update">
              You will receive an email update once the review is complete
            </div>
            <div class="detail-row">
              <img src="${ICONS.phone}" class="icon" alt="Contact">
              If we need additional information, we'll contact you directly
            </div>
          </div>

          <div class="details-box">
            <h3>
              <img src="${ICONS.phone}" class="icon" alt="Emergency">
              Emergency Contact
            </h3>
            <div class="detail-row">
              <img src="${ICONS.phone}" class="icon" alt="Phone">
              <div>
                <strong>24/7 Emergency:</strong><br>
                +91 98450 12345
              </div>
            </div>
          </div>

          <a href="https://maiyahospital.com" class="button">Visit Our Website</a>

          <div class="footer">
            <p><strong>Maiya Multi Speciality Hospital</strong></p>
            <div class="detail-row">
              <img src="${ICONS.location}" class="icon" alt="Location">
              34, 10th Main Rd, Jayanagar 1st Block
            </div>
            <div class="detail-row">
              <img src="${ICONS.phone}" class="icon" alt="Phone">
              +91 98450 12345
            </div>
            <div class="detail-row">
              <img src="${ICONS.email}" class="icon" alt="Email">
              social.maiya@gmail.com
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">
              This is an automated confirmation email. Please do not reply directly to this message.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Rest of the code (generateSecureAdminNotification, sendUserConfirmation, sendAdminNotification) remains the same...

module.exports = {
  sendUserConfirmation,
  sendAdminNotification,
  validateEmail,
  sanitizeInput
};