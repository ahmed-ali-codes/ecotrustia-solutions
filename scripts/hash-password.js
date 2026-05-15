const bcrypt = require('bcryptjs');

const password = 'password';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Plaintext password:', password);
    console.log('Hashed password:', hash);
    console.log('\nCopy the hash above and paste it into your .env file as ADMIN_PASSWORD');
});
