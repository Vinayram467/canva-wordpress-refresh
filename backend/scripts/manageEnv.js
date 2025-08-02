const envEncryption = require('../security/envEncryption');
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');

const ENV_PATH = path.join(__dirname, '..', '.env');
const ENCRYPTED_ENV_PATH = ENV_PATH + '.encrypted';

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Generate a secure password
function generateSecurePassword() {
    return crypto.randomBytes(32).toString('hex');
}

// Prompt for password
function promptPassword() {
    return new Promise((resolve) => {
        rl.question('Enter encryption password: ', (password) => {
            resolve(password);
        });
    });
}

// Main function
async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    try {
        switch (command) {
            case 'encrypt':
                // Generate a secure password
                const password = generateSecurePassword();
                console.log('\n🔐 Generated secure password (SAVE THIS SAFELY):\n', password);

                // Encrypt the .env file
                if (envEncryption.encryptEnv(ENV_PATH, password)) {
                    console.log('✅ Environment variables encrypted successfully!');
                    console.log('📝 Original .env file has been securely deleted');
                    console.log('⚠️  IMPORTANT: Store the password safely. You will need it to decrypt the variables.');
                } else {
                    console.error('❌ Encryption failed!');
                }
                break;

            case 'decrypt':
                const decryptPassword = await promptPassword();
                if (envEncryption.decryptEnv(ENCRYPTED_ENV_PATH, decryptPassword)) {
                    console.log('✅ Environment variables decrypted successfully!');
                    console.log('⚠️  IMPORTANT: Delete the .env file when you are done!');
                } else {
                    console.error('❌ Decryption failed! Check your password.');
                }
                break;

            case 'status':
                const isEncrypted = envEncryption.isEncrypted(ENV_PATH);
                console.log(`Environment variables are currently ${isEncrypted ? 'ENCRYPTED 🔒' : 'DECRYPTED 🔓'}`);
                break;

            default:
                console.log(`
🔐 Environment Variables Manager

Commands:
  encrypt  - Encrypt .env file and generate a secure password
  decrypt  - Decrypt .env file (requires password)
  status   - Check if environment variables are encrypted

Usage:
  node manageEnv.js <command>
`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }

    rl.close();
}

main();