import React, { useState, useEffect } from 'react';
import { TrendingUp, Zap, Shield, Globe } from 'lucide-react';
import './App.css'; 
import Coin from './Coin.jsx';
import Graph from './Graph.jsx';
import emailjs from '@emailjs/browser';

export default function FakeCoin() {
  const [crashed, setCrashed] = useState(false);
  const [email, setEmail] = useState('');
  const [showGiftCard, setShowGiftCard] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(2347821);

  // --- Logic Functions ---
  const generateData = (isCrashed) => {
    const data = [];
    const basePrice = isCrashed ? 25 : 2300000;
    const now = Date.now();
    for (let i = 0; i < 20; i++) {
      const variance = isCrashed ? Math.random() * 5 : Math.random() * 1000000 - 500000;
      const date = new Date(now - (20 - i) * 5000);
      data.push({
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        price: Math.max(0, basePrice + variance)
      });
    }
    return data;
  };

  const [chartData, setChartData] = useState(generateData(false));

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev];
        newData.shift();
        const lastPrice = newData[newData.length - 1].price;
        const basePrice = crashed ? 25 : 2300000;
        const variance = crashed ? (Math.random() * 10 - 5) : (Math.random() * 1000000 - 500000);
        const newPrice = Math.max(0, lastPrice + variance * 0.3 + (basePrice - lastPrice) * 0.1);
        
        newData.push({ time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), price: newPrice });
        setCurrentPrice(newPrice);
        return newData;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [crashed]);

  const handleCashOut = () => {
    setCrashed(true);
    setCurrentPrice(25);
    setChartData(prev => [...prev, { time: new Date().toLocaleTimeString(), price: 25 }]);
  };

  const handleSubmit = () => {
    if (!email) return alert("Please enter an email!");

    // 3. Send the email
    emailjs.send(
      'service_cngnv57',   // Replace with your Service ID
      'template_1uur58m',  // Replace with your Template ID
      {email},
      'JKl_90xAV2fAvc9K0'    // Replace with your Public Key
    )
    .then((result) => {
      console.log('Email sent successfully!', result.text);
      setShowGiftCard(true); // Show the success UI
    })
    .catch((error) => {
      console.error('Email failed...', error);
      alert("Something went wrong with the email service.");
    });
  };

  // --- Render ---
  return (
    <div className="page-container">
      <header className="header-glass">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-bold">GbobbiCoin</h1>
          </div>
          <div className="text-2xl font-mono text-green-400">
            ${currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
        </div>
      </header>

      <div className="content-wrapper">
        <Coin />

        <div className="text-center mb-12">
          <h2 className="hero-title">Join the Future of Crypto</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            GbobbiCoin leverages REVOLUTIONARY peer-to-peer blockchain AI QUANTUM technology to bring you the safest crypocurrency of you're favorite Milennial!
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <TrendingUp className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Ultra-Volatile</h3>
            <p className="text-gray-400">Proprietary volatility engine ensures MAXIMUM growth with abosolutely ZERO* risk.</p>
          </div>
          <div className="feature-card">
            <Shield className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Fully Insecure</h3>
            <p className="text-gray-400">Maximum freedom from WOKE regulation and other WOKE propoganda.</p>
          </div>
          <div className="feature-card">
            <Globe className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Globally Unrecognized</h3>
            <p className="text-gray-400">Ensures minimum trading capacity to ensure our user MAXIMUM profit</p>
          </div>
        </div>

        <Graph crashed={crashed} chartData={chartData} />

        {crashed && (
          <div className="crash-alert">
            <h3 className="text-2xl font-bold text-red-400 mb-2">Uh oh</h3>
            <p>Looks like you got rugpulled 🤷‍♂️.  </p>
          </div>
        )}

        {!crashed && <button onClick={handleCashOut} className="cash-out-btn">💰 Cash Out Now 💰</button>}

        {crashed && !showGiftCard && (
          <div className="form-container">
            <h3 className="text-2xl font-bold mb-4 text-center">Withdraw Remaining Funds</h3>
            <input 
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              className="input-field" 
            />
            <button onClick={handleSubmit} className="claim-btn">Claim Funds</button>
          </div>
        )}

        {showGiftCard && (
          <div className="gift-card-box">
            <h3 className="text-3xl font-bold text-yellow-400 mb-4">Order Number</h3>
            <h2 className="text-4xl font-bold text-green-400 mb-4">81293981</h2>
            <p className="text-sm text-gray-400">(Sent to {email})</p>
          </div>
        )}
      </div>
    </div>
  );
}