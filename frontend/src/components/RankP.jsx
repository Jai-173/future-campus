import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Button } from './ui/button';
import Footer from './shared/Footer';

const RankP = () => {
  const [percentile, setPercentile] = useState('');
  const [marks, setMarks] = useState('');
  const [rank, setRank] = useState('');
  const [activeTab, setActiveTab] = useState('percentile');
  const [history, setHistory] = useState([]); // State for storing history

  const addToHistory = (method, input, result) => {
    const newEntry = {
      method,
      input,
      result,
      timestamp: new Date().toLocaleString(),
    };
    setHistory((prevHistory) => [newEntry, ...prevHistory]);
  };

  const total = 314675; // Total number of students for the rank calculation

  // Function to calculate rank by percentile
  const calculateRankByPercentile = () => {
    const parsedPercentile = parseFloat(percentile);

    if (isNaN(parsedPercentile) || parsedPercentile < 0 || parsedPercentile > 100) {
      setRank('Please enter a valid percentile between 0 and 100.');
      return;
    }

    const ranges = [
      { startPercentile: 91, endPercentile: 100, rankRange: '1 - 19,000' },
      { startPercentile: 81, endPercentile: 90, rankRange: '19,001 - 30,000' },
      { startPercentile: 71, endPercentile: 80, rankRange: '30,001 - 40,000' },
      { startPercentile: 61, endPercentile: 70, rankRange: '40,001 - 47,000' },
      { startPercentile: 51, endPercentile: 60, rankRange: '47,001 - 57,000' },
      { startPercentile: 41, endPercentile: 50, rankRange: '57,001 - 68,000' },
      { startPercentile: 31, endPercentile: 40, rankRange: '68,001 - 80,000' },
      { startPercentile: 21, endPercentile: 30, rankRange: '80,001 - 91,000' },
      { startPercentile: 11, endPercentile: 20, rankRange: '91,001 - 1,02,000' },
      { startPercentile: 0, endPercentile: 10, rankRange: '1,02,001+' },
    ];

    for (const range of ranges) {
      if (
        parsedPercentile >= range.startPercentile &&
        parsedPercentile <= range.endPercentile
      ) {
        const result = `Expected Rank: ${range.rankRange}`;
        setRank(result);
        addToHistory('Percentile', parsedPercentile, result);
        return;
      }
    }

    setRank('No rank data available for this percentile.');
  };

  // Function to calculate rank by marks
  const rankMarksMapping = [
    { minMarks: 160, maxMarks: 200, rank: 'Top 500' },
    { minMarks: 150, maxMarks: 160, rank: '501-1800' },
    { minMarks: 140, maxMarks: 150, rank: '1801-2700' },
    { minMarks: 110, maxMarks: 140, rank: '2701-7900' },
    { minMarks: 100, maxMarks: 110, rank: '7901-11000' },
    { minMarks: 96, maxMarks: 100, rank: '11000-14500' },
    { minMarks: 81, maxMarks: 95, rank: '14501-19500' },
    { minMarks: 1, maxMarks: 81, rank: '19501+' },
  ];

  const calculateRankByMarks = () => {
    const parsedMarks = parseInt(marks, 10);

    if (isNaN(parsedMarks) || parsedMarks < 0 || parsedMarks > 300) {
      setRank('Please enter valid marks between 0 and 300.');
      return;
    }

    const rankData = rankMarksMapping.find(
      (entry) => parsedMarks >= entry.minMarks && parsedMarks <= entry.maxMarks
    );

    if (rankData) {
      const result = `Expected Rank: ${rankData.rank}`;
      setRank(result);
      addToHistory('Marks', parsedMarks, result);
    } else {
      setRank('Marks are out of valid range.');
    }
  };

  // Function to handle tab switching
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setRank(''); // Clear the rank on tab switch
  };

  return (
    <>
      <Navbar />
      <div className="p-16 bg-[#FFFACD] min-h-screen">
        <div className="flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-1/2 mt-8">
          <div className="tabs flex mb-6">
            <div
              className={`tab py-2 px-4 cursor-pointer rounded-t-lg text-center transition-all duration-200 
      ${activeTab === 'percentile' ? 'bg-[#D4AF37] text-white' : 'bg-gray-100 text-gray-700'} `}
              onClick={() => handleTabSwitch('percentile')}
            >
              Predict Rank by Percentile
            </div>
            <div
              className={`tab py-2 px-4 cursor-pointer rounded-t-lg text-center transition-all duration-200 
      ${activeTab === 'marks' ? 'bg-[#D4AF37] text-white' : 'bg-gray-100 text-gray-700'} `}
              onClick={() => handleTabSwitch('marks')}
            >
              Predict Rank by Marks
            </div>
          </div>

          {activeTab === 'percentile' && (
            <div id="percentileTab">
              <strong className="text-bold text-3xl">Predict Rank by Percentile</strong>
              <label htmlFor="percentile" className="block text-md font-medium text-gray-700 my-2">
                Enter Your Expected Percentile:
              </label>
              <input
                type="number"
                id="percentile"
                min="0"
                max="100"
                value={percentile}
                onChange={(e) => setPercentile(e.target.value)}
                className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                placeholder="Enter percentile"
                required
              />
              <Button onClick={calculateRankByPercentile} className="w-full">
                Predict Rank
              </Button>
              {rank && (
                <div className="mt-4 text-lg font-semibold text-center text-gray-700">{rank}</div>
              )}
            </div>
          )}

          {activeTab === 'marks' && (
            <div id="marksTab">
              <strong className="text-bold text-3xl">Predict Rank by Marks</strong>
              <label htmlFor="marks" className="block text-md font-medium text-gray-700 my-2">
                Enter Your Marks:
              </label>
              <input
                type="number"
                id="marks"
                min="0"
                max="300"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                placeholder="Enter marks"
                required
              />
              <Button onClick={calculateRankByMarks} className="w-full">
                Predict Rank
              </Button>
              {rank && (
                <div className="mt-4 text-lg font-semibold text-center text-gray-700">{rank}</div>
              )}
            </div>
          )}
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 w-1/2 mt-8">
          <strong className="text-bold text-3xl">Prediction History</strong>
          <ul className="mt-4">
            {history.length > 0 ? (
              history.map((entry, index) => (
                <li key={index} className="mb-2">
                  <div className="text-sm text-gray-600">{entry.timestamp}</div>
                  <div className="font-semibold">
                    {entry.method} - {entry.input}: {entry.result}
                  </div>
                </li>
              ))
            ) : (
              <div className="text-gray-600"></div>
            )}
          </ul>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RankP;
