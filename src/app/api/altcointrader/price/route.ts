import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.altcointrader.co.za/v3/live-stats', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch price data');
    }

    const data = await response.json();
    console.log('AltcoinTrader API Response:', data);

    if (!data || !data.BTC) {
      throw new Error('No price data available');
    }

    // Add server timestamp to the response
    const timestamp = Date.now();

    return NextResponse.json({
      data: [{
        last_trade: data.BTC.Price,
        bid: data.BTC.Buy,
        ask: data.BTC.Sell,
        timestamp: timestamp
      }]
    });
  } catch (error) {
    console.error('Error fetching AltcoinTrader price:', error);
    return NextResponse.json(
      { error: 'Failed to fetch price data' },
      { status: 500 }
    );
  }
} 