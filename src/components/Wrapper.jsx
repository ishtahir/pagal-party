import { useLocation } from "react-router-dom";

import Header from './Header';
// import Footer from './Footer';

const Wrapper = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className='wrapper bg'>
      {location.pathname !== "/" && <Header />}
      {children}
      {/* {location.pathname !== "/" && <Footer />} */}
    </div>
  );
};

export default Wrapper;