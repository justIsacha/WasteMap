// frontend/src/components/Iridescence.jsx
import { useEffect, useRef } from "react";
import { Renderer, Camera, Transform, Program, Mesh, Plane } from "ogl";

const Iridescence = ({
  color = [0.2, 0.9, 0.5],
  mouseReact = false,
  amplitude = 0.1,
  speed = 1.0,
  gradientTop = [0.1, 0.1, 0.2],
  gradientBottom = [0.4, 0.1, 0.3]
}) => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Renderer
    const renderer = new Renderer({ dpr: 2, alpha: false });
    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";

    // Camera
    const camera = new Camera(gl, { fov: 45 });
    camera.position.z = 5;

    const scene = new Transform();

    // Vertex shader
    const vertex = `
      attribute vec3 position;
      attribute vec2 uv;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    // Fragment shader with gradient background + iridescence
    const fragment = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec3 uColor;
      uniform float uAmplitude;
      uniform float uSpeed;
      uniform vec3 uGradientTop;
      uniform vec3 uGradientBottom;

      void main() {
        vec2 uv = vUv;

        // Gradient background
        vec3 background = mix(uGradientBottom, uGradientTop, uv.y);

        // Waves for iridescence
        float wave1 = sin(uv.x * 10.0 + uTime * uSpeed) * uAmplitude;
        float wave2 = cos(uv.y * 8.0 - uTime * uSpeed * 0.8) * uAmplitude;

        vec2 mouseEffect = (uv - uMouse) * 2.0;
        float mouseDist = length(mouseEffect);
        float mouseWave = sin(mouseDist * 10.0 - uTime * 2.0) * 0.1;

        float combined = wave1 + wave2 + mouseWave;

        vec3 color1 = uColor;
        vec3 color2 = vec3(uColor.b, uColor.r, uColor.g);
        vec3 color3 = vec3(uColor.g, uColor.b, uColor.r);

        vec3 iridescence = mix(color1, color2, sin(combined + uTime * 0.5) * 0.5 + 0.5);
        iridescence = mix(iridescence, color3, cos(combined - uTime * 0.3) * 0.5 + 0.5);

        float shimmer = sin(uv.x * 20.0 + uv.y * 15.0 + uTime) * 0.1 + 0.9;
        iridescence *= shimmer;

        // Combine gradient and iridescence
        vec3 finalColor = mix(background, iridescence, 0.7);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Program
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: [0.5, 0.5] },
        uColor: { value: color },
        uAmplitude: { value: amplitude },
        uSpeed: { value: speed },
        uGradientTop: { value: gradientTop },
        uGradientBottom: { value: gradientBottom }
      }
    });

    // Geometry + Mesh
    const geometry = new Plane(gl, { width: 10, height: 10 });
    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    // Resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Mouse
    const handleMouseMove = (e) => {
      if (mouseReact) {
        mouseRef.current.x = e.clientX / window.innerWidth;
        mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationId;
    const animate = (t) => {
      animationId = requestAnimationFrame(animate);
      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uMouse.value = [mouseRef.current.x, mouseRef.current.y];
      renderer.render({ scene, camera });
    };
    animate(0);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (containerRef.current && gl.canvas) {
        containerRef.current.removeChild(gl.canvas);
      }
    };
  }, [color, mouseReact, amplitude, speed, gradientTop, gradientBottom]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1
      }}
    />
  );
};

export default Iridescence;
