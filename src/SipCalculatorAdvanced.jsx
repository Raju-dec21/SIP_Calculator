import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const SipCalculatorAdvanced = () => {
  const [tab, setTab] = useState('sip'); // SIP or Lumpsum
  const [amount, setAmount] = useState(25000);
  const [rate, setRate] = useState(12);
  const [duration, setDuration] = useState(10);
  const [futureValue, setFutureValue] = useState(0);
  const [invested, setInvested] = useState(0);

  useEffect(() => {
    calculate();
  }, [amount, rate, duration, tab]);

  const calculate = () => {
    const r = rate / 100 / 12; // monthly rate
    const months = duration * 12;

    if (tab === 'sip') {
      const FV = amount * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
      setFutureValue(FV);
      setInvested(amount * months);
    } else {
      const annualRate = rate / 100;
      const FV = amount * Math.pow(1 + annualRate, duration);
      setFutureValue(FV);
      setInvested(amount);
    }
  };

  const data = [
    { name: 'Invested', value: invested },
    { name: 'Est. Returns', value: futureValue - invested },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-center p-6 gap-6 border">
      {/* Inputs Section */}
      <div className="w-2/3 md:w-1/2 bg-white p-6 shadow rounded-xl">
        <div className="flex gap-4 mb-4 m-4">
          <button
            onClick={() => setTab('sip')}
            className={`px-4 py-2 rounded-lg ${
              tab === 'sip' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            SIP
          </button>
          <button
            onClick={() => setTab('lumpsum')}
            className={`px-4 py-2 rounded-lg ${
              tab === 'lumpsum' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Lumpsum
          </button>
        </div>

        <label>Amount ({tab === 'sip' ? 'Monthly' : 'Initial'})</label>
        <input
          type="range"
          min="1000"
          max="100000"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full"
        />
        <div>₹{amount.toLocaleString()}</div>

        <label>Expected Return (%)</label>
        <input
          type="range"
          min="1"
          max="20"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-full"
        />
        <div>{rate}%</div>

        <label>Duration (Years)</label>
        <input
          type="range"
          min="1"
          max="30"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full"
        />
        <div>{duration} Years</div>

        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p>
            💰 <strong>Invested:</strong> ₹{invested.toLocaleString()}
          </p>
          <p>
            📈 <strong>Est. Returns:</strong> ₹
            {(futureValue - invested).toLocaleString()}
          </p>
          <p>
            🏁 <strong>Total Value:</strong> ₹{futureValue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div className="w-2/3 md:w-1/2 flex justify-center items-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              <Cell fill={'#4CAF50'} />
              <Cell fill={'#FFC107'} />
            </Pie>
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SipCalculatorAdvanced;
