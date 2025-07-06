import { Handler } from '@netlify/functions';

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';

async function getAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

export const handler: Handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { intent, purchase_units } = JSON.parse(event.body || '{}');
    
    if (!purchase_units || !Array.isArray(purchase_units)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid purchase_units' }),
      };
    }

    const accessToken = await getAccessToken();

    const orderData = {
      intent: intent || 'CAPTURE',
      purchase_units: purchase_units.map(unit => ({
        reference_id: unit.reference_id,
        amount: {
          currency_code: unit.amount.currency_code || 'USD',
          value: unit.amount.value,
          breakdown: unit.amount.breakdown && {
            item_total: {
              currency_code: unit.amount.currency_code || 'USD',
              value: unit.amount.value,
            },
          },
        },
        description: unit.description,
        items: unit.items && unit.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          unit_amount: {
            currency_code: unit.amount.currency_code || 'USD',
            value: item.unit_amount.value,
          },
        })),
      })),
      application_context: {
        return_url: `${process.env.URL}/payment-success`,
        cancel_url: `${process.env.URL}/payment-cancelled`,
        brand_name: 'Zimbabwe E-commerce Platform',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
      },
    };

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('PayPal API Error:', data);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: 'PayPal order creation failed',
          details: data,
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };

  } catch (error) {
    console.error('PayPal create order error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
