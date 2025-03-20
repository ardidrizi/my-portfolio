import React from 'react';
import SkillTree from '../components/SkillTree';
import SkillsGalaxy from '../components/SkillsGalaxy';

const SkillsPage = () => {
  // Example skills data
  const skills = [
    {
      name: "React",
      category: "Frontend",
      level: 9,
      years: 4,
      description: "Building user interfaces with React and related ecosystem"
    },
    {
      name: "TypeScript",
      category: "Languages",
      level: 8,
      years: 3,
      description: "Static typing for JavaScript"
    },
    {
      name: "Node.js",
      category: "Backend",
      level: 7,
      years: 5,
      description: "Server-side JavaScript runtime"
    },
    // Add more skills as needed
  ];

  return (
    <div >
      <h1>My Skills</h1>
      <SkillsGalaxy skills={skills}/>
      {/* <SkillTree skills={skills} /> */}
    </div>
  );
};

export default SkillsPage;
