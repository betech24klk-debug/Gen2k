import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import SkeletonCard from './SkeletonCard';

const MasonryGrid = ({ projects, loading, onProjectClick }) => {
  const [mounted, setMounted] = useState(false);
  const [columns, setColumns] = useState(2);
  const gridRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Responsive column calculation
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(2); // Mobile: 2x2
      else if (width < 1024) setColumns(3); // Tablet
      else if (width < 1536) setColumns(4); // Desktop
      else setColumns(5); // Large desktop
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Distribute projects across columns for masonry effect
  const distributeProjects = () => {
    const cols = Array.from({ length: columns }, () => []);
    projects.forEach((project, index) => {
      cols[index % columns].push(project);
    });
    return cols;
  };

  if (loading) {
    return (
      <div className="w-full px-4 sm:px-6 py-12 max-w-[2000px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="w-full px-4 sm:px-6 py-24 text-center max-w-[2000px] mx-auto">
        <p className="text-gray-500 text-lg">No projects found in this category.</p>
      </div>
    );
  }

  const columnArrays = distributeProjects();

  return (
    <div className="w-full px-4 sm:px-6 py-12 max-w-[2000px] mx-auto">
      <div 
        ref={gridRef}
        className="flex gap-3 sm:gap-4 md:gap-6"
        style={{
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.6s ease-out'
        }}
      >
        {columnArrays.map((column, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-3 sm:gap-4 md:gap-6">
            {column.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={onProjectClick}
                delay={(colIndex * 50) + (index * 100)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryGrid;