#ifdef GL_ES
precision mediump float;
#else
#define lowp
#define mediump
#define highp
#endif

uniform float u_blur;
uniform vec2 u_spritesize;

// varying lowp vec4 v_color;
varying vec2 v_linenormal;
varying vec4 v_texcoord;
varying float v_opacity;
varying float v_linewidth;
varying float v_scale;
varying float v_texture_normal;
varying float v_linesofar;
varying float v_ruler;

uniform sampler2D u_image;

void main() {

    // Calculate the distance of the pixel from the line in pixels.
    float dist = length(v_linenormal.xy) * v_linewidth;

    // Calculate the antialiasing fade factor. This is either when fading in
    // the line in case of an offset line (v_linewidth.t) or when fading out
    // (v_linewidth.s)
    float blur = u_blur;
    float alpha = clamp((v_linewidth - dist) / blur, 0.0, 1.0);
    alpha = 1.0;
    vec4 color;
    if (v_texcoord.q == -1.0) {
        // is a texture fragment
        float linesofar = v_linesofar / v_scale;
        float texWidth = u_spritesize.x * v_texcoord.t;
        float x = v_texcoord.s + mod(linesofar, texWidth) / texWidth * v_texcoord.t;
        float y = (v_texture_normal + 1.0) / 2.0 * v_texcoord.p;

        color = texture2D(u_image, vec2(x, y));
        if (abs(v_ruler) > 1.0) {
            color = vec4(1.0);
        }
    } else {
        // a color fragment
        color = v_texcoord;
    }
    gl_FragColor = color * (alpha * v_opacity);
#ifdef OVERDRAW_INSPECTOR
    gl_FragColor = vec4(1.0);
#endif
}
