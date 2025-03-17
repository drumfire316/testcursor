'use client';

interface ExchangeData {
  last_trade: string;
  bid: string;
  ask: string;
}

interface BybitComparisonProps {
  luno: ExchangeData | null;
  altcointrader: ExchangeData | null;
  valr: ExchangeData | null;
  bybit: ExchangeData | null;
}

export default function BybitComparison({ luno, altcointrader, valr, bybit }: BybitComparisonProps) {
  if (!luno || !altcointrader || !valr || !bybit) {
    return null;
  }

  const bybitPrice = parseFloat(bybit.last_trade);
  const exchanges = [
    { name: 'Luno', price: parseFloat(luno.last_trade) },
    { name: 'AltcoinTrader', price: parseFloat(altcointrader.last_trade) },
    { name: 'VALR', price: parseFloat(valr.last_trade) }
  ];

  const comparisons = exchanges.map(exchange => ({
    exchange: exchange.name,
    price: exchange.price,
    difference: exchange.price - bybitPrice,
    differencePercentage: ((exchange.price - bybitPrice) / bybitPrice) * 100
  }));

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Bybit Price Comparison</h2>
      <div className="mb-4">
        <p className="text-sm text-gray-500">Bybit BTC Price (ZAR)</p>
        <p className="text-2xl font-bold text-blue-600">
          R{bybitPrice.toLocaleString()}
        </p>
      </div>
      <div className="space-y-4">
        {comparisons.map((comp, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{comp.exchange}</p>
                <p className="text-sm text-gray-600">
                  R{comp.price.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${comp.difference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {comp.difference > 0 ? '+' : ''}R{comp.difference.toLocaleString()}
                </p>
                <p className={`text-sm ${comp.differencePercentage > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {comp.differencePercentage > 0 ? '+' : ''}{comp.differencePercentage.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 