import React from 'react'
import { ReactTyped } from 'react-typed'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <div>
      <div className="bg-white flex items-center mx-auto max-w-8xl my-12 gap-4" >
        <div className="w-1/2 mx-28">
          <div className="text-5xl font-bold mb-4 text-[#D4AF37]">
            Welcome to<br/>
            <span className="text-[#D4AF37] text-6xl">
              <ReactTyped
                strings={["Future Campus","College Predictor","Rank Prediction"]}
                typeSpeed={100}
                backSpeed={40}
                loop
                cursorChar="|"
                showCursor={true}
              />
            </span>
          </div>
          <p className="text-lg mb-6 text-[#333333]">
            Your Path to Success Starts Here: Predict, Rank,
            <br />
            and Choose Your Dream College!
          </p>
          <Button variant="primary">
            Get Started
          </Button>
        </div>
        <div className="w-3xl mt-6">
          <img
            src="./assets/hero-img.png"
            alt="illustration"
            className="w-200px h-200px rounded-full border-4 border-gray-300"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
