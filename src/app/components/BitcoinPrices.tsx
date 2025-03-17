'use client';

import { useEffect, useState } from 'react';
import BitcoinPrice from './BitcoinPrice';
import ArbitrageCard from './ArbitrageCard';

interface PriceData {
  last_trade: string;
  bid: string;
  ask: string;
}

export default function BitcoinPrices() {
  const [lunoPrice, setLunoPrice] = useState<PriceData | null>(null);
  const [altcointraderPrice, setAltcointraderPrice] = useState<PriceData | null>(null);
  const [valrPrice, setValrPrice] = useState<PriceData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async () => {
    try {
      const [lunoRes, altcointraderRes, valrRes] = await Promise.all([
        fetch('/api/luno/price'),
        fetch('/api/altcointrader/price'),
        fetch('/api/valor/price')
      ]);

      if (!lunoRes.ok || !altcointraderRes.ok || !valrRes.ok) {
        throw new Error('Failed to fetch prices');
      }

      const [lunoData, altcointraderData, valrData] = await Promise.all([
        lunoRes.json(),
        altcointraderRes.json(),
        valrRes.json()
      ]);

      console.log('Luno Data:', lunoData);
      console.log('AltcoinTrader Data:', altcointraderData);
      console.log('VALR Data:', valrData);

      // Extract price data from API responses
      if (lunoData && lunoData.data && lunoData.data[0]) {
        setLunoPrice({
          last_trade: lunoData.data[0].last_trade,
          bid: lunoData.data[0].bid,
          ask: lunoData.data[0].ask
        });
      }

      // AltcoinTrader data is in a data array
      if (altcointraderData && altcointraderData.data && altcointraderData.data[0]) {
        setAltcointraderPrice(altcointraderData.data[0]);
      }

      // VALR data is already in the correct format
      if (valrData && valrData.data && valrData.data[0]) {
        setValrPrice(valrData.data[0]);
      }

      setError(null);
    } catch (err) {
      setError('Failed to fetch prices. Please try again later.');
      console.error('Error fetching prices:', err);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BitcoinPrice exchange="Luno" price={lunoPrice} />
        <BitcoinPrice exchange="AltcoinTrader" price={altcointraderPrice} />
        <BitcoinPrice exchange="VALR" price={valrPrice} />
      </div>
      <ArbitrageCard
        luno={lunoPrice}
        altcointrader={altcointraderPrice}
        valr={valrPrice}
      />
    </div>
  );
} 