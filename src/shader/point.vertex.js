export default
`
attribute vec4 a_pos;
attribute float a_size;
attribute vec3 a_texCoord;
attribute vec4 a_texOffset;
uniform mat4 u_matrix;
uniform float u_scale;
varying vec3 v_texCoord;
void main() {
  vec4 pos = vec4(a_pos.x + a_texOffset.x * u_scale, a_pos.y + a_texOffset.y * u_scale, a_pos.z, a_pos.w);
  gl_Position = u_matrix * pos;
  gl_PointSize = a_size;
  v_texCoord = a_texCoord;
}`;
