// Modern email styles with glassmorphism effects
module.exports = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    color: #1f2937;
    background-color: #f3f4f6;
    margin: 0;
    padding: 20px;
  }

  .container {
    max-width: 650px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .header {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(239, 68, 68, 0.95) 100%);
    padding: 40px 20px;
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
    color: white;
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .header p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 18px;
    font-weight: 300;
    position: relative;
  }

  .logo {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.2);
    padding: 5px;
    background: white;
    position: relative;
  }

  .content {
    padding: 40px 30px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
  }

  .greeting {
    font-size: 24px;
    color: #10b981;
    margin-bottom: 20px;
    font-weight: 500;
  }

  .details-box {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    padding: 30px;
    margin: 25px 0;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
  }

  .details-box h3 {
    color: #10b981;
    margin-bottom: 25px;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .detail-row {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    border: 1px solid rgba(16, 185, 129, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .detail-row:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .detail-icon {
    width: 24px;
    height: 24px;
    margin-right: 15px;
    color: #10b981;
  }

  .detail-content {
    flex: 1;
  }

  .detail-content strong {
    display: block;
    color: #374151;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 2px;
  }

  .detail-content span {
    color: #6b7280;
    font-size: 16px;
  }

  .alert {
    background: rgba(255, 251, 235, 0.9);
    border: 1px solid rgba(251, 191, 36, 0.2);
    padding: 25px;
    border-radius: 15px;
    margin: 25px 0;
    position: relative;
    backdrop-filter: blur(10px);
  }

  .alert h4 {
    color: #92400e;
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .alert ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .alert li {
    margin-bottom: 12px;
    padding-left: 25px;
    position: relative;
    color: #92400e;
  }

  .alert li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #10b981;
    font-weight: bold;
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

  .footer-logo {
    width: 60px;
    height: auto;
    margin-bottom: 15px;
    opacity: 0.8;
  }

  .footer h3 {
    color: #374151;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .contact-info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin: 20px 0;
    flex-wrap: wrap;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #6b7280;
    font-size: 14px;
  }

  .contact-icon {
    width: 16px;
    height: 16px;
    opacity: 0.8;
  }

  @media (max-width: 600px) {
    body {
      padding: 10px;
    }

    .container {
      border-radius: 15px;
    }

    .header {
      padding: 30px 15px;
    }

    .header h1 {
      font-size: 24px;
    }

    .content {
      padding: 20px 15px;
    }

    .details-box {
      padding: 20px;
    }

    .contact-info {
      flex-direction: column;
      gap: 15px;
    }
  }
`;