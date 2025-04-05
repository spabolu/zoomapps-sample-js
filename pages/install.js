import { useEffect } from 'react';
import Layout from '../components/Layout';

export default function Install() {
  useEffect(() => {
    // Redirect is handled server-side
  }, []);

  return (
    <Layout title="Installing Zoom App">
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold mb-4">Installing Zoom App</h1>
        <p className="text-lg mb-4">Redirecting to Zoom authorization page...</p>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    // Fetch the install URL from our API route
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = req.headers.host;
    const response = await fetch(`${protocol}://${host}/api/auth/install-url`, {
      headers: req.headers.cookie ? { cookie: req.headers.cookie } : {},
    });

    if (!response.ok) {
      throw new Error('Failed to get install URL');
    }

    const { redirectUrl } = await response.json();
    
    // Redirect to Zoom OAuth
    res.writeHead(302, { Location: redirectUrl });
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Error during install redirect:', error);
    
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}
