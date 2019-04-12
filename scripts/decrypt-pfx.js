const fs = require('fs');
const encrypted = fs.readFileSync('./cordova/WindowsKey.pfx.enc');
const decipher = require('crypto').createDecipher('aes-128-ecb', process.env.PFX_DECRYPT_KEY);
const output = Buffer.concat([decipher.update(encrypted) , decipher.final()]);
fs.writeFileSync('./cordova/WindowsKey.pfx', output);