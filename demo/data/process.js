const fs = require('fs');

const lineReader = require('readline').createInterface({
    input: fs.createReadStream('./buildings.js')
});

const writer = fs.createWriteStream('buildings-mini.js');

let lineNum = 0;
lineReader.on('line', function (line) {
    if (lineNum < 5 || line.length === 1) {
        writer.write(line + '\n');
    } else if (Math.random() * 5 <= 1) {
        writer.write(line + '\n');
    }
    lineNum++;
});

lineReader.on('close', () => {
    writer.end();
    lineReader.close();
});

