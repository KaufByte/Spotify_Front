import { useLocation } from "react-router-dom";

const PageBackground = ({ children }) => {
  const location = useLocation();

  const getPageBackgroundStyle = () => {
    switch (location.pathname) {
      case '/login':
        return { background: 'linear-gradient(to right, #e66465, #9198e5)' }; 
      case '/signup':
        return { backgroundColor: '#8e44ad' }; 
      default:
        return { backgroundColor: '#ecf0f1' }; 
    }
  };

  return (
    <div style={{ ...getPageBackgroundStyle(), height: '100vh' }}>
      {children}
    </div>
  );
};

export default PageBackground;
