import Hero from '../components/Hero.jsx';
import Navbar from '../components/Navbar.jsx';
import AllProducts from '../components/AllProducts.jsx';

const HomePage = () => {
  

  return (
    <>
      <div className="bg-gray-50 min-h-screen w-full">
        <Navbar />
        <Hero />
        <AllProducts/>
      </div>
    </>
  );
};

export default HomePage;




