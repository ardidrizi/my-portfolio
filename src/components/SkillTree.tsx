import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface Skill {
  name: string;
  category: string;
  level?: number;
  description?: string;
  years?: number;
}

interface SkillNode {
  id: string;
  name: string;
  children?: SkillNode[];
  level?: number;
  description?: string;
  years?: number;
}

interface SkillTreeProps {
  skills: Skill[];
}

const SkillTree: React.FC<SkillTreeProps> = ({ skills }) => {
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const svgRef = useRef<SVGSVGElement>(null);

  // Organize skills into a hierarchical structure
  const organizeSkills = (skillsArray: Skill[]): SkillNode => {
    const root: SkillNode = { id: "root", name: "Skills", children: [] };
    const categories: Record<string, SkillNode> = {};

    skillsArray.forEach(skill => {
      if (!categories[skill.category]) {
        categories[skill.category] = {
          id: skill.category,
          name: skill.category,
          children: []
        };
        root.children = root.children || [];
        root.children.push(categories[skill.category]);
      }

      categories[skill.category].children = categories[skill.category].children || [];
      categories[skill.category].children?.push({
        id: skill.name,
        name: skill.name,
        level: skill.level,
        description: skill.description,
        years: skill.years
      });
    });

    return root;
  };

  const treeData = organizeSkills(skills);

  // Handle zoom controls
  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      const newLevel = direction === 'in' ? prev + 0.1 : prev - 0.1;
      return Math.max(0.5, Math.min(newLevel, 2)); // Limit zoom between 0.5x and 2x
    });
  };

  // Show skill details when clicked
  const handleSkillClick = (skill: SkillNode) => {
    setActiveSkill(skill);
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const el = svgRef.current;
    const width = 800;
    const height = 600;

    d3.select(el).selectAll("*").remove();

    const svg = d3.select(el)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, 50)`);

    const treeLayout = d3.tree<SkillNode>().size([width - 100, height - 100]);
    const root = d3.hierarchy<SkillNode>(treeData);
    treeLayout(root);

    // Add links
    svg.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", d3.linkVertical<d3.HierarchyPointLink<SkillNode>, d3.HierarchyPointNode<SkillNode>>()
        .x(d => d.x as number)
        .y(d => d.y as number))
      .attr("fill", "none")
      .attr("stroke", "#ccc");

    // Add nodes
    const node = svg.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", d => `node ${d.children ? "node--internal" : "node--leaf"}`)
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .on("click", (event: MouseEvent, d: d3.HierarchyPointNode<SkillNode>) => {
        event.stopPropagation();
        handleSkillClick(d.data);
      });

    // Add circles for nodes
    node.append("circle")
      .attr("r", d => d.data.level ? d.data.level * 5 : 10)
      .attr("fill", d => d.depth === 0 ? "#fff" :
                      d.depth === 1 ? "#f8a100" : "#66c2a5")
      .attr("stroke", "#333");

    // Add labels
    node.append("text")
      .attr("dy", (d: d3.HierarchyPointNode<SkillNode>) => d.children ? -15 : 25)
      .attr("text-anchor", "middle")
      .text(d => d.data.name)
      .attr("fill", "#333")
      .attr("font-size", "12px");
  }, [skills, treeData]);

  return (
    <div className="skill-tree-container">
      <div className="skill-tree-controls">
        <button onClick={() => handleZoom('in')} aria-label="Zoom in">+</button>
        <button onClick={() => handleZoom('out')} aria-label="Zoom out">-</button>
        <button onClick={() => setZoomLevel(1)} aria-label="Reset zoom">Reset</button>
      </div>

      <div
        className="skill-tree"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
      >
        <svg ref={svgRef}></svg>
      </div>

      {activeSkill && (
        <div className="skill-details">
          <button
            className="close-details"
            onClick={() => setActiveSkill(null)}
            aria-label="Close skill details"
          >✕</button>
          <h3>{activeSkill.name}</h3>
          {activeSkill.level && (
            <div className="skill-level">
              <span>Proficiency: </span>
              <div className="level-bar">
                <div style={{ width: `${activeSkill.level * 10}%` }}></div>
              </div>
            </div>
          )}
          {activeSkill.years && <p>Experience: {activeSkill.years} years</p>}
          {activeSkill.description && <p>{activeSkill.description}</p>}
        </div>
      )}
    </div>
  );
};

export default SkillTree;
