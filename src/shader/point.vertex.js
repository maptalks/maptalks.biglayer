export default
`
// marker's 2d point at max zoom
attribute vec4 a_pos;
// texture idx in u_sprite
attribute float a_sprite_idx;
uniform mat4 u_matrix;
// scale of current zoom
uniform float u_scale;
// sprites, an array of sprites
// a sprite has 6 integers:
// 0 : northwest's x, 1 : width, 2: height, 3: sprite size, 4: offset x, 5: offset y
// array's length is not dynamic, support maximum 300 sprites
uniform float u_sprite[1800];
varying vec3 v_texCoord;
void main() {
  int idx = int(a_sprite_idx);
  float size = u_sprite[idx + 3];
  vec2 textOffset = vec2(u_sprite[idx + 4], u_sprite[idx + 5]);
  vec4 pos = vec4(a_pos.x + textOffset.x * u_scale, a_pos.y + textOffset.y * u_scale, a_pos.z, a_pos.w);
  gl_Position = u_matrix * pos;
  gl_PointSize = size;
  // texture coord
  v_texCoord = vec3(u_sprite[idx], u_sprite[idx + 1], u_sprite[idx + 2]);
}`;
