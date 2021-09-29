const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const CollegeSchema = new Schema({
    name: {
        type: String,
    },
    id: {
        type: String,
        
    },
    Year_of_foundation: {
        type: Boolean,
        deafult: true
    }
});


const College = mongoose.model('colleges',CollegeSchema);

module.exports = College;
