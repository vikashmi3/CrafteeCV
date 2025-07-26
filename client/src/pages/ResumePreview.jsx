import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import ModernTemplate from '../components/resume/templates/ModernTemplate';
import ClassicTemplate from '../components/resume/templates/ClassicTemplate';
import MinimalTemplate from '../components/resume/templates/MinimalTemplate';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ResumePreview = () => {
  const { resumeData, selectedTemplate, setSelectedTemplate } = useResume();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeRef = useRef(null);
  
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });

  // Get template from URL params if provided
  useEffect(() => {
    const template = searchParams.get('template');
    if (template && ['modern', 'classic', 'minimal'].includes(template)) {
      setSelectedTemplate(template);
    }
  }, [searchParams, setSelectedTemplate]);

  const templates = [
    { 
      id: 'modern', 
      name: 'Modern', 
      description: 'Clean and contemporary design with color accents',
      preview: '🎨',
      features: ['Color accents', 'Modern typography', 'Clean layout']
    },
    { 
      id: 'classic', 
      name: 'Classic', 
      description: 'Traditional professional layout',
      preview: '📄',
      features: ['Traditional layout', 'Professional styling', 'ATS-friendly']
    },
    { 
      id: 'minimal', 
      name: 'Minimal', 
      description: 'Simple and elegant design',
      preview: '✨',
      features: ['Minimal design', 'Clean typography', 'Focused content']
    }
  ];

  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'info' }), 3000);
  };

  const downloadAsPDF = async () => {
    if (!resumeRef.current) return;
    
    try {
      setIsDownloading(true);
      showNotification('Generating PDF...', 'info');
      
      const resumeElement = resumeRef.current;
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        removeContainer: true,
        width: resumeElement.scrollWidth,
        height: resumeElement.scrollHeight,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Handle multiple pages
      if (imgHeight > 297) {
        const pageCount = Math.ceil(imgHeight / 297);
        for (let i = 0; i < pageCount; i++) {
          if (i > 0) pdf.addPage();
          const yOffset = -(297 * i);
          pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
        }
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      }
      
      const fileName = `${resumeData.personalInfo.firstName || 'Resume'}_${resumeData.personalInfo.lastName || 'Download'}_${selectedTemplate}.pdf`;
      pdf.save(fileName);
      
      showNotification('PDF downloaded successfully!', 'success');
    } catch (error) {
      console.error('Error generating PDF:', error);
      showNotification('Failed to generate PDF. Please try again.', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  const printResume = async () => {
    setIsPrinting(true);
    showNotification('Preparing for print...', 'info');
    
    // Add print styles temporarily
    const printStyles = document.createElement('style');
    printStyles.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        .print-area, .print-area * { visibility: visible; }
        .print-area { position: absolute; left: 0; top: 0; width: 100%; }
        .no-print { display: none !important; }
      }
    `;
    document.head.appendChild(printStyles);
    
    setTimeout(() => {
      window.print();
      document.head.removeChild(printStyles);
      setIsPrinting(false);
    }, 500);
  };

  const shareResume = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName} - Resume`,
          text: 'Check out my professional resume',
          url: window.location.href
        });
        showNotification('Resume shared successfully!', 'success');
      } catch (error) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showNotification('Resume link copied to clipboard!', 'success');
    } catch (error) {
      showNotification('Failed to copy link', 'error');
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleZoom = (action) => {
    if (action === 'in' && zoomLevel < 200) {
      setZoomLevel(prev => prev + 25);
    } else if (action === 'out' && zoomLevel > 50) {
      setZoomLevel(prev => prev - 25);
    } else if (action === 'reset') {
      setZoomLevel(100);
    }
  };

  const renderTemplate = () => {
    const templateProps = { resumeData };
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate {...templateProps} />;
      case 'classic':
        return <ClassicTemplate {...templateProps} />;
      case 'minimal':
        return <MinimalTemplate {...templateProps} />;
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };

  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="no-print bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main header row */}
          <div className="flex items-center justify-between min-h-[4rem] py-2">
            {/* Left side - Back button and title */}
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <button
                onClick={() => navigate('/builder')}
                className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors whitespace-nowrap"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium hidden sm:inline">Back to Builder</span>
                <span className="font-medium sm:hidden">Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
              <div className="min-w-0">
                <h1 className="text-lg lg:text-xl font-bold text-gray-900 truncate">Resume Preview</h1>
                <p className="text-xs lg:text-sm text-gray-600 truncate">Template: {currentTemplate?.name}</p>
              </div>
            </div>

            {/* Right side - Actions - Responsive layout */}
            <div className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
              {/* Template Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowTemplateSelector(!showTemplateSelector)}
                  className="btn-ghost flex items-center space-x-2"
                >
                  <span className="text-lg">{currentTemplate?.preview}</span>
                  <span className="hidden sm:inline">Change Template</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showTemplateSelector && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Choose Template</h3>
                      <div className="space-y-3">
                        {templates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => {
                              setSelectedTemplate(template.id);
                              setShowTemplateSelector(false);
                              navigate(`/preview?template=${template.id}`);
                            }}
                            className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                              selectedTemplate === template.id
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <span className="text-2xl">{template.preview}</span>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{template.name}</h4>
                                <p className="text-sm text-gray-600">{template.description}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {template.features.map((feature, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                                    >
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleZoom('out')}
                  disabled={zoomLevel <= 50}
                  className="p-2 hover:bg-white rounded transition-colors disabled:opacity-50"
                  title="Zoom Out"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                  </svg>
                </button>
                <span className="px-3 py-2 text-sm font-medium text-gray-700 min-w-[4rem] text-center">
                  {zoomLevel}%
                </span>
                <button
                  onClick={() => handleZoom('in')}
                  disabled={zoomLevel >= 200}
                  className="p-2 hover:bg-white rounded transition-colors disabled:opacity-50"
                  title="Zoom In"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </button>
                <button
                  onClick={() => handleZoom('reset')}
                  className="p-2 hover:bg-white rounded transition-colors text-xs"
                  title="Reset Zoom"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={shareResume}
                  className="btn-ghost flex items-center space-x-2"
                  title="Share Resume"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span className="hidden sm:inline">Share</span>
                </button>

                <button
                  onClick={printResume}
                  disabled={isPrinting}
                  className="btn-ghost flex items-center space-x-2"
                  title="Print Resume"
                >
                  {isPrinting ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  )}
                  <span className="hidden sm:inline">Print</span>
                </button>

                <button
                  onClick={downloadAsPDF}
                  disabled={isDownloading}
                  className="btn-primary flex items-center space-x-2"
                >
                  {isDownloading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download PDF</span>
                    </>
                  )}
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="btn-ghost p-2"
                  title="Toggle Fullscreen"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-6 pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Resume Container */}
          <div className="relative mt-4">
            <div 
              className="print-area mx-auto bg-white rounded-lg shadow-2xl overflow-hidden transition-transform duration-300 ease-out"
              style={{ 
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
                marginTop: zoomLevel > 100 ? `${(zoomLevel - 100) * 0.2}px` : '0px',
                marginBottom: zoomLevel > 100 ? `${(zoomLevel - 100) * 0.5}px` : '0px'
              }}
            >
              <div ref={resumeRef} className="resume-page">
                {renderTemplate()}
              </div>
            </div>

            {/* Floating Action Buttons (Mobile) */}
            <div className="fixed bottom-4 right-4 md:hidden no-print z-30">
              <div className="flex flex-col space-y-2">
                {/* Share Button */}
                <button
                  onClick={shareResume}
                  className="w-12 h-12 bg-gray-700 hover:bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                  title="Share Resume"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
                
                {/* Print Button */}
                <button
                  onClick={printResume}
                  disabled={isPrinting}
                  className="w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-50"
                  title="Print Resume"
                >
                  {isPrinting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  )}
                </button>
                
                {/* Main Download Button */}
                <button
                  onClick={downloadAsPDF}
                  disabled={isDownloading}
                  className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-50"
                  title="Download PDF"
                >
                  {isDownloading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Template Info */}
          <div className="mt-8 no-print">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">{currentTemplate?.preview}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{currentTemplate?.name} Template</h3>
                    <p className="text-gray-600">{currentTemplate?.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-green-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">ATS-Friendly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border animate-slide-up ${
          notification.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' :
          notification.type === 'error' ? 'bg-red-50 text-red-800 border-red-200' :
          'bg-blue-50 text-blue-800 border-blue-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {notification.type === 'success' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : notification.type === 'error' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <p className="font-medium">{notification.message}</p>
            <button
              onClick={() => setNotification({ show: false, message: '', type: 'info' })}
              className="flex-shrink-0 p-1 hover:bg-black/10 rounded-full transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close template selector */}
      {showTemplateSelector && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowTemplateSelector(false)}
        ></div>
      )}
    </div>
  );
};

export default ResumePreview;
