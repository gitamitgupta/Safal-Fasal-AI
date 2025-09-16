export default function Header() {
  return (
    <header className="bg-gradient-to-b from-purple-500 to-purple-900 text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-10">
      <h1 className="text-3xl font-bold">Krishi Mitra</h1>
      <nav className="space-x-8">
        <a href="/profile" className="hover:underline">Profile</a>
        <a href="/soil-status" className="hover:underline">Soil Status</a>
        <a href="/feedback" className="hover:underline">Feedback</a>
        <a href="/current-crop" className="hover:underline">Current Crop</a>
      </nav>
    </header>
  );
}
