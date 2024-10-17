import React from "react";
import SCard from "./SCard";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Cards = () => {
    const user=true;
  return (
    <div>
      <div class="bg-[#FFFACD] py-14">
        <h1 class="mt-8 text-center text-5xl text-[#D4AF37] font-bold">
          Our Features & Services.
        </h1>
        <div class="md:flex md:justify-center md:space-x-8 md:px-14">
          <div class="mt-16 py-4 px-4 bg-whit w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
            <div class="w-sm">
              <img
                class="w-64"
                src="/assets/illustrations/4.jpg"
                alt=""
              />
              <div class="mt-4 text-center">
                <h1 class="text-xl font-bold text-[#CD7F32]">College Prediction</h1>
                <p class="mt-4 text-[#333333]">
                Predict the best-fit colleges based on rank and percentile analysis.
                </p>
                {
                  <Link to={!user ? "/register" : "/collegep"}>
                    <button className="mt-8 mb-4 py-2 px-6 rounded-lg border border-[#CD7F32] bg-[#CD7F32] text-[#333333] font-bold hover:bg-[#f7f7f7] hover:text-[#CD7F32] transition duration-200 inline-flex items-center gap-2">
                      More<FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </Link>
                }
              </div>
            </div>
          </div>

          <div class="mt-16 py-4 px-4 bg-whit w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
            <div class="w-sm">
              <img
                class="w-64 h-64"
                src="/assets/illustrations/2.png"
                alt=""
              />
              <div class="mt-4 text-[#8148e2] text-center">
                <h1 class="text-xl font-bold text-[#CD7F32]">Rank Prediction</h1>
                <p class="mt-4 text-[#333333]">
                Predict rank based on student performance and available data.
                </p>
                <Link to={user ? "/rankp" : "/register"}><button class="mt-8 mb-4 py-2 px-6 rounded-lg border border-[#CD7F32] bg-[#CD7F32] text-[#333333] font-bold hover:bg-[#f7f7f7] hover:text-[#CD7F32] transition duration-200 inline-flex items-center gap-2">
                  More<FontAwesomeIcon icon={faArrowRight} />
                </button></Link>
              </div>
            </div>
          </div>
          <div class="mt-16 py-4 px-4 bg-whit w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
            <div class="w-sm">
              <img
                class="w-64"
                src="/assets/illustrations/3.png"
                alt=""
              />
              <div class="mt-4 text-[#8148e2] text-center">
                <h1 class="text-xl font-bold text-[#CD7F32]">Marks to Percentile Prediction</h1>
                <p class="mt-4 text-[#333333]">
                Convert marks to percentile for better evaluation.
                </p>
                <Link to={user ? "/percentilep" : "/register"}><button class="mt-8 mb-4 py-2 px-6 rounded-lg border border-[#CD7F32] bg-[#CD7F32] text-[#333333] font-bold hover:bg-[#f7f7f7] hover:text-[#CD7F32] transition duration-200 inline-flex items-center gap-2">
                  More<FontAwesomeIcon icon={faArrowRight}/>
                </button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
