import BitcoinPrices from "./components/BitcoinPrices";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-6xl">
        <BitcoinPrices />
      </div>
    </main>
  );
}
