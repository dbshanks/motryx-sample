import Main from '../Layout/Main';
import 'semantic-ui-css/semantic.min.css';
import '../scss/main.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Main>
      <Component {...pageProps} />
    </Main>
  );
}

export default MyApp;
