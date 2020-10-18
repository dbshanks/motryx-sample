import Navbar from '@Layout/Navbar';
import { Container } from 'semantic-ui-react';
import styles from './main.module.scss';

const Main = ({ children }) => {
  return (
    <Container style={{ width: '80%' }}>
      <Navbar />

      {children}
    </Container>
  );
};

export default Main;
