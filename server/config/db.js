const mongoose = require('mongoose');

// MongoDB Atlas 연결
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://wogns:quti7499@cluster0.dtkzk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // 연결 실패 시 프로세스 종료
    }
};

module.exports = connectDB;
