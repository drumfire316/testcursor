'use client';

interface BitcoinPriceProps {
  exchange: string;
  price: {
    last_trade: string;
    bid: string;
    ask: string;
  } | null;
}

export default function BitcoinPrice({ exchange, price }: BitcoinPriceProps) {
  if (!price) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">{exchange}</h3>
        <p className="text-gray-500">Loading price data...</p>
      </div>
    );
  }

  const lastTrade = parseFloat(price.last_trade);
  const bid = parseFloat(price.bid);
  const ask = parseFloat(price.ask);

  if (isNaN(lastTrade) || isNaN(bid) || isNaN(ask)) {
    console.error('Invalid price data:', price);
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">{exchange}</h3>
        <p className="text-red-500">Invalid price data</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{exchange}</h3>
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
    </div>
  );
} 