import Layout from './Layout';

export default function ErrorDisplay({ statusCode, message, stack }) {
  return (
    <Layout title={`Error ${statusCode}`}>
      <h1 className="text-2xl font-bold text-red-600">{`Error ${statusCode}`}</h1>
      <h2 className="text-xl mt-2">{message}</h2>
      {process.env.NODE_ENV === 'development' && (
        <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto text-sm">{stack}</pre>
      )}
    </Layout>
  );
}
