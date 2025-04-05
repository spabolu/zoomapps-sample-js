import { useEffect } from 'react';
import Layout from '../../components/Layout';

export default function AuthCallback() {
  useEffect(() => {
    // Auth callback is handled server-side
  }, []);

  return (
    <Layout title="Authorizing...">
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold mb-4">Authorizing with Zoom</h1>
        <p className="text-lg">Please wait while we complete the authorization process...</p>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query, req, res }) {
  try {
    const { code, state } = query;

    if (!code || !state) {
      throw new Error('Missing required parameters');
    }

    // Call our API route to handle the OAuth callback
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = req.headers.host;
    const response = await fetch(
      `${protocol}://${host}/api/auth/callback?code=${code}&state=${state}`,
      {
        headers: req.headers.cookie ? { cookie: req.headers.cookie } : {},
      }
    );

    if (!response.ok) {
      throw new Error('Failed to complete authentication');
    }

    const { deeplink } = await response.json();
    
    // Redirect to the Zoom client
    res.writeHead(302, { Location: deeplink });
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Error during auth callback:', error);
    
    return {
      props: {
        error: {
          message: error.message,
          status: 400,
        },
      },
    };
  }
}
