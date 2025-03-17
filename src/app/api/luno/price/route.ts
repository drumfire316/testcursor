import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.luno.com/api/1/ticker?pair=XBTZAR');
    const data = await response.json();
    
    // Log the response to see what we're getting
    console.log('Luno API Response:', data);
    
    if (!data.last_trade) {
      throw new Error('No price data in response');
    }

    return NextResponse.json({
      data: [{
        last_trade: data.last_trade,
        bid: data.bid,
        ask: data.ask
      }]
    });
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error);
    return NextResponse.json({ error: 'Failed to fetch Bitcoin price' }, { status: 500 });
  }
} 