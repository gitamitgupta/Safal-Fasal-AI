
import farmer from './../assets/images/farmer-bro.png'
export default function Intro() {
  return (
    <section className="w-full bg-green-50 rounded-lg p-8 my-6 flex flex-col md:flex-row items-center max-h-[400px]">
      
      <div className="md:w-1/2 w-full pr-6">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-4">Welcome Kishore Ji!</h2>
        <p className="mb-4 text-lg">
          Krishi Mitra is a digital platform for farmers providing real-time data, crop tracking, weather updates, and soil health monitoring.
        </p>
        <p className="mb-6 text-lg">
          It empowers sustainable farming by integrating technology with agricultural expertise to help farmers increase productivity and income.
        </p>
        <button className="bg-blue-700 text-white px-12 py-3 rounded-full hover:bg-green-600 transition">
          Explore
        </button>
      </div>

      <div className="md:w-1/2 w-full mt-6 md:mt-0 flex justify-end">
        <img 
          src={farmer} 
          alt="About Krishi Mitra" 
          className="w-full h-95 max-w-[500px] object-cover rounded-lg "
        />
      </div>
    </section>
  );
}
