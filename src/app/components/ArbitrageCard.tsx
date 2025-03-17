'use client';

interface ExchangeData {
  last_trade: string;
  bid: string;
  ask: string;
}

interface ArbitrageCardProps {
  luno: ExchangeData | null;
  altcointrader: ExchangeData | null;
  valr: ExchangeData | null;
}

export default function ArbitrageCard({ luno, altcointrader, valr }: ArbitrageCardProps) {
  if (!luno || !altcointrader || !valr) {
    return null;
  }

  // Convert all prices to numbers
  const lunoBid = parseFloat(luno.bid);
  const lunoAsk = parseFloat(luno.ask);
  const altcointraderBid = parseFloat(altcointrader.bid);
  const altcointraderAsk = parseFloat(altcointrader.ask);
  const valrBid = parseFloat(valr.bid);
  const valrAsk = parseFloat(valr.ask);

  // Calculate all possible arbitrage opportunities
  const opportunities = [
    {
      buy: 'Luno',
      sell: 'AltcoinTrader',
      buyPrice: lunoAsk,
      sellPrice: altcointraderBid,
      profit: altcointraderBid - lunoAsk,
      profitPercentage: ((altcointraderBid - lunoAsk) / lunoAsk) * 100
    },
    {
      buy: 'Luno',
      sell: 'VALR',
      buyPrice: lunoAsk,
      sellPrice: valrBid,
      profit: valrBid - lunoAsk,
      profitPercentage: ((valrBid - lunoAsk) / lunoAsk) * 100
    },
    {
      buy: 'AltcoinTrader',
      sell: 'Luno',
      buyPrice: altcointraderAsk,
      sellPrice: lunoBid,
      profit: lunoBid - altcointraderAsk,
      profitPercentage: ((lunoBid - altcointraderAsk) / altcointraderAsk) * 100
    },
    {
      buy: 'AltcoinTrader',
      sell: 'VALR',
      buyPrice: altcointraderAsk,
      sellPrice: valrBid,
      profit: valrBid - altcointraderAsk,
      profitPercentage: ((valrBid - altcointraderAsk) / altcointraderAsk) * 100
    },
    {
      buy: 'VALR',
      sell: 'Luno',
      buyPrice: valrAsk,
      sellPrice: lunoBid,
      profit: lunoBid - valrAsk,
      profitPercentage: ((lunoBid - valrAsk) / valrAsk) * 100
    },
    {
      buy: 'VALR',
      sell: 'AltcoinTrader',
      buyPrice: valrAsk,
      sellPrice: altcointraderBid,
      profit: altcointraderBid - valrAsk,
      profitPercentage: ((altcointraderBid - valrAsk) / valrAsk) * 100
    }
  ];

  // Filter profitable opportunities and sort by profit percentage
  const profitableOpportunities = opportunities
    .filter(opp => opp.profit > 0)
    .sort((a, b) => b.profitPercentage - a.profitPercentage);

  if (profitableOpportunities.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md mt-4">
        <h2 className="text-xl font-semibold mb-4">Arbitrage Opportunities</h2>
        <p className="text-gray-600">No profitable arbitrage opportunities found at the moment.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Arbitrage Opportunities</h2>
      <div className="space-y-4">
        {profitableOpportunities.map((opp, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">
                  Buy on {opp.buy} → Sell on {opp.sell}
                </p>
                <p className="text-sm text-gray-600">
                  Buy at R{opp.buyPrice.toLocaleString()} → Sell at R{opp.sellPrice.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">
                  R{opp.profit.toLocaleString()} profit
                </p>
                <p className="text-sm text-green-500">
                  {opp.profitPercentage.toFixed(2)}% return
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 