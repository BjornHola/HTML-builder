const fs = require('fs');
const readline = require('readline');
const path = require('path');
const linereader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const filePath = path.join(__dirname, '02-write-text.txt');

const output = fs.createWriteStream(filePath, { flags: 'a' });

function promptInput() {
  linereader.question('Enter your text: ', (input) => {
    if (input.toLowerCase() === 'exit') {
      console.log('Good Bye!');
      linereader.close();
    } else {
      output.write(`${input}\n`);
      promptInput();
    }
  });
}
linereader.on('close', () => {
  console.log('This is over.');
});
console.log('Hi there! Enter your text');
promptInput();
