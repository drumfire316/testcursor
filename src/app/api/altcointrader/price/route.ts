import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.altcointrader.co.za/v3/live-stats');
    const data = await response.json();
    
    console.log('AltcoinTrader API Response:', data);
    
    if (!data.BTC) {
      throw new Error('No Bitcoin price data in response');
    }

    return NextResponse.json({
      data: [{
        last_trade: data.BTC.Price,
        bid: data.BTC.Buy,
        ask: data.BTC.Sell
      }]
    });
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error);
    return NextResponse.json({ error: 'Failed to fetch Bitcoin price' }, { status: 500 });
  }
} 