const fs = require('fs');
const path = require('path');

const sourceDir = './files';
const destFolder = 'files-copy';


fs.mkdir(path.join(__dirname, destFolder), { recursive: true }, (err) => {
  if (err) {
    return console.error('Directory creation error:', err);
  }
  console.log('Directory created successfully!');

  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      return console.error('Reading error:', err);
    }
    files.forEach((file) => {
      const srcPath = path.join(sourceDir, file);
      const destPath = path.join(__dirname, destFolder, file);

      fs.copyFile(srcPath, destPath, (err) => {
        if (err) {
          return console.error('Copying error:', err);
        }
        console.log(`File ${file} copied successfully!`);
      });
    });
  });
});
