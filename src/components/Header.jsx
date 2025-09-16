import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gradient-to-b from-purple-500 to-purple-900 text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-10">
      <h1 className="text-3xl font-bold">Krishi Mitra</h1>
      <nav className="space-x-8">
        <Link to="/home" className="hover:underline">Home</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
        <Link to="/soil-status" className="hover:underline">Soil Status</Link>
        <Link to="/feedback" className="hover:underline">Feedback</Link>
        <Link to="/current-crop" className="hover:underline">Current Crop</Link>
      </nav>
    </header>
  );
}
