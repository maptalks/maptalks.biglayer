attribute vec4 a_pos;
attribute vec4 a_normal;
//tex_idx * 100 + opacity * 10
attribute float a_fill_style;

uniform vec3 u_lightcolor;
uniform lowp vec3 u_lightpos;
uniform lowp vec3 u_ambientlight;
uniform lowp float u_lightintensity;
// uniform vec3 u_ambientlight;

uniform mat4 u_matrix;
uniform float u_fill_styles[maxUniformLength];

varying float v_opacity;
varying vec4 v_texcoord;

varying vec4 v_lighting;

void main() {
  int tex_idx = int(a_fill_style / 100.0) * 4;
  v_opacity = mod(a_fill_style, 100.0) / 10.0;

  vec4 color = vec4(u_fill_styles[tex_idx], u_fill_styles[tex_idx + 1], u_fill_styles[tex_idx + 2], u_fill_styles[tex_idx + 3]);

  gl_Position = u_matrix * a_pos;

  vec3 normal = normalize(a_normal.xyz);
  // // vec3 lightpos = normalize(u_lightpos);
  // float nDotL = max(dot(u_lightpos, normal), 0.0);
  // vec3 diffuse = u_lightcolor * color.rgb * nDotL;

  // vec3 ambient = u_ambientlight * color.rgb;

  // v_texcoord = vec4(diffuse + ambient, color.a);

  // Relative luminance (how dark/bright is the surface color?)
  float colorvalue = color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722;
  // Add slight ambient lighting so no extrusions are totally black
    vec4 ambientlight = vec4(u_ambientlight, 1.0);
    color += ambientlight;

    // Calculate cos(theta), where theta is the angle between surface normal and diffuse light ray
    float directional = clamp(dot(normal, u_lightpos), 0.0, 1.0);

    // Adjust directional so that
    // the range of values for highlight/shading is narrower
    // with lower light intensity
    // and with lighter/brighter surface colors
    directional = mix((1.0 - u_lightintensity), max((1.0 - colorvalue + u_lightintensity), 1.0), directional);

    // Add gradient along z axis of side surfaces
    // if (normal.y != 0.0) {
    //     directional *= clamp((t + base) * pow(height / 150.0, 0.5), mix(0.7, 0.98, 1.0 - u_lightintensity), 1.0);
    // }

    // Assign final color based on surface + ambient light color, diffuse light directional, and light color
    // with lower bounds adjusted to hue of light
    // so that shading is tinted with the complementary (opposite) color to the light color
    v_texcoord.r += clamp(color.r * directional * u_lightcolor.r, mix(0.0, 0.3, 1.0 - u_lightcolor.r), 1.0);
    v_texcoord.g += clamp(color.g * directional * u_lightcolor.g, mix(0.0, 0.3, 1.0 - u_lightcolor.g), 1.0);
    v_texcoord.b += clamp(color.b * directional * u_lightcolor.b, mix(0.0, 0.3, 1.0 - u_lightcolor.b), 1.0);
    v_texcoord.a = color.a;
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
}
