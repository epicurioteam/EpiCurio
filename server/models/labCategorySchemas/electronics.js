import mongoose from 'mongoose'; 

const electronics = new mongoose.Schema({ 'amperage': Number, 'impedance': Number});

export default electronics;