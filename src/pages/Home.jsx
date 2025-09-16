import Header from "../components/Header";
import Intro from "../components/Intro";
import Dashboard from "../components/Dashboard";
import Slideshow from "../components/Slideshow";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200">
      <Header />
      <main className="px-4 py-6">
        <Slideshow/>
       <Intro /> 
       <Dashboard />
        
      </main>
    </div>
  );
}
