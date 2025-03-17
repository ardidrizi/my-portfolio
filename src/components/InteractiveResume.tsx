// import React, { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface SkillCategory {
//   name: string;
//   skills: {
//     name: string;
//     level: number;
//     description?: string;
//   }[];
// }

// interface Experience {
//   title: string;
//   company: string;
//   period: string;
//   description: string;
//   achievements: string[];
//   technologies: string[];
// }

// interface Education {
//   degree: string;
//   institution: string;
//   year: string;
//   description?: string;
// }

// interface ResumeData {
//   name: string;
//   title: string;
//   summary: string;
//   skillCategories: SkillCategory[];
//   experiences: Experience[];
//   education: Education[];
// }

// interface InteractiveResumeProps {
//   resumeData: ResumeData;
// }

// const InteractiveResume: React.FC<InteractiveResumeProps> = ({ resumeData }) => {
//   const [activeSection, setActiveSection] = useState<string>('summary');
//   const [selectedItem, setSelectedItem] = useState<any>(null);
//   const resumeRef = useRef<HTMLDivElement>(null);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1 }
//   };

//   // Section rendering
//   const renderSection = () => {
//     switch (activeSection) {
//       case 'summary':
//         return (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="resume-summary"
//           >
//             <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4">
//               {resumeData.name}
//             </motion.h2>
//             <motion.h3 variants={itemVariants} className="text-xl mb-6 text-primary">
//               {resumeData.title}
//             </motion.h3>
//             <motion.p variants={itemVariants} className="text-lg">
//               {resumeData.summary}
//             </motion.p>
//           </motion.div>
//         );

//       case 'skills':
//         return (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="resume-skills grid grid-cols-1 md:grid-cols-2 gap-6"
//           >
//             {resumeData.skillCategories.map((category, i) => (
//               <motion.div
//                 key={i}
//                 variants={itemVariants}
//                 className="skill-category bg-opacity-10 bg-primary p-4 rounded-lg"
//               >
//                 <h3 className="text-xl font-bold mb-3">{category.name}</h3>
//                 <div className="space-y-3">
//                   {category.skills.map((skill, j) => (
//                     <div
//                       key={j}
//                       className="skill-item cursor-pointer hover:bg-opacity-20 hover:bg-accent p-2 rounded"
//                       onClick={() => setSelectedItem(skill)}
//                     >
//                       <div className="flex justify-between items-center">
//                         <span>{skill.name}</span>
//                         <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
//                           <div
//                             className="h-full bg-gradient-to-r from-primary to-accent"
//                             style={{ width: `${skill.level * 10}%` }}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         );

//       case 'experience':
//         return (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="resume-experience"
//           >
//             {resumeData.experiences.map((exp, i) => (
//               <motion.div
//                 key={i}
//                 variants={itemVariants}
//                 className={`experience-card p-4 mb-6 border-l-4 ${
//                   selectedItem === exp ? 'border-accent bg-accent bg-opacity-5' : 'border-primary'
//                 } rounded cursor-pointer`}
//                 onClick={() => setSelectedItem(selectedItem === exp ? null : exp)}
//               >
//                 <div className="flex flex-wrap justify-between items-start">
//                   <h3 className="text-xl font-bold">{exp.title}</h3>
//                   <span className="text-sm">{exp.period}</span>
//                 </div>
//                 <h4 className="text-lg text-primary mb-2">{exp.company}</h4>
//                 <p>{exp.description}</p>

//                 <AnimatePresence>
//                   {selectedItem === exp && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: 'auto', opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       className="mt-4 overflow-hidden"
//                     >
//                       <h5 className="font-bold mb-2">Key Achievements:</h5>
//                       <ul className="list-disc list-inside mb-3 space-y-1">
//                         {exp.achievements.map((achievement, j) => (
//                           <li key={j}>{achievement}</li>
//                         ))}
//                       </ul>

//                       <h5 className="font-bold mb-2">Technologies:</h5>
//                       <div className="flex flex-wrap gap-2">
//                         {exp.technologies.map((tech, k) => (
//                           <span key={k} className="bg-secondary bg-opacity-20 px-2 py-1 rounded text-sm">
//                             {tech}
//                           </span>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             ))}
//           </motion.div>
//         );

//       case 'education':
//         return (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="resume-education grid grid-cols-1 md:grid-cols-2 gap-6"
//           >
//             {resumeData.education.map((edu, i) => (
//               <motion.div
//                 key={i}
//                 variants={itemVariants}
//                 className="education-card p-4 rounded-lg bg-secondary bg-opacity-10"
//               >
//                 <h3 className="text-xl font-bold">{edu.degree}</h3>
//                 <div className="flex justify-between items-center mb-2">
//                   <h4 className="text-lg text-primary">{edu.institution}</h4>
//                   <span className="text-sm">{edu.year}</span>
//                 </div>
//                 {edu.description && <p>{edu.description}</p>}
//               </motion.div>
//             ))}
//           </motion.div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="interactive-resume p-6" ref={resumeRef}>
//       <div className="resume-nav flex mb-8 overflow-x-auto">
//         {['summary', 'skills', 'experience', 'education'].map((section) => (
//           <button
//             key={section}
//             onClick={() => {
//               setActiveSection(section);
//               setSelectedItem(null);
//             }}
//             className={`px-4 py-2 mx-2 first:ml-0 rounded-md capitalize transition-colors ${
//               activeSection === section
//                 ? 'bg-primary text-white'
//                 : 'bg-gray-200 hover:bg-gray-300'
//             }`}
//           >
//             {section}
//           </button>
//         ))}
//       </div>

//       <div className="resume-content relative min-h-[50vh]">
//         {renderSection()}
//       </div>

//       {/* Print/Download Button */}
//       <div className="mt-8 flex justify-end">
//         <button
//           onClick={() => window.print()}
//           className="bg-accent bg-opacity-80 hover:bg-opacity-100 text-white px-4 py-2 rounded transition-colors"
//         >
//           Export as PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InteractiveResume;
