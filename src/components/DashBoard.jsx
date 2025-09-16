export default function Dashboard() {
  return (
    <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto my-8">
      <div className="bg-white shadow rounded-lg p-6 w-72">
        <h3 className="text-green-700 font-bold mb-4">Soil Composition (%)</h3>
        <div>
          <p className="mb-1 font-semibold">Nitrogen</p>
          <div className="h-5 bg-green-500 rounded" style={{ width: "70%" }}></div>
        </div>
        <div className="mt-4">
          <p className="mb-1 font-semibold">Phosphorous</p>
          <div className="h-5 bg-orange-400 rounded" style={{ width: "60%" }}></div>
        </div>
        <div className="mt-4">
          <p className="mb-1 font-semibold">Potassium</p>
          <div className="h-5 bg-blue-400 rounded" style={{ width: "50%" }}></div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 w-72">
        <h3 className="text-green-700 font-bold mb-4">Weather Condition</h3>
        <div>
          <p className="mb-1 font-semibold">Temperature</p>
          <div className="h-5 bg-red-400 rounded" style={{ width: "80%" }}></div>
        </div>
        <div className="mt-4">
          <p className="mb-1 font-semibold">pH</p>
          <div className="h-5 bg-green-300 rounded" style={{ width: "55%" }}></div>
        </div>
        <div className="mt-4">
          <p className="mb-1 font-semibold">Humidity</p>
          <div className="h-5 bg-blue-300 rounded" style={{ width: "65%" }}></div>
        </div>
      </div>

      <div className="flex items-center w-full justify-center mt-6">
        <a href="/current-crop">
          <button className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-600 transition">
            View Current Crop Details
          </button>
        </a>
      </div>
    </div>
  );
}
