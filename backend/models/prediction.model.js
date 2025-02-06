import mongoose from 'mongoose';

const CollegePredictionSchema = new mongoose.Schema({
    percentile: {
        type: Number,
        required: [true, "Percentile is required"],
        min: [0, "Percentile cannot be less than 0"],
        max: [100, "Percentile cannot be more than 100"]
    },
    rank: {
        type: Number,
        required: [true, "Rank is required"],
        min: [1, "Rank must be greater than 0"]
    },
    state: {
        type: String,
        required: false, // Not included in the form, so making it optional
        trim: true
    },
    pwd: {
        type: String,
        required: [true, "PWD (Person with Disability) status is required"],
        enum: ["YES", "NO"] // Matches dropdown values
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ["M", "F"] // Matches dropdown values
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ["GOPENS", "GSCS", "GSTS", "GOBCS", "EWS"] // Matches dropdown values
    },
    sortby: {
        type: String,
        required: [true, "Sorting preference is required"],
        enum: ["Rank"] // Only "Rank" option is available in the form
    },
    prediction: {
        type: [Object], // Array of predicted colleges (objects)
        required: [true, "Prediction result is required"]
    }
}, { timestamps: true });

export default mongoose.model('CollegePrediction', CollegePredictionSchema);
