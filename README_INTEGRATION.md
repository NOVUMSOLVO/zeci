# Zimbabwe E-commerce Platform with PayPal & Paynow Integration

A modern React e-commerce platform with integrated PayPal and Paynow (Zimbabwe mobile money) payment gateways, featuring WhatsApp marketplace functionality for seamless customer communication. **Designed to serve Zimbabweans worldwide** - from local customers to the diaspora community.

## 🌍 Global Reach Features

### 🇿🇼 **Zimbabweans Worldwide**
- **Local Customers**: Full mobile money integration (EcoCash, OneMoney, TeleCash)
- **Diaspora Community**: PayPal integration for international payments
- **Global WhatsApp**: International phone number support for order notifications
- **Multi-Currency**: USD and local currency support
- **Universal Access**: No geographic restrictions - serve customers anywhere

## 🚀 Features

### Payment Gateways
- **PayPal Integration**: Secure international payments with PayPal's robust API
- **Paynow Integration**: Zimbabwe mobile money payments (EcoCash, OneMoney, TeleCash)
- **Real-time Payment Status**: Live payment tracking and confirmation
- **Multi-currency Support**: USD and local currency support

### WhatsApp Marketplace
- **Global Order Notifications**: International phone number support for diaspora customers
- **Payment Links**: Direct payment links shared via WhatsApp worldwide
- **Customer Communication**: Seamless integration with WhatsApp Business API
- **Diaspora-Friendly**: Optimized for Zimbabweans living anywhere in the world

### Platform Features
- **Dashboard Analytics**: Payment tracking and revenue analytics
- **Order Management**: Complete order lifecycle management
- **Customer Relationship Management (CRM)**: Customer data and interaction tracking
- **Store Management**: Product catalog and inventory management
- **Modern UI/UX**: Built with React and Tailwind CSS

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Netlify Functions (Serverless)
- **Payment Processing**: PayPal SDK, Paynow API
- **Communication**: WhatsApp Business API
- **Deployment**: Netlify
- **Build Tool**: Vite
- **Styling**: Tailwind CSS

## 📋 Prerequisites

Before setting up the project, ensure you have:

1. **Node.js** (v18 or higher)
2. **npm** or **yarn** package manager
3. **PayPal Developer Account** for PayPal integration
4. **Paynow Merchant Account** for Zimbabwe mobile money
5. **WhatsApp Business API** access (optional but recommended)
6. **Netlify Account** for deployment

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd zeci
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and configure the following environment variables:

```env
# PayPal Configuration
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here

# Paynow Configuration (Zimbabwe Mobile Money)
VITE_PAYNOW_INTEGRATION_ID=your_paynow_integration_id_here
VITE_PAYNOW_INTEGRATION_KEY=your_paynow_integration_key_here
PAYNOW_INTEGRATION_ID=your_paynow_integration_id_here
PAYNOW_INTEGRATION_KEY=your_paynow_integration_key_here
PAYNOW_RETURN_URL=https://your-app.netlify.app/payment-success
PAYNOW_RESULT_URL=https://your-app.netlify.app/api/paynow/result

# WhatsApp Business API Configuration (Optional)
VITE_WHATSAPP_BUSINESS_API_URL=https://graph.facebook.com/v18.0
VITE_WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token_here
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token_here
WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id_here

# Application URLs
URL=https://your-app.netlify.app
VITE_APP_URL=https://your-app.netlify.app
```

### 4. PayPal Setup

1. **Create PayPal Developer Account**
   - Visit [PayPal Developer](https://developer.paypal.com/)
   - Create a new application
   - Get your Client ID and Client Secret
   - Choose Sandbox for testing, Live for production

2. **Configure PayPal Settings**
   - Add your Client ID to `VITE_PAYPAL_CLIENT_ID`
   - Add your Client Secret to `PAYPAL_CLIENT_SECRET`
   - Configure webhook endpoints for payment confirmations

### 5. Paynow Setup

1. **Create Paynow Merchant Account**
   - Visit [Paynow Zimbabwe](https://www.paynow.co.zw/)
   - Register as a merchant
   - Get your Integration ID and Integration Key

2. **Configure Paynow Settings**
   - Add Integration ID to `PAYNOW_INTEGRATION_ID`
   - Add Integration Key to `PAYNOW_INTEGRATION_KEY`
   - Set up return URLs for payment confirmations

### 6. WhatsApp Business API Setup (Optional)

1. **WhatsApp Business Account**
   - Set up WhatsApp Business API through Meta
   - Get access token and phone number ID
   - Configure webhook for message delivery

2. **Configure WhatsApp Settings**
   - Add access token to `WHATSAPP_ACCESS_TOKEN`
   - Add phone number ID to `WHATSAPP_PHONE_NUMBER_ID`

## 🚀 Development

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment to Netlify

### 1. Connect Repository to Netlify

1. Log in to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### 2. Environment Variables

In Netlify dashboard, go to Site settings > Environment variables and add all the environment variables from your `.env` file.

### 3. Functions Configuration

The `netlify.toml` file is already configured to handle:
- PayPal payment processing
- Paynow payment initiation and status checking
- WhatsApp message sending
- API redirects for serverless functions

### 4. Domain Configuration

1. Configure your custom domain in Netlify
2. Update environment variables with your production URLs
3. Update PayPal and Paynow webhook URLs

## 💳 Payment Flow

### PayPal Integration

1. Customer selects PayPal payment method
2. PayPal payment button is rendered using React PayPal SDK
3. Customer completes payment on PayPal
4. Payment confirmation is processed via Netlify function
5. Order status is updated and confirmation is sent

### Paynow Integration (Zimbabwe Mobile Money)

1. Customer selects mobile money payment (EcoCash/OneMoney/TeleCash)
2. Payment request is sent to Paynow API
3. Customer receives USSD prompt on their mobile device
4. Customer completes payment on mobile
5. Payment status is polled and confirmed
6. Order status is updated

### WhatsApp Integration

1. Order details are formatted for WhatsApp
2. Payment link is generated and included
3. WhatsApp message is sent to customer
4. Customer can complete payment via shared link
5. Order confirmation is sent via WhatsApp

## 📱 WhatsApp Marketplace Features

### Order Notifications
- Automatic order confirmation messages
- Payment reminders and links
- Order status updates
- Delivery notifications

### Customer Support
- Direct communication channel
- Order inquiries and support
- Product information sharing
- Customer feedback collection

## 🔒 Security Features

- **Environment Variables**: Sensitive data stored securely
- **HTTPS Encryption**: All communications encrypted
- **Payment Security**: PCI DSS compliant payment processing
- **API Key Protection**: Server-side API key handling
- **CORS Configuration**: Proper cross-origin request handling

## 🧪 Testing

### Payment Testing

#### PayPal Sandbox
- Use PayPal sandbox credentials for testing
- Test with sandbox buyer accounts
- Verify payment flows and confirmations

#### Paynow Testing
- Use Paynow test environment
- Test with demo mobile money numbers
- Verify USSD flow and confirmations

### WhatsApp Testing
- Use WhatsApp Business API sandbox
- Test message delivery and formatting
- Verify link generation and sharing

## 📊 Analytics and Monitoring

### Payment Analytics
- Revenue tracking by payment method
- Success/failure rates
- Geographic distribution
- Customer behavior analysis

### Performance Monitoring
- Payment processing times
- API response times
- Error rates and debugging
- User experience metrics

## 🛟 Troubleshooting

### Common Issues

#### PayPal Integration
- **Invalid Client ID**: Verify environment variables
- **Sandbox vs Live**: Ensure correct environment configuration
- **CORS Errors**: Check domain configuration in PayPal dashboard

#### Paynow Integration
- **Integration Key Issues**: Verify key format and permissions
- **USSD Timeout**: Check network connectivity and carrier issues
- **Hash Validation**: Ensure correct hash calculation

#### WhatsApp Integration
- **API Rate Limits**: Implement proper rate limiting
- **Message Format**: Verify WhatsApp Business API requirements
- **Phone Number Format**: Use correct international format

### Support Resources
- [PayPal Developer Docs](https://developer.paypal.com/docs/)
- [Paynow API Documentation](https://developers.paynow.co.zw/)
- [WhatsApp Business API Docs](https://developers.facebook.com/docs/whatsapp/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- PayPal for robust payment processing
- Paynow for Zimbabwe mobile money integration
- WhatsApp Business API for communication features
- Netlify for seamless deployment and hosting
- React and Tailwind CSS communities

## 📞 Support

For support and questions:
- Create an issue in this repository
- Email: support@your-domain.com
- WhatsApp: +263-XXX-XXXXXX

---

**Happy Selling! 🛒💰**
