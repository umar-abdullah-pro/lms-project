import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import HeroSection from '../Components/HeroSection';
import CourseCatalog from '../Components/CourseCatalog';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const catalogRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/courses');
        setCourses(response.data.data);
      } catch (err) {
        setError('Could not load courses. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const scrollToCatalog = () => catalogRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-brand-beige">
      <HeroSection onBrowseClick={scrollToCatalog} />
      <div ref={catalogRef}>
        <CourseCatalog
          courses={courses}
          isLoading={isLoading}
          error={error}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>
    </div>
  );
};

export default Home;
