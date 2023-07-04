// Definisci lo schema e il modello per la collezione "Utenti"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User',
    },
});

module.exports = mongoose.model('User', userSchema);