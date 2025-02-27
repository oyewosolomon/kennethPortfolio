import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Linkedin, Github, Menu, X } from 'lucide-react';
import Gallery from '@/components/Gallery';

interface Experience {
  year: string;
  title: string;
  company: string;
  description: string;
}

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

interface VisibilityState {
  hero: boolean;
  about: boolean;
  experience: boolean;
  gallery: boolean;
  services: boolean;
  contact: boolean;
}

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isVisible, setIsVisible] = useState<VisibilityState>({
    hero: false,
    about: false,
    experience: false,
    gallery: false,
    services: false,
    contact: false
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible({
      hero: true,
      about: true,
      experience: true,
      gallery: true,
      services: true,
      contact: true
    });

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Auto-scroll gallery
    if (galleryRef.current) {
      autoScrollRef.current = setInterval(() => {
        if (galleryRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = galleryRef.current;
          const newScrollTop = scrollTop + 1;
          
          // Reset scroll position when reached bottom
          if (scrollTop + clientHeight >= scrollHeight - 1) {
            galleryRef.current.scrollTop = 0;
          } else {
            galleryRef.current.scrollTop = newScrollTop;
          }
        }
      }, 30);
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];

  const experiences: Experience[] = [
    {
      year: '2021-Present',
      title: 'Survey Party Chief & Project Director',
      company: 'OTIC Surveys Ltd.',
      description: 'Led over 150 projects across diverse surveying disciplines, demonstrating exceptional leadership and technical proficiency.'
    },
    {
      year: '2019-2021',
      title: 'Project Surveyor',
      company: 'GeoMap Solutions',
      description: 'Conducted surveys for urban infrastructure projects including highways and public transit systems.'
    },
    {
      year: '2017-2019',
      title: 'Junior Surveyor',
      company: 'TerraTech Surveying',
      description: 'Assisted senior surveyors with field measurements and data collection for various projects.'
    }
  ];

  const services: Service[] = [
    {
      title: 'Cadastral Surveys',
      description: 'Accurate boundary surveys for property delineation and land ownership.',
      icon: '📏'
    },
    {
      title: 'Hydrographic Surveys',
      description: 'Detailed mapping of water bodies for navigation and construction planning.',
      icon: '🌊'
    },
    {
      title: 'Topographic Surveys',
      description: 'Comprehensive mapping of land contours, elevations, and existing features.',
      icon: '🏔️'
    },
    {
      title: 'Aerial Photogrammetry',
      description: 'High-precision 3D mapping using drone technology.',
      icon: '🛸'
    },
    {
      title: 'Land Survey',
      description: 'Determining and marking property lines, resolving disputes, and designing subdivisions.',
      icon: '📍'
    },
    {
      title: 'Engineering/Construction Survey',
      description: 'Marking proposed structures, ensuring accurate placement, and verifying as-built conditions.',
      icon: '🏗️'
    },
    {
      title: 'Route Survey',
      description: 'Surveying linear strips of land for roads, pipelines, and transmission lines.',
      icon: '🛣️'
    },
    {
      title: 'Aerial Survey (Photogrammetric Survey)',
      description: 'Creating maps and 3D models using aerial photographs or LiDAR data.',
      icon: '🛩️'
    },
    {
      title: '3D Laser Scanning',
      description: 'Capturing detailed 3D data for architectural, industrial, and accident reconstruction purposes.',
      icon: '🔍'
    }
  ];

  const galleryImages: GalleryImage[] = [
    { id: 1, src: '/images/image-1.jpg', alt: 'Cadastral survey work', caption: 'Cadastral Survey' },
    { id: 2, src: '/images/image-2.jpg', alt: 'Hydrographic survey work', caption: 'Hydrographic Mapping' },
    { id: 3, src: '/images/image-3.jpg', alt: 'Topographic survey work', caption: 'Topographic Mapping' },
    { id: 4, src: '/images/image-4.jpg', alt: 'Aerial photogrammetry', caption: 'Aerial Photogrammetry' }
  ];

  return (
    <>
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
  {/* Navigation */}
  <nav className={`fixed w-full ${isScrolled ? 'bg-white shadow-md' : ''} ${isDarkMode ? 'bg-gray-800' : ''} z-50 py-4`}>
    <div className="container mx-auto px-4 flex justify-between items-center">
      <div className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
        Emmanuel<span className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>.Survey</span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`font-medium hover:text-blue-600 transition-colors ${
              activeSection === item.id ? 'text-blue-600' : isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {item.label}
          </button>
        ))}
        <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          {isDarkMode ? '🌙' : '☀️'}
        </button>
      </div>

      {/* Mobile Navigation Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className={isDarkMode ? 'text-gray-300' : 'text-gray-800'}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className={`md:hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} py-4 px-4 shadow-inner`}>
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`font-medium hover:text-blue-600 transition-colors ${
                activeSection === item.id ? 'text-blue-600' : isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {isDarkMode ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    )}
  </nav>

  {/* Hero Section */}
  <section
    id="home"
    className={`relative h-screen flex items-center justify-center ${
      isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 to-gray-100'
    }`}
  >
    {/* Video Background */}
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      >
        <source src="/images/All survey instruments.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Optional: Overlay to darken the video */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-black bg-opacity-60' : 'bg-white bg-opacity-80'}`}></div>
    </div>

    {/* Content */}
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <div className={`transition-all duration-1000 transform ${
          isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            Emmanuel <span className="text-blue-600">Kenneth</span>
          </h1>
          <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-10`}>
            Professional Surveyor | Project Manager | Geomatics Expert
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Get in Touch
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className={`${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : 'bg-white hover:bg-gray-100 text-blue-600'
              } font-medium py-3 px-8 rounded-lg border border-blue-200 transition-all shadow-md hover:shadow-lg`}
            >
              View Gallery
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Scroll Down Button */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <button
        onClick={() => scrollToSection('about')}
        className={`animate-bounce ${isDarkMode ? 'bg-gray-700' : 'bg-white'} p-3 rounded-full shadow-md`}
      >
        <ChevronDown size={24} className="text-blue-600" />
      </button>
    </div>
  </section>
</div>
      {/* About Section */}
      <section id="about" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-1000 transform ${isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>About Me</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-10"></div>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="lg:w-1/2">
                <div className="aspect-square w-full max-w-sm mx-auto bg-gray-200 rounded-2xl shadow-xl overflow-hidden">
                  <img src="/images/ken.jpeg" alt="Emmanuel Kenneth portrait" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="lg:w-1/2">
                <h3 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Emmanuel Kenneth</h3>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                  A highly skilled and dedicated surveyor with over 7 years of experience in the field of surveying and geoinformatics. Specializing in Cadastral, Hydrographic, Topographic, and Engineering surveys, as well as Aerial Photogrammetry, Remote Sensing, GIS, and Spatial Analysis.
                </p>
                <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                  A graduate of the Federal University of Technology, Owerri (F.U.T.O), Emmanuel holds a Bachelor of Technology degree in Surveying and Geoinformatics (2019). He is also a certified Project Management Professional (PMP) and Business Strategy Consultant.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'} p-6 rounded-lg`}>
                    <div className="text-4xl text-blue-600 font-bold">7+</div>
                    <div className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Years Experience</div>
                  </div>
                  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'} p-6 rounded-lg`}>
                    <div className="text-4xl text-blue-600 font-bold">150+</div>
                    <div className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Projects Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Experience Timeline Section */}
      <section id="experience" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-1000 transform ${isVisible.experience ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Work Experience</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-10"></div>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200"></div>
                
                {experiences.map((exp, index) => (
                  <div 
                    key={index} 
                    className={`mb-12 relative flex flex-col md:flex-row ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="md:w-1/2"></div>
                    <div className="absolute left-0 md:left-1/2 transform -translate-y-1/3 md:-translate-x-1/2 w-10 h-10 rounded-full bg-blue-600 border-4 border-white shadow-lg z-10"></div>
                    <div className={`md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-16 pl-12' : 'md:pl-16 pl-12'
                    }`}>
                      <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow`}>
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm mb-4">
                          {exp.year}
                        </span>
                        <h3 className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{exp.title}</h3>
                        <h4 className={`text-lg text-blue-600 mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{exp.company}</h4>
                        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Section with Parallax */}
      <section id="gallery" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-blue-900'} text-white overflow-hidden`}>
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-1000 transform ${isVisible.gallery ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Project Gallery</h2>
              <div className="w-20 h-1 bg-blue-400 mx-auto mb-10"></div>
              <p className="text-lg text-blue-200">
                Featured projects and fieldwork from my surveying career
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
              {/* Parallax image gallery column */}
              <div className="lg:w-1/2 h-full overflow-hidden">
                <div 
                  ref={galleryRef}
                  className="h-96 lg:h-128 overflow-auto hide-scrollbar"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  <div className="space-y-8">
                    {galleryImages.map((image, index) => (
                      <div 
                        key={image.id}
                        className="relative rounded-xl px-5 overflow-hidden shadow-2xl transform transition-transform hover:scale-105"
                        style={{
                          transform: `translateY(${
                            index % 2 === 0 ? 
                            Math.sin(scrollPosition / 500) * 20 : 
                            Math.cos(scrollPosition / 500) * 20
                          }px)`
                        }}
                      >
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="w-full h-auto rounded-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900 to-transparent p-6">
                          <h3 className="text-xl font-bold text-white">{image.caption}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Gallery description */}
              <div className="lg:w-1/2 flex flex-col justify-center">
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-blue-800'} rounded-xl p-8 shadow-2xl`}>
                  <h3 className="text-3xl font-bold mb-6">Project Showcase</h3>
                  <p className="text-blue-100 mb-6">
                    Browse through a collection of my most significant surveying projects across various terrains and environments.
                  </p>
                  <p className="text-blue-100 mb-8">
                    From urban development surveys to complex topographic mapping in challenging environments, this gallery demonstrates the range of services I provide and the quality of results I deliver to clients.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-blue-700 rounded-lg p-4">
                      <div className="text-3xl font-bold text-blue-200 mb-1">150+</div>
                      <div className="text-blue-300">Projects Completed</div>
                    </div>
                    <div className="bg-blue-700 rounded-lg p-4">
                      <div className="text-3xl font-bold text-blue-200 mb-1">12+</div>
                      <div className="text-blue-300">States Covered</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    Discuss Your Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Gallery/>
      {/* Services Section */}
      <section id="services" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-1000 transform ${isVisible.services ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>My Services</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-10"></div>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Offering a comprehensive range of professional surveying services tailored to meet your specific needs
              </p>
            </div>
            <div className='max-w-7xl mx-auto'>

           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2`}
                >
                  <div className="text-5xl mb-6">{service.icon}</div>
                  <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{service.title}</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{service.description}</p>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
        <div className="container mx-auto px-4">
          <div className={`transition-all duration-1000 transform ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Get In Touch</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-10"></div>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Have a project in mind? Let's discuss how I can help with your surveying needs
              </p>
            </div>
            <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12">
              <div className="lg:w-2/5">
                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} p-8 rounded-xl shadow-lg`}>
                  <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Mail className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Email</div>
                        <div className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>emmanuel@example.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Phone className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Phone</div>
                        <div className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>+234 814 154 4655</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <MapPin className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Office</div>
                        <div className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>123 Main Street, Suite 200, Anytown, USA</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className={`font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Connect</h4>
                    <div className="flex gap-4">
                      <a href="https://fb.com/emmanuel.kenneth54" className="bg-gray-100 p-3 rounded-lg hover:bg-blue-100 transition-colors">
                        <Linkedin className="text-gray-700 hover:text-blue-600" size={20} />
                      </a>
                      <a href="https://instagram.com/manlikekenzay" className="bg-gray-100 p-3 rounded-lg hover:bg-blue-100 transition-colors">
                        <Github className="text-gray-700 hover:text-blue-600" size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-3/5">
                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} p-8 rounded-xl shadow-lg`}>
                  <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Send Message</h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block ${isDarkMode ? 'text-gray-100' : 'text-gray-700'} mb-2`} htmlFor="name">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          className={`w-full border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-100' : 'border-gray-300 bg-white text-gray-800'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`} 
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className={`block ${isDarkMode ? 'text-gray-100' : 'text-gray-700'} mb-2`} htmlFor="email">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          className={`w-full border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-100' : 'border-gray-300 bg-white text-gray-800'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`} 
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block ${isDarkMode ? 'text-gray-100' : 'text-gray-700'} mb-2`} htmlFor="subject">Subject</label>
                      <input 
                        type="text" 
                        id="subject" 
                        className={`w-full border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-100' : 'border-gray-300 bg-white text-gray-800'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`} 
                        placeholder="Subject"
                      />
                    </div>
                    <div>
                      <label className={`block ${isDarkMode ? 'text-gray-100' : 'text-gray-700'} mb-2`} htmlFor="message">Message</label>
                      <textarea 
                        id="message" 
                        rows={5} 
                        className={`w-full border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-100' : 'border-gray-300 bg-white text-gray-800'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`} 
                        placeholder="Your message"
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl w-full md:w-auto"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className={`py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white`}>
        <div className="container mx-auto px-4 text-center">
          <div className="text-xl font-bold mb-4">
            Emmanuel<span className="text-blue-400">.Survey</span>
          </div>
          <p className="text-gray-400">© {new Date().getFullYear()} Emmanuel Kenneth Surveying Services. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;