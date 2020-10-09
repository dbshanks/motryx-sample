import Navbar from '@Layout/Navbar';

import { Container } from '@Layout/Grid/index';

const Main = ({ children }) => {
  return (
    <Container width={80}>
      <Navbar />
      {children}
    </Container>
  );
};

export default Main;
