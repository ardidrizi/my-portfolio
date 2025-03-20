import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import styled from 'styled-components';

interface Skill {
  name: string;
  level: number;
  description?: string;
}

interface SkillsGalaxyProps {
  skills: Skill[];
}

// Styled components for UI elements
const GalaxyContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const GalaxyCanvas = styled.div`
  width: 100%;
  height: 100%;
`;

const SkillInfoPanel = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(15, 23, 42, 0.85);
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-width: 300px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border-left: 4px solid #3b82f6;
  z-index: 10;

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    max-width: 250px;
    padding: 15px;
  }
`;

const SkillsListContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: rgba(15, 23, 42, 0.85);
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-width: 300px;
  backdrop-filter: blur(10px);
  z-index: 10;
  transition: all 0.3s ease;
  border-left: 4px solid #3b82f6;

  @media (max-width: 768px) {
    bottom: 10px;
    left: 10px;
    max-width: 70%;
    padding: 15px;
  }
`;

const SkillTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.3rem;
  color: #60a5fa;
`;

const SkillLevel = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LevelBar = styled.div<{ level: number }>`
  height: 8px;
  background: linear-gradient(to right, #3b82f6 ${props => props.level * 10}%, #1e293b ${props => props.level * 10}%);
  border-radius: 4px;
  flex: 1;
`;

const SkillsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #3b82f6;
    border-radius: 3px;
  }
`;

const SkillItem = styled.li<{ isSelected: boolean }>`
  padding: 8px 12px;
  margin-bottom: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: ${props => props.isSelected ? 'rgba(59, 130, 246, 0.3)' : 'transparent'};

  &:hover {
    background-color: rgba(59, 130, 246, 0.2);
  }
`;

const SkillDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #e2e8f0;
`;

const ControlsHint = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(15, 23, 42, 0.85);
  color: white;
  padding: 10px 15px;
  border-radius: 6px;
  font-size: 0.8rem;
  backdrop-filter: blur(5px);
  transition: opacity 0.3s ease;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
    font-size: 0.7rem;
    padding: 8px 12px;
  }
`;

const SkillsGalaxy: React.FC<SkillsGalaxyProps> = ({ skills }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [controlsVisible, setControlsVisible] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Three.js initialization
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    // Setup camera and renderer
    const canvasWidth = window.innerWidth > 768 ? window.innerWidth / 2 : window.innerWidth * 0.9;
    const canvasHeight = window.innerHeight / 2;

    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    camera.position.z = 30;

    // Setup CSS2D renderer for labels
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(canvasWidth, canvasHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    mountRef.current.appendChild(labelRenderer.domElement);

    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredObject: THREE.Object3D | null = null;

    // Store all skill spheres
    const skillSpheres: THREE.Mesh[] = [];

    // Create skills as stars
    skills.forEach((skill, index) => {
      // Create skill sphere with glow effect
      const geometry = new THREE.SphereGeometry(skill.level * 0.5, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(`hsl(${index * 30 % 360}, 70%, 50%)`),
        emissive: new THREE.Color(`hsl(${index * 30 % 360}, 70%, 30%)`),
        roughness: 0.4,
        metalness: 0.5,
      });
      const star = new THREE.Mesh(geometry, material);

      // Position in a spiral pattern with better distribution
      const angleOffset = index * Math.PI * 0.5;
      const radius = 2 + index * 1.2; // Better spacing
      const height = Math.sin(index * 0.4) * 5; // Varied heights

      star.position.set(
        Math.cos(angleOffset) * radius,
        height,
        Math.sin(angleOffset) * radius
      );

      star.userData = { skill, index };
      scene.add(star);
      skillSpheres.push(star);

      // Add label for each skill
      const skillDiv = document.createElement('div');
      skillDiv.className = 'skill-label';
      skillDiv.textContent = skill.name;
      skillDiv.style.backgroundColor = 'rgba(15, 23, 42, 0.85)';
      skillDiv.style.color = 'white';
      skillDiv.style.padding = '3px 8px';
      skillDiv.style.borderRadius = '4px';
      skillDiv.style.fontSize = '12px';
      skillDiv.style.pointerEvents = 'none';
      skillDiv.style.transition = 'transform 0.2s ease';
      skillDiv.style.transform = 'scale(1)';
      skillDiv.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
      skillDiv.style.fontWeight = 'bold';

      const skillLabel = new CSS2DObject(skillDiv);
      skillLabel.position.set(0, skill.level * 0.5 + 0.8, 0);
      star.add(skillLabel);
    });

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Add point lights for more dynamic lighting
    const pointLight1 = new THREE.PointLight(0x3b82f6, 1, 50);
    pointLight1.position.set(15, 5, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x60a5fa, 1, 50);
    pointLight2.position.set(-15, -5, -10);
    scene.add(pointLight2);

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.7;
    controls.zoomSpeed = 0.8;

    // Auto rotation for better user experience
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Stop auto-rotation when user interacts
    controls.addEventListener('start', () => {
      controls.autoRotate = false;
      setControlsVisible(true);
      // Restart auto-rotation after 5 seconds of inactivity
      clearTimeout(rotationTimeout);
      rotationTimeout = setTimeout(() => {
        controls.autoRotate = true;
      }, 5000);
    });

    let rotationTimeout: ReturnType<typeof setTimeout>;

    // Mouse move handler for hover effects
    const onMouseMove = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

      // Reset any previously hovered object
      if (hoveredObject) {
        (hoveredObject as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(`hsl(${hoveredObject.userData.index * 30 % 360}, 70%, 50%)`),
          emissive: new THREE.Color(`hsl(${hoveredObject.userData.index * 30 % 360}, 70%, 30%)`),
          roughness: 0.4,
          metalness: 0.5,
        });

        // Reset label scale
        if (hoveredObject.children[0]) {
          const labelDiv = (hoveredObject.children[0] as CSS2DObject).element;
          labelDiv.style.transform = 'scale(1)';
        }
      }

      // Find intersections
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(skillSpheres);

      if (intersects.length > 0) {
        hoveredObject = intersects[0].object;
        // Highlight the hovered object
        (hoveredObject as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(`hsl(${hoveredObject.userData.index * 30 % 360}, 70%, 70%)`),
          emissive: new THREE.Color(`hsl(${hoveredObject.userData.index * 30 % 360}, 70%, 50%)`),
          roughness: 0.2,
          metalness: 0.8,
        });

        // Enlarge label
        if (hoveredObject.children[0]) {
          const labelDiv = (hoveredObject.children[0] as CSS2DObject).element;
          labelDiv.style.transform = 'scale(1.2)';
        }

        // Set selected skill for info display
        setSelectedSkill(hoveredObject.userData.skill);
      } else {
        hoveredObject = null;
        setSelectedSkill(null);
      }
    };

    // Click handler to select a skill
    const onClick = () => {
      if (hoveredObject) {
        console.log("Selected skill:", hoveredObject.userData.skill);
      }
    };

    // Add event listeners
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onClick);

    // Animate with smooth camera movements
    const animate = () => {
      requestAnimationFrame(animate);

      // Update controls
      controls.update();

      // Animate point lights for dynamic effect
      const time = Date.now() * 0.001;
      pointLight1.position.x = Math.sin(time * 0.7) * 15;
      pointLight1.position.y = Math.cos(time * 0.5) * 10;
      pointLight2.position.z = Math.cos(time * 0.3) * 15;

      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    };

    animate();

    // Handle window resize for responsive behavior
    const handleResize = () => {
      const newWidth = window.innerWidth > 768 ? window.innerWidth / 2 : window.innerWidth * 0.9;
      const newHeight = window.innerHeight / 2;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      labelRenderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Hide controls hint after 5 seconds
    const hideControlsTimeout = setTimeout(() => {
      setControlsVisible(false);
    }, 5000);

    // Cleanup
    return () => {
      clearTimeout(hideControlsTimeout);
      clearTimeout(rotationTimeout);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('click', onClick);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
        mountRef.current.removeChild(labelRenderer.domElement);
      }
    };
  }, [skills]);

  // Function to handle skill selection from the list
  const handleSkillSelect = (skill: Skill) => {
    setSelectedSkill(skill);
  };

  return (
    <GalaxyContainer>
      <GalaxyCanvas ref={mountRef} />

      {selectedSkill && (
        <SkillInfoPanel>
          <SkillTitle>{selectedSkill.name}</SkillTitle>
          <SkillLevel>
            <span>Level: {selectedSkill.level}/10</span>
            <LevelBar level={selectedSkill.level} />
          </SkillLevel>
          {selectedSkill.description && (
            <SkillDescription>{selectedSkill.description}</SkillDescription>
          )}
        </SkillInfoPanel>
      )}

      <SkillsListContainer>
        <SkillTitle>My Skills</SkillTitle>
        <SkillsList>
          {skills.map((skill, index) => (
            <SkillItem
              key={index}
              isSelected={selectedSkill?.name === skill.name}
              onClick={() => handleSkillSelect(skill)}
            >
              {skill.name}
              <span style={{ float: 'right', opacity: 0.7 }}>{skill.level}/10</span>
            </SkillItem>
          ))}
        </SkillsList>
      </SkillsListContainer>

      {controlsVisible && (
        <ControlsHint>
          🖱️ Drag to rotate | Scroll to zoom
        </ControlsHint>
      )}
    </GalaxyContainer>
  );
};

export default SkillsGalaxy;
