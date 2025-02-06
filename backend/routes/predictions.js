import axios from 'axios';
import CollegePrediction from '../models/prediction.model.js'; // Import the Mongoose model

export const predictCollege = async (req, res) => {
    const { rank, percentile, state, gender, category, pwd, sortby } = req.body;

    try {
        // Fetch predictions from Flask backend
        const response = await axios.post('http://127.0.0.1:5000/predict-college', {
            percentile,
            rank,
            state,
            pwd,
            gender,
            category,
            sortby
        });

        const prediction = response.data; // The predicted colleges list

        // Store the data in MongoDB
        const newPrediction = new CollegePrediction({
            percentile,
            rank,
            state,
            pwd,
            gender,
            category,
            sortby,
            prediction
        });

        await newPrediction.save(); // Save to MongoDB

        res.status(200).json({ message: 'Prediction fetched and stored successfully', prediction });
    } catch (error) {
        console.error("Error fetching or storing data:", error);
        res.status(500).json({ error: "Error fetching or storing data. Please try again." });
    }
};
export default predictCollege;