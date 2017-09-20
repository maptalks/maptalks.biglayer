#ifdef GL_ES
precision mediump float;
#else
#define lowp
#define mediump
#define highp
#endif

uniform float u_blur;
uniform vec2 u_tex_size;

// varying lowp vec4 v_color;
// varying vec2 v_linenormal;
varying vec4 v_texcoord;
varying float v_opacity;
varying float v_linewidth;
varying float v_scale;
varying float v_texture_normal;
varying float v_linesofar;
// varying float v_ruler;

uniform sampler2D u_image;

void main() {
    vec4 color;
    if (v_texcoord.q == -1.0) {
        // is a texture fragment
        float linesofar = v_linesofar / v_scale;
        float texWidth = u_tex_size.x * v_texcoord.t;
        float x = v_texcoord.s + mod(linesofar, texWidth) / texWidth * v_texcoord.t;
        float y = (v_texture_normal + 1.0) / 2.0 * v_texcoord.p;

        color = texture2D(u_image, vec2(x, y));
    } else {
        // a color fragment
        color = v_texcoord;
    }
    float alpha = 1.0;
    gl_FragColor = color * (alpha * v_opacity);
#ifdef OVERDRAW_INSPECTOR
    gl_FragColor = vec4(1.0);
#endif
}
