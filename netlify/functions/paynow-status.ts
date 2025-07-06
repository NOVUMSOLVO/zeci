import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const pollUrl = event.queryStringParameters?.poll_url;
    
    if (!pollUrl) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Poll URL is required' }),
      };
    }

    // Make request to poll URL
    const response = await fetch(decodeURIComponent(pollUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: responseData.status,
        reference: responseData.reference,
        amount: responseData.amount,
        paynowreference: responseData.paynowreference,
        pollurl: responseData.pollurl,
        hash: responseData.hash,
      }),
    };

  } catch (error) {
    console.error('Paynow status check error:', error);
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
