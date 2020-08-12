import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const dna = new Schema({
    dnaPlainSequence: {
        type: String,
        default: '',
        required: 'dnaPlainSequence cannot be blank'
    },
    hasMutation: {
        type: Boolean,
        default: false,
        required: 'hasMutation cannot be blank'
    },
});

mongoose.model('Dna', dna);
