const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    boatName: { type: String, required: true },
    clientName: { type: String, required: true },
    catwayNumber: { type: String, required: true }, // Ajout du catwayNumber
    catwayType: { type: String, required: true },   // Ajout du catwayType
    startDate: { type: Date, required: true },      // Ajout de startDate
    endDate: { type: Date, required: true }         // Ajout de endDate
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;