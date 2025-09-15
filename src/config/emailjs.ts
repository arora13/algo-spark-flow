// EmailJS Configuration
// Replace these values with your actual EmailJS credentials

export const EMAILJS_CONFIG = {
  // Your EmailJS service ID (found in EmailJS dashboard under "Email Services")
  serviceId: 'service_2qicz65',
  
  // Your EmailJS template ID (found in EmailJS dashboard under "Email Templates")
  templateId: 'template_ephwkbw',
  
  // Your EmailJS public key (found in EmailJS dashboard under "Account" > "API Keys")
  publicKey: 'o338jScwRcMqjUN5G',
  
  // Your name or team name that will appear in the email
  toName: 'AlgoFlow Team'
};

// Instructions:
// 1. Go to https://www.emailjs.com/
// 2. Create an account or sign in
// 3. Create a new service (Gmail, Outlook, etc.)
// 4. Create a new email template with these variables:
//    - {{from_name}} - sender's name
//    - {{from_email}} - sender's email
//    - {{subject}} - email subject
//    - {{message}} - email message
//    - {{to_name}} - your name/team name
// 5. Copy your Service ID, Template ID, and Public Key
// 6. Replace the values above with your actual credentials
