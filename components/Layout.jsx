import Head from 'next/head';

export default function Layout({ children, title = 'Zoom App' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Zoom App Sample" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        {children}
      </main>
      <noscript>Javascript must be enabled to use this application</noscript>
    </>
  );
}
