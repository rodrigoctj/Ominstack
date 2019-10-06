const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,    
    user: {
        type: mongoose.Schema.Types.ObjectId, //esse tipo eh o do id padrao do mongo,
        ref: 'User'
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    }
});

module.exports = mongoose.model('Booking', BookingSchema);