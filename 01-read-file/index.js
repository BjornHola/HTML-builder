const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(pathToFile, { encoding: 'utf8' });
readStream.on('error', (err) => {
  console.error('Ошибка при чтении файла:', err.message);
});
readStream.pipe(process.stdout);
console.log(pathToFile);