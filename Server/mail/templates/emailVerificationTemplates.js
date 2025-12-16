const otpTemplate = (otp, username = 'User') => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #18181b;
				font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
				font-size: 16px;
				line-height: 1.6;
				color: #ffffff;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 40px auto;
				background: linear-gradient(135deg, #27272a 0%, #18181b 100%);
				border-radius: 16px;
				padding: 40px;
				box-shadow: 0 4px 20px rgba(249, 115, 22, 0.2);
				border: 2px solid #f97316;
			}
	
			.header {
				text-align: center;
				margin-bottom: 30px;
			}
	
			.logo {
				font-size: 32px;
				font-weight: bold;
				color: #f97316;
				margin-bottom: 10px;
			}
	
			.greeting {
				font-size: 24px;
				font-weight: bold;
				color: #ffffff;
				margin-bottom: 20px;
				text-align: left;
			}
	
			.message {
				font-size: 16px;
				color: #e4e4e7;
				margin-bottom: 30px;
				text-align: left;
				line-height: 1.8;
			}
	
			.otp-container {
				background: #27272a;
				border: 3px solid #f97316;
				border-radius: 12px;
				padding: 30px;
				text-align: center;
				margin: 30px 0;
			}

			.otp-label {
				font-size: 14px;
				color: #f97316;
				font-weight: 600;
				letter-spacing: 2px;
				margin-bottom: 15px;
				text-transform: uppercase;
			}
	
			.otp-code {
				font-size: 48px;
				font-weight: bold;
				color: #f97316;
				letter-spacing: 8px;
				margin: 10px 0;
				text-shadow: 0 0 10px rgba(249, 115, 22, 0.3);
			}
	
			.expiry {
				font-size: 14px;
				color: #a1a1aa;
				margin-top: 15px;
			}

			.expiry-highlight {
				color: #f97316;
				font-weight: bold;
			}

			.footer {
				margin-top: 30px;
				padding-top: 20px;
				border-top: 1px solid #3f3f46;
				text-align: center;
			}
	
			.support {
				font-size: 14px;
				color: #a1a1aa;
			}

			.support a {
				color: #f97316;
				text-decoration: none;
			}

			.warning {
				font-size: 13px;
				color: #fca5a5;
				margin-top: 20px;
				padding: 15px;
				background: rgba(220, 38, 38, 0.1);
				border-radius: 8px;
				border-left: 3px solid #dc2626;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<div class="header">
				<div class="logo">🎓 StudyNotion</div>
			</div>
			
			<div class="greeting">Hello ${username}! 👋</div>
			
			<div class="message">
				Thank you for registering with StudyNotion. To complete your registration and verify your account, please use the OTP code below:
			</div>

			<div class="otp-container">
				<div class="otp-label">Your OTP Code</div>
				<div class="otp-code">${otp}</div>
				<div class="expiry">
					⏱️ This code will expire in <span class="expiry-highlight">5 minutes</span>
				</div>
			</div>

			<div class="message">
				Once your account is verified, you'll have full access to our platform and can start exploring thousands of courses.
			</div>

			<div class="warning">
				🔒 If you didn't request this code, please ignore this email and your account will remain secure.
			</div>

			<div class="footer">
				<div class="support">
					Need help? Contact us at <a href="mailto:support@studynotion.com">support@studynotion.com</a>
				</div>
			</div>
		</div>
	</body>
	
	</html>`;
};
module.exports = otpTemplate;