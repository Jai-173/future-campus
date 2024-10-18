import React from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const Colleges = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#FFFACD]">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Colleges</h1>
                <div className="w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
                    <iframe
                        src="/MH- CET.pdf"  // Make sure the PDF file is in the public folder with this name
                        className="w-full h-[600px] rounded-lg"
                        frameBorder="0"
                        title="Colleges PDF"
                    ></iframe>
                </div>
            </div>
            <Footer />
        </>
        
    );
}

export default Colleges;
