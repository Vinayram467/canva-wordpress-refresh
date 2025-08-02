const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

class EnvEncryption {
    constructor() {
        this.algorithm = 'aes-256-gcm';
        this.keyLength = 32; // 256 bits
        this.ivLength = 16; // 128 bits
        this.saltLength = 64; // 512 bits
        this.tagLength = 16; // 128 bits
    }

    // Generate a secure key from a password
    generateKey(password, salt) {
        return crypto.pbkdf2Sync(password, salt, 100000, this.keyLength, 'sha512');
    }

    // Encrypt the .env file
    encryptEnv(envPath, password) {
        try {
            // Read the .env file
            const envContent = fs.readFileSync(envPath, 'utf8');

            // Generate salt and IV
            const salt = crypto.randomBytes(this.saltLength);
            const iv = crypto.randomBytes(this.ivLength);

            // Generate key from password and salt
            const key = this.generateKey(password, salt);

            // Create cipher
            const cipher = crypto.createCipheriv(this.algorithm, key, iv);

            // Encrypt the content
            let encrypted = cipher.update(envContent, 'utf8', 'hex');
            encrypted += cipher.final('hex');

            // Get the auth tag
            const tag = cipher.getAuthTag();

            // Create the final encrypted content
            const encryptedData = {
                salt: salt.toString('hex'),
                iv: iv.toString('hex'),
                tag: tag.toString('hex'),
                content: encrypted
            };

            // Save the encrypted content
            const encryptedPath = envPath + '.encrypted';
            fs.writeFileSync(encryptedPath, JSON.stringify(encryptedData));

            // Delete the original .env file
            fs.unlinkSync(envPath);

            return true;
        } catch (error) {
            console.error('Encryption error:', error);
            return false;
        }
    }

    // Decrypt the .env file
    decryptEnv(encryptedPath, password) {
        try {
            // Read the encrypted file
            const encryptedData = JSON.parse(fs.readFileSync(encryptedPath, 'utf8'));

            // Convert hex strings back to buffers
            const salt = Buffer.from(encryptedData.salt, 'hex');
            const iv = Buffer.from(encryptedData.iv, 'hex');
            const tag = Buffer.from(encryptedData.tag, 'hex');

            // Generate key from password and salt
            const key = this.generateKey(password, salt);

            // Create decipher
            const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
            decipher.setAuthTag(tag);

            // Decrypt the content
            let decrypted = decipher.update(encryptedData.content, 'hex', 'utf8');
            decrypted += decipher.final('utf8');

            // Save the decrypted content to .env
            const envPath = encryptedPath.replace('.encrypted', '');
            fs.writeFileSync(envPath, decrypted);

            return true;
        } catch (error) {
            console.error('Decryption error:', error);
            return false;
        }
    }

    // Check if environment variables are encrypted
    isEncrypted(envPath) {
        return fs.existsSync(envPath + '.encrypted');
    }

    // Secure deletion of files
    secureDelete(filePath) {
        try {
            const fileSize = fs.statSync(filePath).size;
            const fd = fs.openSync(filePath, 'w');
            
            // Overwrite with random data
            const buffer = crypto.randomBytes(fileSize);
            fs.writeSync(fd, buffer, 0, fileSize);
            fs.closeSync(fd);

            // Delete the file
            fs.unlinkSync(filePath);
            return true;
        } catch (error) {
            console.error('Secure deletion error:', error);
            return false;
        }
    }
}

module.exports = new EnvEncryption();