import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // First get the BTC/USDT price from Bybit
    const bybitResponse = await fetch('https://api.bybit.com/v5/market/tickers?category=linear&symbol=BTCUSDT');
    const bybitData = await bybitResponse.json();
    
    // Then get the USDT/ZAR price from AltcoinTrader to convert to ZAR
    const usdtResponse = await fetch('https://api.altcointrader.co.za/v3/live-stats');
    const usdtData = await usdtResponse.json();
    
    if (!bybitData.result?.list?.[0]?.lastPrice || !usdtData.USDT?.Price) {
      throw new Error('No price data in response');
    }

    const btcUsdtPrice = parseFloat(bybitData.result.list[0].lastPrice);
    const usdtZarPrice = parseFloat(usdtData.USDT.Price);
    const btcZarPrice = btcUsdtPrice * usdtZarPrice;

    return NextResponse.json({
      data: [{
        last_trade: btcZarPrice.toString(),
        bid: (btcZarPrice * 0.999).toString(), // Slightly lower for bid
        ask: (btcZarPrice * 1.001).toString()  // Slightly higher for ask
      }]
    });
  } catch (error) {
    console.error('Error fetching Bybit price:', error);
    return NextResponse.json({ error: 'Failed to fetch Bybit price' }, { status: 500 });
  }
} 