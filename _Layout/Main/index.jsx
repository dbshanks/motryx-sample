import Navbar from '@Layout/Navbar';
import { Container, Column, Row } from '@Layout/Grid/index';
import styles from './main.module.scss';

const Main = ({ children }) => {
  return (
    <Container width={80}>
      <Navbar />

      {children}
    </Container>
  );
};

export default Main;
