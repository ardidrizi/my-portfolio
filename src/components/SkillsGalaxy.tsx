import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface Skill {
  name: string;
  level: number;
  description?: string;
}

interface SkillsGalaxyProps {
  skills: Skill[];
}

const SkillsGalaxy: React.FC<SkillsGalaxyProps> = ({ skills }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Three.js initialization
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    // Setup camera and renderer
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    mountRef.current.appendChild(renderer.domElement);
    camera.position.z = 30;

    // Create skills as stars
    skills.forEach((skill, index) => {
      const geometry = new THREE.SphereGeometry(skill.level * 0.5, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(`hsl(${index * 30 % 360}, 70%, 50%)`),
        emissive: new THREE.Color(`hsl(${index * 30 % 360}, 70%, 30%)`),
      });
      const star = new THREE.Mesh(geometry, material);

      // Position in a spiral pattern
      const angle = index * 0.5;
      const radius = index * 0.8;
      star.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 10
      );

      star.userData = { name: skill.name, description: skill.description };
      scene.add(star);
    });

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [skills]);

  return <div ref={mountRef} className="skills-galaxy"></div>;
};

export default SkillsGalaxy;
