var fs = require('fs');
var path = require('path');

module.exports = {
  line: {
    fragmentSource: fs.readFileSync(path.join(__dirname, 'line.fragment.glsl'), 'utf8'),
    vertexSource: fs.readFileSync(path.join(__dirname, 'line.vertex.glsl'), 'utf8')
  }
}