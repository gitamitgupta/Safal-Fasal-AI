import Intro from "../components/Intro";
import Dashboard from "../components/Dashboard";
import Slideshow from "../components/Slideshow";
import nic from "../assets/images/nic.png";
import gov from "../assets/images/mygov-india.png"
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200">
      <main className="px-4 py-6">
        <Slideshow/>
       <Intro /> 
       <Dashboard />
        <div className="flex justify-center mt-8">
          <Link to="/current-crop">
            <button className="bg-red-700 text-white px-8 py-3 rounded-lg hover:bg-purple-900 transition">
              Predict Your Crop
            </button>
          </Link>
        </div>
<div className="mt-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
  <div className="flex justify-between gap-6 mt-2 px-4">
    <div className="flex-1 p-6 text-center">
      <h2 className="text-lg font-semibold ">Useful Links</h2>
      <p> <span  className="text-blue-900 hover:underline">Profile</span><br></br>
        <span className="text-blue-900 hover:underline">Soil Status</span><br/>
        <span className="text-blue-900 hover:underline">Feedback</span><br/>
        <span className="text-blue-900 hover:underline">Current Crop</span></p>
        <img 
      src={nic} 
      alt="Logo" 
      className="h-40 object-contain" 
    />
    </div>
    <div className="flex-1 shadow-2xl p-6 text-center">
      <h4 className="text-lg font-semibold">Featured</h4>
      <p>cheif officers(COD)<br/>
      link to Us<br/>
      NewsLetter<br/>
      Sitemap</p><br/><br/>
       <img 
      src={gov} 
      alt="Logo" 
      className="h-30 object-contain" 
    />
    </div>
    <div className="flex-1  rounded-lg p-6 text-left">
      <p>This platform is designed, developed, and hosted by <span className="text-blue-600">
        the National Informatics Centre (NIC)</span>,
         Ministry of Electronics & Information Technology , Government of India. The content published
          on data.gov.in is owned by the respective Ministry/State/Department/Organization and licensed
           under the Government Open Data License - India</p>
    </div>
  </div>

</div>

        
      </main>
    </div>
  );
}
