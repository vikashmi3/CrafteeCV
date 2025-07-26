import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Templates = () => {
  const { currentUser } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const templateCategories = [
    { id: 'all', name: 'All Templates', count: 12 },
    { id: 'modern', name: 'Modern', count: 4 },
    { id: 'professional', name: 'Professional', count: 4 },
    { id: 'creative', name: 'Creative', count: 4 }
  ];

  const templates = [
    {
      id: 1,
      name: 'Modern Executive',
      category: 'modern',
      description: 'Clean, modern design perfect for executives and senior professionals',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      features: ['ATS-Friendly', 'Clean Layout', 'Professional'],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      name: 'Creative Designer',
      category: 'creative',
      description: 'Bold and creative template for designers and creative professionals',
      image: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      features: ['Creative Layout', 'Color Accents', 'Portfolio Ready'],
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 3,
      name: 'Professional Classic',
      category: 'professional',
      description: 'Traditional professional template suitable for any industry',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      features: ['Timeless Design', 'Formal Layout', 'Industry Standard'],
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 4,
      name: 'Tech Specialist',
      category: 'modern',
      description: 'Modern template designed specifically for tech professionals',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      features: ['Tech-Focused', 'Skills Highlight', 'Modern Design'],
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 5,
      name: 'Marketing Pro',
      category: 'creative',
      description: 'Dynamic template perfect for marketing and sales professionals',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      features: ['Results-Oriented', 'Visual Impact', 'Marketing Focus'],
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 6,
      name: 'Finance Expert',
      category: 'professional',
      description: 'Conservative and professional template for finance professionals',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      features: ['Conservative Design', 'Data-Focused', 'Professional'],
      color: 'from-blue-600 to-navy-700'
    },
    {
      id: 7,
      name: 'Startup Founder',
      category: 'modern',
      description: 'Innovative template for entrepreneurs and startup professionals',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      features: ['Innovation Focus', 'Leadership', 'Growth-Oriented'],
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 8,
      name: 'Healthcare Professional',
      category: 'professional',
      description: 'Clean and trustworthy template for healthcare professionals',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      features: ['Trust-Building', 'Clean Layout', 'Professional'],
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: 9,
      name: 'Artistic Vision',
      category: 'creative',
      description: 'Expressive template for artists and creative professionals',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      features: ['Artistic Flair', 'Creative Freedom', 'Visual Portfolio'],
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 10,
      name: 'Academic Scholar',
      category: 'professional',
      description: 'Academic-focused template for researchers and educators',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      features: ['Academic Focus', 'Research Oriented', 'Publication Ready'],
      color: 'from-emerald-500 to-green-600'
    },
    {
      id: 11,
      name: 'Digital Nomad',
      category: 'modern',
      description: 'Flexible template for remote workers and digital nomads',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      features: ['Remote-Ready', 'Flexible Layout', 'Global Appeal'],
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 12,
      name: 'Design Showcase',
      category: 'creative',
      description: 'Portfolio-focused template to showcase your design work',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      features: ['Portfolio Focus', 'Visual Showcase', 'Creative Layout'],
      color: 'from-violet-500 to-purple-600'
    }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <Link to="/dashboard" className="btn-primary">
                  Go to Dashboard
                </Link>
              ) : (
                <div className="flex space-x-3">
                  <Link to="/login" className="btn-secondary">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary">
                    Sign Up Free
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Professional Resume
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Templates
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose from our collection of professionally designed, ATS-friendly resume templates. 
              Each template is crafted to help you stand out and land your dream job.
            </p>
          </div>

          {/* Category Filter */}
          <div className={`flex flex-wrap justify-center gap-4 mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            {templateCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTemplates.map((template, index) => (
              <div
                key={template.id}
                className={`group card overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                  isVisible ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Template Preview */}
                <div className="relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r ${template.color}`}>
                      {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {template.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {template.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      to={`/builder?template=${template.id}`}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center"
                    >
                      Use Template
                    </Link>
                    <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Create Your Perfect Resume?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Choose any template and start building your professional resume in minutes. 
            All templates are ATS-friendly and designed to get you noticed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={currentUser ? "/dashboard" : "/register"}
              className="bg-white text-indigo-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {currentUser ? "Go to Dashboard" : "Get Started Free"}
            </Link>
            <Link
              to="/builder"
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200"
            >
              Try Builder Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Templates;
