import React, { useState, useEffect } from 'react';
import Header from '../components/portfolio/Header';
import CategoryBar from '../components/portfolio/CategoryBar';
import MasonryGrid from '../components/portfolio/MasonryGrid';
import FloatingActionButton from '../components/portfolio/FloatingActionButton';
import Footer from '../components/portfolio/Footer';
import FullscreenViewer from '../components/portfolio/FullscreenViewer';
import { mockProjects, mockCategories, getProjectsByCategory } from '../mock';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      const filteredProjects = getProjectsByCategory(selectedCategory);
      setProjects(filteredProjects);
      setLoading(false);
    }, 300);
  }, [selectedCategory]);

  const handleProjectClick = (project, imageIndex = 0) => {
    setSelectedProject(project);
    setSelectedImageIndex(imageIndex);
    setViewerOpen(true);
  };

  const handleCategoryChange = (categorySlug) => {
    setSelectedCategory(categorySlug);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CategoryBar
        categories={mockCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <MasonryGrid
        projects={projects}
        loading={loading}
        onProjectClick={handleProjectClick}
      />
      <Footer />
      <FloatingActionButton />
      {viewerOpen && selectedProject && (
        <FullscreenViewer
          project={selectedProject}
          initialImageIndex={selectedImageIndex}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  );
};

export default Portfolio;