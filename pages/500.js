import ErrorDisplay from '../components/ErrorDisplay';

export default function Custom500() {
  return (
    <ErrorDisplay 
      statusCode={500} 
      message="Internal Server Error" 
      stack="A server-side error occurred." 
    />
  );
}
