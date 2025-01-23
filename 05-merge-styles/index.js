const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, './styles');
const destDir = './project-dist';
const bundler = [];

fs.mkdir(path.join(__dirname, destDir), { recursive: true }, (err) => {
  if (err) {
    return console.error('Directory creation error:', err);
  }
  console.log('Directory provided!');

  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      return console.error('Reading error:', err);
    }

    let temporal = files.length;
    if (!temporal) return writeBundle();

    files.forEach((file) => {
      const filePath = path.join(sourceDir, file);

      fs.lstat(filePath, (err, stats) => {
        if (err) {
          return console.error('Retrieving data error:', err);
        } 

        if (stats.isFile() && path.extname(file) === '.css') {
          fs.readFile(filePath, 'utf8', (err, data) => { 
            if (err) {
              return console.error('Reading error:', err);
            } 

            bundler.push(data);
            temporal -= 1;
            if (temporal === 0) writeBundle();
          });
        } else {
          temporal -= 1;
          if (temporal === 0) writeBundle();
        }
      });
    });
  });
});

function writeBundle() {
  const fileName = 'bundle.css';
  const fullPath = path.join(__dirname, destDir, fileName);
  fs.writeFile(fullPath, bundler.join('\n'), 'utf-8', (err) => {
    if (err) {
      console.error('Writing error:', err);
    } else {
      console.log('Data written successfully!');
    }
  });
}