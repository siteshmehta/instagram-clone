import mongoose from "mongoose"

export default function errorHandler(err, res) {
    
    if (err instanceof Error) {
      res.status(400).json({
        status: false,
        message: err.message
      });
    } else if (err.name === 'MongoError') {
       
        res.status(400).json({
            status: false,
            message: mongoose.err.message
        });

    } else {
      res.status(500).json({
        status: false,
        message: 'An unexpected error occurred'
      });
    }
  }