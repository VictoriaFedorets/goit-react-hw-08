import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.01);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, -5, 20);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 10;
    controls.maxDistance = 30;
    controls.target.set(0, 0, 0);
    controls.update();

    // Определяем размер шара и орбит в зависимости от ширины экрана
    const isLargeScreen = window.innerWidth >= 1440;
    const sphereSize = isLargeScreen ? 5.2 : 4;
    const orbitSize = isLargeScreen ? 7.5 : 5.8;

    const particleShaderMaterial = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;
        void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float pulse = sin(time * 2.0 + length(position)) * 0.15 + 1.0;
            gl_PointSize = size * (300.0 / -mvPosition.z) * pulse;
            gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform float time;
        void main() {
            vec2 cxy = 2.0 * gl_PointCoord - 1.0;
            float r = dot(cxy, cxy);
            if (r > 1.0) discard;
            float glow = exp(-r * 2.5);
            gl_FragColor = vec4(vColor, glow);
        }
      `,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    function createParticleSphere(radius, count) {
      const geometry = new THREE.BufferGeometry();
      const positions = [];
      const colors = [];
      const sizes = [];

      for (let i = 0; i < count; i++) {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        positions.push(x, y, z);

        const color = new THREE.Color(0x00c9ff).multiplyScalar(1.2);
        colors.push(color.r, color.g, color.b);
        sizes.push(Math.random() * 0.15 + 0.08);
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );
      geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

      return new THREE.Points(geometry, particleShaderMaterial);
    }

    function createOrbitRings(radius, count, thickness) {
      const group = new THREE.Group();

      for (let i = 0; i < count; i++) {
        const ringGeometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const sizes = [];
        const particleCount = 3000;

        for (let j = 0; j < particleCount; j++) {
          const angle = (j / particleCount) * Math.PI * 2;
          const radiusVariation = radius + (Math.random() - 0.5) * thickness;
          const x = Math.cos(angle) * radiusVariation;
          const y = (Math.random() - 0.5) * thickness;
          const z = Math.sin(angle) * radiusVariation;
          positions.push(x, y, z);

          const color = new THREE.Color(0xff1493).multiplyScalar(1.1);
          colors.push(color.r, color.g, color.b);
          sizes.push(Math.random() * 0.12 + 0.06);
        }

        ringGeometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(positions, 3)
        );
        ringGeometry.setAttribute(
          "color",
          new THREE.Float32BufferAttribute(colors, 3)
        );
        ringGeometry.setAttribute(
          "size",
          new THREE.Float32BufferAttribute(sizes, 1)
        );

        const ring = new THREE.Points(ringGeometry, particleShaderMaterial);
        ring.rotation.x = Math.random() * Math.PI;
        ring.rotation.y = Math.random() * Math.PI;
        group.add(ring);
      }

      return group;
    }

    const sphereParticles = createParticleSphere(sphereSize, 25000);
    const orbitRings = createOrbitRings(orbitSize, 6, 0.4);

    const mainGroup = new THREE.Group();
    mainGroup.add(sphereParticles);
    mainGroup.add(orbitRings);
    scene.add(mainGroup);

    let time = 0;

    function animate() {
      requestAnimationFrame(animate);
      time += 0.002;
      particleShaderMaterial.uniforms.time.value = time;

      sphereParticles.rotation.y += 0.001;
      sphereParticles.rotation.x = Math.sin(time * 0.5) * 0.15;

      orbitRings.children.forEach((ring, index) => {
        const dynamicSpeed = 0.001 * (Math.sin(time * 0.2) + 2.0) * (index + 1);
        ring.rotation.z += dynamicSpeed;
        ring.rotation.x += dynamicSpeed * 0.6;
        ring.rotation.y += dynamicSpeed * 0.4;
      });

      controls.update();
      renderer.render(scene, camera);
    }

    function updateSize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener("resize", updateSize);
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default ThreeScene;
