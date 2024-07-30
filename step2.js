const fs = require('fs');
const process = require('process');
const axios = require('axios');

let cat = (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        console.log(data);
    })
}

let webCat = async (path) => {
    try {
        let res = await axios.get(path)
        console.log(res.data)
    } catch (err) {
        console.error(`Error fetching ${path}: ${err}`);
        process.exit(1);
    }
}

let path = process.argv[2]

if (path.slice(0, 4) == 'http') {
    webCat(path)
} else {
    cat(path);
}