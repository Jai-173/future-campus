import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Navbar from './shared/Navbar';
import CollegePredictorWithFilters from './filtertable';

const CollegePredictor = () => {
  const [rank, setRank] = useState('');
  const [isPredictionsVisible, setPredictionsVisible] = useState(false);

  const handleGetPredictions = () => {
    setPredictionsVisible(true);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 p-5 mt-3 rounded-lg shadow-lg">
        <div className="flex justify-center mb-3">
          <span className="text-lg font-bold mt-2">MHTCET</span>
          <span className="ml-6 mt-2">Rank</span>
          <Input
            type="text"
            variant="outline"
            className="ml-4 w-40 border-spacing-1"
            placeholder="Enter your Rank.."
            value={rank}
            onChange={(e) => setRank(e.target.value)}
          />
          <Button
            type="button"
            onClick={handleGetPredictions}
            className="ml-4 bg-[#D4AF37] hover:bg-[#333333] text-[#333333] hover:text-[#D4AF37] font-bold uppercase rounded px-4 py-1 transition-all"
          >
            Get Predictions
          </Button>
        </div>
        <div className="text-center text-sm opacity-80 bg-[#333333] text-yellow-400 py-2 rounded-b-lg"></div>
      </div>
      {isPredictionsVisible && <CollegePredictorWithFilters rank={rank} />}
    </>
  );
};

export default CollegePredictor;
