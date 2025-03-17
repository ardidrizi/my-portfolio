import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: number;
  title: string;
  description: string;
  technologies?: string[];
}

interface JourneyTimelineProps {
  milestones: Milestone[];
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ milestones }) => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const timeline = timelineRef.current;
    const milestoneElements = timeline.querySelectorAll('.milestone');

    gsap.fromTo(
      '.timeline-line',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 2,
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      }
    );

    milestoneElements.forEach((milestone) => {
      gsap.fromTo(
        milestone,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: milestone,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [milestones]);

  return (
    <div className="timeline-container">
      <div ref={timelineRef} className="timeline">
        <div className="timeline-line"></div>
        {milestones.map((milestone, index) => (
          <div key={index} className="milestone" data-year={milestone.year}>
            <div className="milestone-content">
              <h3>{milestone.title}</h3>
              <p>{milestone.description}</p>
              <div className="milestone-technologies">
                {milestone.technologies?.map((tech, i) => (
                  <span key={i} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneyTimeline;
