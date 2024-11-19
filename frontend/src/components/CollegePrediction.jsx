import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const CollegePrediction = () => {
    const [percentile, setPercentile] = useState('');
    const [rank, setRank] = useState('');
    const [state, setState] = useState('');
    const [pwd, setPwd] = useState('NO');
    const [gender, setGender] = useState('M');
    const [category, setCategory] = useState('GOPENS');
    const [sortby, setSortby] = useState('Rank');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            percentile,
            rank,
            state,
            pwd,
            gender,
            category,
            sortby,
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/predict-college', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch data');
            }

            setResults(result);
            setError(null);
        } catch (error) {
            setError(error.message);
            setResults([]);
        }
    };

    // Function to generate the PDF
    const generatePDF = () => {
        const doc = new jsPDF();

        // Title and Info
        doc.setFontSize(16);
        doc.text("College Prediction Results", 14, 20);
        doc.setFontSize(12);
        doc.text(`Percentile: ${percentile}`, 14, 30);
        doc.text(`Rank: ${rank}`, 14, 40);
        doc.text(`Gender: ${gender === 'M' ? 'Male' : 'Female'}`, 14, 50);
        doc.text(`Category: ${category}`, 14, 60);
        doc.text(`PWD: ${pwd}`, 14, 70);
        doc.text(`State: ${state}`, 14, 80);

        // Auto-table for College List
        const tableColumns = ["College", "Branch", "Category", "Rank", "Percentile", "Status"];
        const tableRows = [];

        results.forEach(result => {
            const rowData = [
                result.College,
                result.Branch,
                result.Category,
                result.Rank,
                result.Percentile,
                result.Status
            ];
            tableRows.push(rowData);
        });

        doc.autoTable({
            startY: 90, // Start after the info
            head: [tableColumns],
            body: tableRows,
        });

        // Save the PDF
        doc.save('college_prediction_results.pdf');
    };

    return (
        <>
            <Navbar />
            <div className="container flex flex-col items-center my-10 pt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl shadow-lg overflow-hidden w-[90%]">
                    <div className="left-container flex flex-col items-center justify-center bg-gradient-to-br from-[#FFFACD] to-[#fff27c] p-8 rounded-l-3xl text-center text-white shadow-lg flex-1">
                        <span className="font-bold text-2xl text-[#cd7f32]">Future</span>
                        <span className="font-bold text-2xl text-[#cd7f32]">Campus</span>
                        <img src="/assets/illustrations/graduate.svg" alt="Logo" className="w-64 mt-6 rounded-lg" />
                    </div>
                    <div className="right-container flex flex-col w-full bg-white p-8 rounded-r-3xl shadow-lg min-w-[350px]">
                        <form className="prediction-form" onSubmit={handleSubmit}>
                            <h1 className="form-title text-xl font-bold text-center text-[#333] mb-6">MHTCET College Predictor</h1>

                            <div className="form-group mb-6">
                                <label htmlFor="percentile" className="block">Percentile:</label>
                                <input
                                    type="text"
                                    id="percentile"
                                    value={percentile}
                                    onChange={(e) => setPercentile(e.target.value)}
                                    placeholder="Enter your percentile"
                                    className="form-control mt-2 p-3 w-full border border-[#ddd] rounded-xl focus:border-[#6c74ff] outline-none transition-all duration-300"
                                />
                            </div>

                            <div className="form-group mb-6">
                                <label htmlFor="rank" className="block">Rank:</label>
                                <input
                                    type="text"
                                    id="rank"
                                    value={rank}
                                    onChange={(e) => setRank(e.target.value)}
                                    placeholder="Enter your rank"
                                    className="form-control mt-2 p-3 w-full border border-[#ddd] rounded-xl focus:border-[#6c74ff] outline-none transition-all duration-300"
                                />
                            </div>

                            <div className="form-group mb-6">
                                <label htmlFor="gender" className="block">Gender:</label>
                                <select
                                    id="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="form-control mt-2 p-3 w-full border border-[#ddd] rounded-xl focus:border-[#6c74ff] outline-none transition-all duration-300"
                                >
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                            </div>

                            <div className="form-group mb-6">
                                <label htmlFor="category" className="block">Category:</label>
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="form-control mt-2 p-3 w-full border border-[#ddd] rounded-xl focus:border-[#6c74ff] outline-none transition-all duration-300"
                                >
                                    <option value="GOPENS">General</option>
                                    <option value="GSCS">SC</option>
                                    <option value="GSTS">ST</option>
                                    <option value="GOBCS">OBC</option>
                                    <option value="EWS">EWS</option>
                                </select>
                            </div>

                            <div className="form-group mb-6">
                                <label htmlFor="pwd" className="block">PWD:</label>
                                <select
                                    id="pwd"
                                    value={pwd}
                                    onChange={(e) => setPwd(e.target.value)}
                                    className="form-control mt-2 p-3 w-full border border-[#ddd] rounded-xl focus:border-[#6c74ff] outline-none transition-all duration-300"
                                >
                                    <option value="NO">No</option>
                                    <option value="YES">Yes</option>
                                </select>
                            </div>

                            <div className="form-group mb-6">
                                <label htmlFor="sortby" className="block">Sort By:</label>
                                <select
                                    id="sortby"
                                    value={sortby}
                                    onChange={(e) => setSortby(e.target.value)}
                                    className="form-control mt-2 p-3 w-full border border-[#ddd] rounded-xl focus:border-[#6c74ff] outline-none transition-all duration-300"
                                >
                                    <option value="Rank">Rank</option>
                                </select>
                            </div>
                            <button type="submit" className="submit-btn w-full py-3 bg-[#FFFACD] text-[#cd7f32] text-xl font-medium rounded-xl cursor-pointer hover:bg-[#f7e7ce] transition-all duration-300">
                                Predict
                            </button>
                        </form>
                        {error && <p className="error-message text-red-500 text-lg text-center mt-4">{error}</p>}
                    </div>
                </div>

                {results.length > 0 && (
                    <div className="results-container mt-10 w-full text-center bg-[#f9f9f9] p-6 rounded-3xl shadow-lg">
                        <h2 className='form-title text-xl font-bold mb-6'>College Prediction Results</h2>

                        {/* Button to download the PDF moved to the top-right */}
                        <div className="top-right-btn text-right mt-[-2rem] mb-4">
                            <button className="download-btn bg-[#ff6347] text-white py-2 px-4 rounded-xl cursor-pointer hover:bg-[#e53e36] transition-all duration-300" onClick={generatePDF}>
                                Download PDF
                            </button>
                        </div>

                        <table className="results-table w-full mt-4 border-collapse rounded-xl overflow-hidden">
                            <thead>
                                <tr>
                                    <th className="p-4 text-center bg-[#f7f7f7] font-bold border border-[#ddd]">College</th>
                                    <th className="p-4 text-center bg-[#f7f7f7] font-bold border border-[#ddd]">Branch</th>
                                    <th className="p-4 text-center bg-[#f7f7f7] font-bold border border-[#ddd]">Category</th>
                                    <th className="p-4 text-center bg-[#f7f7f7] font-bold border border-[#ddd]">Rank</th>
                                    <th className="p-4 text-center bg-[#f7f7f7] font-bold border border-[#ddd]">Percentile</th>
                                    <th className="p-4 text-center bg-[#f7f7f7] font-bold border border-[#ddd]">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((college, index) => (
                                    <tr key={index}>
                                        <td className="p-4 text-center border border-[#ddd]">{college.College}</td>
                                        <td className="p-4 text-center border border-[#ddd]">{college.Branch}</td>
                                        <td className="p-4 text-center border border-[#ddd]">{college.Category}</td>
                                        <td className="p-4 text-center border border-[#ddd]">{college.Rank}</td>
                                        <td className="p-4 text-center border border-[#ddd]">{college.Percentile}</td>
                                        <td className="p-4 text-center border border-[#ddd]">{college.Status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default CollegePrediction;
