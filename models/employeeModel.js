const mongoose = require('mongoose');
const crypto = require('crypto');

const encryptionKey = Buffer.from('0123456789abcdef0123456789abcdef', 'utf-8');

const iv = crypto.randomBytes(16);

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    department: { type: String, required: true },
    salary: { type: Number, required: true },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        set: (phone) => {
            const cipher = crypto.createCipheriv('aes-256-ctr', encryptionKey, iv);
            let encrypted = cipher.update(phone, 'utf8', 'hex');
            encrypted += cipher.final('hex');

            return iv.toString('hex') + encrypted;
        }
    },
});

module.exports = mongoose.model('Employee', employeeSchema);
