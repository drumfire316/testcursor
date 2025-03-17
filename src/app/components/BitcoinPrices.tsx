'use client';

import { useEffect, useState } from 'react';
import BitcoinPrice from './BitcoinPrice';
import ArbitrageCard from './ArbitrageCard';

interface PriceData {
  last_trade: string;
  bid: string;
  ask: string;
  timestamp: number;
}

export default function BitcoinPrices() {
  const [lunoPrice, setLunoPrice] = useState<PriceData | null>(null);
  const [altcointraderPrice, setAltcointraderPrice] = useState<PriceData | null>(null);
  const [valrPrice, setValrPrice] = useState<PriceData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async () => {
    try {
      console.log('Fetching prices...');
      const [lunoData, altcoinTraderData, valorData] = await Promise.all([
        fetch('/api/luno/price').then(res => res.json()),
        fetch('/api/altcointrader/price').then(res => res.json()),
        fetch('/api/valor/price').then(res => res.json())
      ]);

      console.log('Received data:', { lunoData, altcoinTraderData, valorData });

      // Extract price data from API responses
      if (lunoData && lunoData.data && lunoData.data[0]) {
        setLunoPrice({
          last_trade: lunoData.data[0].last_trade,
          bid: lunoData.data[0].bid,
          ask: lunoData.data[0].ask,
          timestamp: lunoData.data[0].timestamp
        });
      }

      // AltcoinTrader data is in a data array
      if (altcoinTraderData && altcoinTraderData.data && altcoinTraderData.data[0]) {
        setAltcointraderPrice({
          last_trade: altcoinTraderData.data[0].last_trade,
          bid: altcoinTraderData.data[0].bid,
          ask: altcoinTraderData.data[0].ask,
          timestamp: altcoinTraderData.data[0].timestamp
        });
      }

      // VALR data is already in the correct format
      if (valorData && valorData.data && valorData.data[0]) {
        setValrPrice({
          last_trade: valorData.data[0].last_trade,
          bid: valorData.data[0].bid,
          ask: valorData.data[0].ask,
          timestamp: valorData.data[0].timestamp
        });
      }

      setError(null);
      console.log('Updated prices state');
    } catch (error) {
      setError('Failed to fetch prices. Please try again later.');
      console.error('Error fetching prices:', error);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  console.log('Current prices state:', { lunoPrice, altcointraderPrice, valrPrice });

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