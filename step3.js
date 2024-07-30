const fs = require('fs');
const process = require('process');
const axios = require('axios');

let output = (txt, out) => {
    if (out) {
        fs.writeFile(out, txt, 'utf8', (err) => {
            if (err) {
                console.error(`Error writting ${out}: ${err}`);
                process.exit(1);
            }
        })
    }
    else {
        console.log(txt)
    }
}

let cat = (path, out) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        output(data, out);
    })
}

let webCat = async (path, out) => {
    try {
        let res = await axios.get(path)
        output(res.data, out)
    } catch (err) {
        console.error(`Error fetching ${path}: ${err}`);
        process.exit(1);
    }
}

let path;
let out;

if (process.argv[2] == '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2]
}

if (path.slice(0, 4) == 'http') {
    webCat(path, out)
} else {
    cat(path, out);
}