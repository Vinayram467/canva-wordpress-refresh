module.exports = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f6;
    margin: 0;
    padding: 20px;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .header {
    background: #10b981;
    color: white;
    padding: 20px;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
  }

  .content {
    padding: 20px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
  }

  .greeting {
    margin-bottom: 15px;
    color: #333;
  }

  .message {
    color: #555;
    margin-bottom: 20px;
    line-height: 1.6;
  }

  .details-box {
    background: rgba(240, 249, 255, 0.8);
    border-left: 4px solid #10b981;
    padding: 15px;
    margin: 20px 0;
    border-radius: 4px;
  }

  .details-box h3 {
    color: #333;
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 600;
  }

  .detail-item {
    margin: 8px 0;
    color: #444;
  }

  .detail-item strong {
    color: #333;
  }

  .next-steps {
    margin: 25px 0;
  }

  .next-steps h3 {
    color: #333;
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 600;
  }

  .next-steps ul {
    list-style: none;
    padding-left: 0;
  }

  .next-steps li {
    margin-bottom: 10px;
    color: #444;
    display: flex;
    align-items: center;
  }

  .next-steps li::before {
    content: "•";
    color: #10b981;
    font-weight: bold;
    margin-right: 10px;
  }

  .contact-section {
    margin: 25px 0;
  }

  .contact-item {
    display: flex;
    align-items: center;
    margin: 8px 0;
    color: #444;
  }

  .contact-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    color: #10b981;
  }

  .button {
    display: inline-block;
    padding: 12px 24px;
    background: #10b981;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 500;
    margin: 20px 0;
    transition: all 0.3s ease;
  }

  .button:hover {
    background: #059669;
  }

  .signature {
    margin-top: 30px;
    color: #555;
  }

  .signature .company {
    color: #10b981;
    font-weight: 500;
  }

  .signature .title {
    color: #666;
    font-size: 14px;
  }

  .footer {
    text-align: center;
    padding: 15px;
    color: #666;
    font-size: 12px;
    border-top: 1px solid #eee;
    background: rgba(249, 250, 251, 0.8);
    backdrop-filter: blur(5px);
  }

  @media (max-width: 600px) {
    body {
      padding: 10px;
    }

    .container {
      margin: 0;
    }

    .header {
      padding: 15px;
      font-size: 20px;
    }

    .content {
      padding: 15px;
    }
  }
`;