import Layout from '../components/Layout';

export default function Custom404() {
  return (
    <Layout title="404 - Page Not Found">
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-6">The page you are looking for does not exist.</p>
        <a href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Return to Home
        </a>
      </div>
    </Layout>
  );
}
