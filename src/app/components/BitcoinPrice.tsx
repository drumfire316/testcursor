'use client';

interface BitcoinPriceProps {
  exchange: string;
  price: {
    last_trade: string;
    bid: string;
    ask: string;
    timestamp?: number;
  } | null;
}

export default function BitcoinPrice({ exchange, price }: BitcoinPriceProps) {
  console.log(`Rendering ${exchange} price component with data:`, price);
  
  // Define trading URLs for each exchange
  const tradingUrls = {
    Luno: 'https://www.luno.com/trade/BTCZAR',
    AltcoinTrader: 'https://www.altcointrader.co.za/trade/BTCZAR',
    VALR: 'https://www.valr.com/exchange/BTC/ZAR'
  };

  if (!price) {
    return (
      <a 
        href={tradingUrls[exchange as keyof typeof tradingUrls]} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block bg-white rounded-lg shadow-md p-6 border-2 border-transparent transition-all duration-200 hover:shadow-lg hover:border-blue-500 cursor-pointer"
      >
        <h2 className="text-xl font-semibold mb-4">{exchange}</h2>
        <p className="text-gray-500">No price data available</p>
      </a>
    );
  }

  const lastTrade = parseFloat(price.last_trade);
  const bid = parseFloat(price.bid);
  const ask = parseFloat(price.ask);

  if (isNaN(lastTrade) || isNaN(bid) || isNaN(ask)) {
    console.error('Invalid price data:', price);
    return (
      <a 
        href={tradingUrls[exchange as keyof typeof tradingUrls]} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block p-4 bg-white rounded-lg shadow-md border-2 border-transparent transition-all duration-200 hover:shadow-lg hover:border-blue-500 cursor-pointer"
      >
        <h3 className="text-lg font-semibold mb-2">{exchange}</h3>
        <p className="text-red-500">Invalid price data</p>
      </a>
    );
  }

  const lastUpdate = price.timestamp ? new Date(price.timestamp).toLocaleTimeString() : 'Just now';

  return (
    <a 
      href={tradingUrls[exchange as keyof typeof tradingUrls]} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block p-4 bg-white rounded-lg shadow-md border-2 border-transparent transition-all duration-200 hover:shadow-lg hover:border-blue-500 cursor-pointer"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{exchange}</h3>
        <span className="text-xs text-gray-500">Updated: {lastUpdate}</span>
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-sm text-gray-500">Last Trade</p>
          <p className="text-2xl font-bold text-blue-600">
            R{lastTrade.toLocaleString()}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Bid</p>
            <p className="text-lg font-semibold text-green-600">
              R{bid.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Ask</p>
            <p className="text-lg font-semibold text-red-600">
              R{ask.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
} 