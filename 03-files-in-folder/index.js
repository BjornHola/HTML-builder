const fs = require('fs');
const path = require('path');
const folderPath = './secret-folder';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    return console.error('Reading error:', err);
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    fs.lstat(filePath, (err, stats) => {
      if (err) {
        return console.error('Retrieving data error:', err);
      }

      if (stats.isFile()) {
        const fileName = path.basename(filePath, path.extname(filePath));
        const fileExt = path.extname(filePath).slice(1);
        console.log(
          `${fileName} - ${fileExt} - ${stats.size} bytes`,
        );
      }
    });
  });
});
