const fs = require('fs');
const process = require('process');


let cat = (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        console.log(data);
    })
}

cat(process.argv[2]);