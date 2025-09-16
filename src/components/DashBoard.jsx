import combinedImg from './../assets/images/Server status-cuate.png';
export default function Dashboard() {
  return (
    <div className="w-full h- 50 bg-gray-50 py-8">
      <div className="flex gap-10 items-stretch px-4">
<div className="w-1/3 h-105 bg-blue-100 rounded-lg overflow-hidden">
  <img 
    src={combinedImg} 
    alt="Soil and Weather Overview" 
    className="w-full h-auto object-cover rounded-lg"
    style={{ minHeight: "500px" }}
  />
</div>
        <div className="w-2/3 flex flex-col gap-10">
          
         <section className="bg-white shadow rounded-lg p-6">
  <h3 className="text-black-700 font-bold mb-6 text-xl">Soil Composition (%)</h3>
  <div className="flex gap-6 justify-between">
    <div className="flex flex-col w-1/3 bg-blue-100 rounded-lg p-4">
      <span className="self-start px-3 py-1 text-sm font-semibold rounded-full bg-red-300 text-red-800 mb-3">
        Nitrogen
      </span>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold">0%</span>
        <input 
          type="range" min="0" max="100" value="70" readOnly 
          className="flex-grow accent-blue-500" 
        />
        <span className="text-xs font-semibold">70%</span>
      </div>
    </div>
    <div className="flex flex-col w-1/3 bg-blue-100 rounded-lg p-4">
      <span className="self-start px-3 py-1 text-sm font-semibold rounded-full bg-red-300 text-red-800 mb-3">
        Phosphorous
      </span>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold">0%</span>
        <input 
          type="range" min="0" max="100" value="60" readOnly 
          className="flex-grow accent-blue-500" 
        />
        <span className="text-xs font-semibold">60%</span>
      </div>
    </div>
    <div className="flex flex-col w-1/3 bg-blue-100 rounded-lg p-4">
      <span className="self-start px-3 py-1 text-sm font-semibold rounded-full bg-red-300 text-red-800 mb-3">
        Potassium
      </span>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold">0%</span>
        <input 
          type="range" min="0" max="100" value="50" readOnly 
          className="flex-grow accent-blue-500" 
        />
        <span className="text-xs font-semibold">50%</span>
      </div>
    </div>

  </div>
</section>

          
          <section className="bg-white shadow rounded-lg p-6">
  <h3 className="text-black-700 font-bold mb-6 text-xl">Weather Condition (%)</h3>
  <div className="flex gap-6 justify-between">
    <div className="flex flex-col w-1/3 bg-blue-100 rounded-lg p-4">
      <span className="self-start px-3 py-1 text-sm font-semibold rounded-full bg-red-300 text-red-800 mb-3">
        Temperature
      </span>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold">0%</span>
        <input 
          type="range" min="0" max="100" value="80" readOnly 
          className="flex-grow accent-blue-500" 
        />
        <span className="text-xs font-semibold">80%</span>
      </div>
    </div>
    <div className="flex flex-col w-1/3 bg-blue-100 rounded-lg p-4">
      <span className="self-start px-3 py-1 text-sm font-semibold rounded-full bg-red-300 text-red-800 mb-3">
        pH
      </span>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold">0%</span>
        <input 
          type="range" min="0" max="100" value="55" readOnly 
          className="flex-grow accent-blue-500" 
        />
        <span className="text-xs font-semibold">55%</span>
      </div>
    </div>
    <div className="flex flex-col w-1/3 bg-blue-100 rounded-lg p-4">
      <span className="self-start px-3 py-1 text-sm font-semibold rounded-full bg-red-300 text-red-800 mb-3">
        Humidity
      </span>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold">0%</span>
        <input 
          type="range" min="0" max="100" value="65" readOnly 
          className="flex-grow accent-blue-500" 
        />
        <span className="text-xs font-semibold">65%</span>
      </div>
    </div>

  </div>
</section>
        </div>
      </div>
    </div>
  );
}
