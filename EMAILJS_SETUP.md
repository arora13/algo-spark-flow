# EmailJS Setup Instructions

This guide will help you set up EmailJS for your contact form.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account or sign in if you already have one

## Step 2: Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the setup instructions for your chosen provider
5. **Copy your Service ID** (you'll need this later)

## Step 3: Create an Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your website contact form:

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your AlgoFlow website contact form.
```

4. **Copy your Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to "Account" in your dashboard
2. Click on "API Keys"
3. **Copy your Public Key** (you'll need this later)

## Step 5: Update Your Configuration

1. Open the file: `src/config/emailjs.ts`
2. Replace the placeholder values with your actual credentials:

```typescript
export const EMAILJS_CONFIG = {
  serviceId: 'your_actual_service_id_here',
  templateId: 'your_actual_template_id_here', 
  publicKey: 'your_actual_public_key_here',
  toName: 'AlgoFlow Team' // Change this to your name/team name
};
```

## Step 6: Test Your Setup

1. Start your development server: `npm run dev`
2. Go to your contact page
3. Fill out and submit the contact form
4. Check your email to see if the message was received
5. Check the browser console for any error messages

## Troubleshooting

### Common Issues:

1. **"Invalid service ID"** - Double-check your Service ID
2. **"Invalid template ID"** - Double-check your Template ID  
3. **"Invalid public key"** - Double-check your Public Key
4. **"Email not received"** - Check your spam folder and email service setup

### Template Variables:

Make sure your EmailJS template uses these exact variable names:
- `{{from_name}}` - sender's name
- `{{from_email}}` - sender's email  
- `{{subject}}` - email subject
- `{{message}}` - email message
- `{{to_name}}` - your name/team name

## Security Notes

- Never commit your actual EmailJS credentials to version control
- The public key is safe to use in frontend code
- Consider using environment variables for production deployments

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- 2 email services
- 2 email templates

For higher limits, consider upgrading to a paid plan.
