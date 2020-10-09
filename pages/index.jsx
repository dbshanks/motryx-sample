import Head from 'next/head';
import Main from '@Layout/Main';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Main>
        <h1>Hello World</h1>
      </Main>
    </div>
  );
}
