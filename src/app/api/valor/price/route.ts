import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.valr.com/v1/public/BTCZAR/marketsummary');
    const data = await response.json();
    
    console.log('VALR API Response:', data);
    
    if (!data.lastTradedPrice) {
      throw new Error('No price data in response');
    }

    return NextResponse.json({
      data: [{
        last_trade: data.lastTradedPrice,
        bid: data.bidPrice,
        ask: data.askPrice
      }]
    });
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error);
    return NextResponse.json({ error: 'Failed to fetch Bitcoin price' }, { status: 500 });
  }
} 