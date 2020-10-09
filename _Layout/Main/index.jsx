import Navbar from '@Layout/Navbar';

const Main = ({ children }) => {
  return (
    <div className='container is-fullhd'>
      <Navbar />
      {children}
      <h1>Test</h1>
    </div>
  );
};

export default Main;
