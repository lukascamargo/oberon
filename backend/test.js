const crypto = require('crypto');

const salt = 'ogatocomeuorato';

console.log('Salt: ', salt);

const hash = crypto.pbkdf2Sync('senha', salt, 1000, 64, 'sha512').toString('hex');

console.log(hash);


const hash2 = crypto.pbkdf2Sync('senha', salt, 1000, 64, 'sha512').toString('hex');

console.log(hash === hash2);

const senha = crypto.createDecipher('sha512', 'senha');
senha.update(salt, 1000, 64, 'hex')

console.log(senha);