import { Handler } from '@netlify/functions';
import crypto from 'crypto';

const PAYNOW_INTEGRATION_ID = process.env.PAYNOW_INTEGRATION_ID;
const PAYNOW_INTEGRATION_KEY = process.env.PAYNOW_INTEGRATION_KEY;
const PAYNOW_RETURN_URL = process.env.PAYNOW_RETURN_URL || 'https://www.paynow.co.zw/return/';
const PAYNOW_RESULT_URL = process.env.PAYNOW_RESULT_URL || 'https://www.paynow.co.zw/result/';

function generateHash(values: string[], integrationKey: string): string {
  const hashString = values.join('') + integrationKey;
  return crypto.createHash('sha512').update(hashString).digest('hex').toUpperCase();
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
    const { 
      reference, 
      amount, 
      email, 
      phone, 
      method,
      return_url,
      result_url 
    } = JSON.parse(event.body || '{}');

    if (!reference || !amount || !email || !method) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Prepare the data for Paynow
    const data: any = {
      id: PAYNOW_INTEGRATION_ID,
      reference: reference,
      amount: amount.toFixed(2),
      email: email,
      phone: phone || '',
      method: method,
      returnurl: return_url || PAYNOW_RETURN_URL,
      resulturl: result_url || PAYNOW_RESULT_URL,
    };

    // Generate hash for security
    const values = [
      data.id,
      data.reference,
      data.amount,
      data.email,
      data.phone,
      data.method,
      data.returnurl,
      data.resulturl,
    ];

    const hash = generateHash(values, PAYNOW_INTEGRATION_KEY || '');
    data.hash = hash;

    // Convert data to URL encoded format
    const formData = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    // Make request to Paynow
    const response = await fetch('https://www.paynow.co.zw/interface/initiatetransaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const responseText = await response.text();
    
    // Parse Paynow response
    const responseData: Record<string, string> = {};
    responseText.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        responseData[key.trim()] = value.trim();
      }
    });

    if (responseData.status?.toLowerCase() === 'ok') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: 'Ok',
          redirectUrl: responseData.browserurl,
          pollUrl: responseData.pollurl,
          hash: responseData.hash,
        }),
      };
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: 'Error',
          error: responseData.error || 'Payment initiation failed',
        }),
      };
    }

  } catch (error) {
    console.error('Paynow initiate payment error:', error);
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
