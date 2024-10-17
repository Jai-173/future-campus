import React from 'react'
import { ReactTyped } from 'react-typed'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div>
      <div className="bg-white flex items-center justify-center mx-auto max-w-8xl gap-4 text-center h-[100vh] bg-[url('./assets/slider.jpg')]" >
        <div className="w-1/2 mx-28">
          <div className="text-5xl font-bold mb-4 text-[#D4AF37]">
            Welcome to<br/>
            <span className="text-[#D4AF37] text-7xl">
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
          <p className="text-lg mb-6 text-[#f7f7f7]">
            Your Path to Success Starts Here: Predict, Rank,
            <br />
            and Choose Your Dream College!
          </p>
          <Link to="/register">
            <Button className="text-md font-bold font-sans" variant="primary">
              Get Started
            </Button>
          </Link>   
        </div>
      </div>
    </div>
  )
}

export default Hero
