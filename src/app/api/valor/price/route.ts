import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.valr.com/v1/public/BTCZAR/marketsummary', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch price data');
    }

    const data = await response.json();
    console.log('VALR API Response:', data);

    if (!data) {
      throw new Error('No price data available');
    }

    // Add server timestamp to the response
    const timestamp = Date.now();

    return NextResponse.json({
      data: [{
        last_trade: data.lastTradedPrice,
        bid: data.bidPrice,
        ask: data.askPrice,
        timestamp: timestamp
      }]
    });
  } catch (error) {
    console.error('Error fetching VALR price:', error);
    return NextResponse.json(
      { error: 'Failed to fetch price data' },
      { status: 500 }
    );
  }
} 