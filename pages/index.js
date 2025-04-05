import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getAppContext } from '../lib/cipher';

export default function Home({ initialIsZoom, title }) {
  const [isZoom, setIsZoom] = useState(initialIsZoom);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function initZoomApp() {
      if (isZoom) {
        try {
          const { default: zoomSdk } = await import('@zoom/appssdk');
          const configResponse = await zoomSdk.config({
            size: { width: 480, height: 360 },
            capabilities: [
              /* Add Capabilities Here */
              'shareApp',
            ],
          });
          console.debug('Zoom JS SDK Configuration', configResponse);
        } catch (e) {
          console.error(e);
        }
      }
      setIsLoading(false);
    }

    initZoomApp();
  }, [isZoom]);

  if (isLoading) {
    return (
      <Layout title="Loading...">
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={title}>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      {isZoom ? (
        <p className="text-lg">Welcome to your Zoom App</p>
      ) : (
        <p className="text-lg">
          You're viewing your Zoom App through the browser.{' '}
          <Link href="/install" className="text-blue-600 hover:underline">
            Click Here
          </Link>{' '}
          to install your app in Zoom.
        </p>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  try {
    // Check for Zoom context header
    const contextHeader = req.headers['x-zoom-app-context'];
    
    if (!contextHeader) {
      return {
        props: {
          initialIsZoom: false,
          title: 'Hello Browser',
        },
      };
    }

    const context = getAppContext(contextHeader);
    
    // Check for expired context
    if (context.exp && context.exp < Date.now()) {
      return {
        props: {
          initialIsZoom: false,
          title: 'Hello Browser - Context Expired',
        },
      };
    }

    return {
      props: {
        initialIsZoom: true,
        title: 'Hello Zoom',
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        initialIsZoom: false,
        title: 'Hello Browser',
      },
    };
  }
}
