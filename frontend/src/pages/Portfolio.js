import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/portfolio/Header';
import CategoryBar from '../components/portfolio/CategoryBar';
import MasonryGrid from '../components/portfolio/MasonryGrid';
import FloatingActionButton from '../components/portfolio/FloatingActionButton';
import Footer from '../components/portfolio/Footer';
import FullscreenViewer from '../components/portfolio/FullscreenViewer';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [error, setError] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/categories`);
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  // Fetch projects when category changes
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
        const response = await axios.get(`${API_URL}/api/projects`, { params });
        setProjects(response.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };
    fetchProjects();
  }, [selectedCategory]);

  const handleProjectClick = (project, imageIndex = 0) => {
    setSelectedProject(project);
    setSelectedImageIndex(imageIndex);
    setViewerOpen(true);
  };

  const handleCategoryChange = (categorySlug) => {
    setSelectedCategory(categorySlug);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-[#b8d71b] text-black rounded-lg hover:bg-[#a0c000] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CategoryBar
        categories={categories}
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
