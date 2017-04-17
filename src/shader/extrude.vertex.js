import { maxUniformLength } from './common';
export default
`attribute vec4 a_pos;
attribute vec4 a_normal;
//tex_idx * 100 + opacity * 10
attribute float a_fill_style;

uniform vec3 u_lightcolor;
uniform lowp vec3 u_lightpos;
uniform lowp float u_lightintensity;
uniform vec3 u_ambientlight;

uniform mat4 u_matrix;
uniform float u_fill_styles[${maxUniformLength}];

varying float v_opacity;
varying vec4 v_texcoord;

varying vec4 v_lighting;

void main() {
  int tex_idx = int(floor(a_fill_style / 100.0));
  v_opacity = mod(a_fill_style, 100.0) / 10.0;

  vec4 color = vec4(u_fill_styles[tex_idx], u_fill_styles[tex_idx + 1], u_fill_styles[tex_idx + 2], u_fill_styles[tex_idx + 3]);

  gl_Position = u_matrix * a_pos;

  vec3 normal = normalize(a_normal.xyz);
  // vec3 lightpos = normalize(u_lightpos);
  float nDotL = max(dot(u_lightpos, normal), 0.0);
  vec3 diffuse = u_lightcolor * color.rgb * nDotL;

  vec3 ambient = u_ambientlight * color.rgb;

  v_texcoord = vec4(diffuse + ambient, color.a);

  // vec3 normal = normalize(a_normal.xyz);
  // vec3 lightpos = normalize(u_lightpos.xyz);
  // // codes from mapbox-gl-js
  // v_lighting = vec4(0.0, 0.0, 0.0, 1.0);
  // float directional = clamp(dot(normal, lightpos), 0.0, 1.0);
  // directional = mix((1.0 - u_lightintensity), max((0.5 + u_lightintensity), 1.0), directional);

  // // if (a_normal.y != 0.0) {
  // //   directional *= clamp((t + base) * pow(height / 150.0, 0.5), mix(0.7, 0.98, 1.0 - u_lightintensity), 1.0);
  // // }

  // v_lighting.rgb += clamp(directional * u_lightcolor, mix(vec3(0.0), vec3(0.3), 1.0 - u_lightcolor), vec3(1.0));
}`;
