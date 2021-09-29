const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const CollegeSchema = new Schema({
    name: {
        type: String,
    },
    roll: {
        type: String,
        required: [true, 'Roll field is required']
    },
    present: {
        type: Boolean,
        deafult: true
    }
});


const College = mongoose.model('colleges',CollegeSchema);

module.exports = College;
