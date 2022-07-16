import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://Thiago:Admin@final-project.vkrmn.mongodb.net/Final-Project");


let db = mongoose.connection;

export default db;
