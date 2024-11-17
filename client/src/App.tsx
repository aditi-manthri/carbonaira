import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './index.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const App = () => {
  const [formData, setFormData] = useState({
    electricityUsage: '',
    gasUsage: '',
    oilUsage: '',
    shortFlight: '',
    longFlight: '',
    dietaryChoice: '',
    aluminiumChoice: '',
    paperChoice: '',
  });

  const [result, setResult] = useState<any>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://carbonaira-server.vercel.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      setResult(data);
    } catch (err) {
      console.log(err);
    }
  };

  const years =  [1750, 1760, 1770, 1780, 1790, 1800, 1810, 1820, 1830, 1840, 1850, 1860, 1870, 1880, 1890, 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2030, 2040, 2050, 2060, 2070, 2080, 2090, 2100];
  const co2Emissions = [0.003, 0.003, 0.003, 0.004, 0.004, 0.008, 0.01, 0.012, 0.015, 0.025, 0.054, 0.093, 0.147, 0.236, 0.354, 0.534, 0.943, 1.63, 2.127, 2.516, 5.914, 9.395, 14.856, 19.435, 22.666, 25.576, 33.346, 34.8, 37.0, 38.0, 38.5, 37.5, 36.0, 34.0, 32.0, 30.0];
  const lineChartData = {
    labels: years,
    datasets: [
      {
        label: 'CO2 Emissions (kg)',
        data: co2Emissions,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.5)',
        borderColor: 'rgba(234, 88, 12,1)',
        pointRadius: 0,
        
      },
    ],
  };

  const lineChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white', 
        },
      },
      y: {
        ticks: {
          color: 'white', 
        },
      },
    },
  };
  return (
    <>
      <div
        className='min-h-screen flex items-center justify-center p-5 flex-col'
        style={{
          background: 'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
        }}
      >
        <div className='flex w-full'>
        <div className="ml-auto w-1/2 rounded-lg">
        <div className="bg-black bg-opacity-30 p-5 w-full max-w-screen-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Your Carbon Footprint</h1>
          <div className='bg-black bg-opacity-40 p-3 w-full max-w-screen-lg rounded-lg'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='flex flex-col space-y-4'>
                <div className='flex items-center space-x-4'>

                  <label className='text-white mb-2 w-1/3'>Electricity Usage (kWh/month)</label>
                  <input
                    type='number'
                    name="electricityUsage"
                    value={formData.electricityUsage}
                    onChange={handleChange}
                    className='border border-gray-800 rounded-lg p-2 w-2/3 bg-black bg-opacity-20 text-white'
                  />
                </div>
                <div className='flex items-center space-x-4'>
                  <label className='text-white mb-2 w-1/3'>Gas Usage (Litres/month)</label>
                  <input
                    type='number'
                    name="gasUsage"
                    value={formData.gasUsage}
                    onChange={handleChange}
                    className='border border-gray-800 rounded-lg p-2 w-2/3 bg-black bg-opacity-20 text-white'
                  />
                </div>
                <div className='flex items-center space-x-4'>
                  <label className='text-white mb-2 w-1/3'>Oil Usage (Litres/month)</label>
                  <input
                    type='number'
                    name="oilUsage"
                    value={formData.oilUsage}
                    onChange={handleChange}
                    className='border border-gray-800 rounded-lg p-2 w-2/3 bg-black bg-opacity-20 text-white'
                  />
                </div>
                <div className='flex items-center space-x-4'>
                  <label className='text-white mb-2 w-1/3'>Short Flights (per year)</label>
                  <input
                    type='number'
                    name="shortFlight"
                    value={formData.shortFlight}
                    onChange={handleChange}
                    className='border border-gray-800 rounded-lg p-2 w-2/3 bg-black bg-opacity-20 text-white'
                  />
                </div>
                <div className='flex items-center space-x-4'>
                  <label className='text-white mb-2 w-1/3'>Long Flights (per year)</label>
                  <input
                    type='number'
                    name="longFlight"
                    value={formData.longFlight}
                    onChange={handleChange}
                    className='border border-gray-800 rounded-lg p-2 w-2/3 bg-black bg-opacity-20 text-white'
                  />
                </div>
                <div className='flex items-center space-x-4'>
                  <label className='text-white mb-2 w-1/3'>Dietary Choice</label>
                  <select
                    name="dietaryChoice"
                    value={formData.dietaryChoice}
                    onChange={handleChange}
                    className='border border-gray-800 rounded-lg p-2 w-2/3 bg-black bg-opacity-20 text-white'
                  >
                    <option className="bg-gray-900" value="" disabled>Select your dietary choice</option>
                    <option className="bg-gray-900" value="Vegan">Vegan</option>
                    <option className="bg-gray-900" value="Vegetarian">Vegetarian</option>
                    <option className="bg-gray-900" value="MeatBased">Meat Based</option>
                  </select>
                </div>
                <div className='flex items-center space-x-4'>
                  <label className='text-white mb-2 w-1/3'>Do you recycle aluminium?</label>
                  <select
                    name="aluminiumChoice"
                    value={formData.aluminiumChoice}
                    onChange={handleChange}
                    className='border border-gray-800 rounded-lg p-2 w-2/3 bg-black bg-opacity-20 text-white'
                  >
                    <option className="bg-gray-900" value="" disabled>Select</option>
                    <option className="bg-gray-900" value="Yes">Yes</option>
                    <option className="bg-gray-900" value="No">No</option>
                  </select>
                </div>
                <div className='flex items-center space-x-4'>
                  <label className='text-white mb-2 w-1/3'>Do you recycle paper?</label>
                  <select
                    name="paperChoice"
                    value={formData.paperChoice}
                    onChange={handleChange}
                    className='border border-gray-800 rounded-lg p-2 w-2/3 bg-black bg-opacity-20 text-white'
                  >
                    <option className="bg-gray-900" value="" disabled>Select</option>
                    <option className="bg-gray-900" value="Yes">Yes</option>
                    <option className="bg-gray-900" value="No">No</option>
                  </select>
                </div>
                <br/>
                <div className='flex flex-col'>
                  <button
                  type="submit"
                  className='bg-orange-500  hover: bg-orange-600 text-white px-4 py-1 rounded-md transition-colors duration-300'>
                    Calculate
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {result && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            onClick={() => setResult(null)}
          >
            <div
              className="bg-black bg-opacity-20 p-8 w-full max-w-screen-lg rounded-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setResult(null)}
                className="absolute top-4 right-4 text-white text-2xl font-bold"
              >
                ×
              </button>

              <h1 className="text-4xl font-bold mb-4 text-white text-center">
                Your Annual Carbon Statistics
              </h1>

              <div className='bg-black bg-opacity-30 p-6 w-full rounded-lg'>
                <p className="text-orange-400 text-2xl font-bold text-center">
                  Compared to the Global Average, your Carbon Footprint is {result?.totalYearlyEmissions.category}
                </p>
                <p className="text-white text-xl p-4 font-bold">
                  Total Yearly Emissions: {result?.totalYearlyEmissions.value} {result?.totalYearlyEmissions.unit}
                </p>
                <p className="text-white text-xl p-4 font-bold">
                  Total Gas Emissions: {result?.totalGasEmissions.value} {result?.totalGasEmissions.unit}
                </p>
                <p className="text-white text-xl p-4 font-bold">
                  Total Oil Emissions: {result?.totalOilEmissions.value} {result?.totalOilEmissions.unit}
                </p>
                <p className="text-white text-xl p-4 font-bold">
                  Total Flight Emissions: {result?.totalFlightEmissions.value} {result?.totalFlightEmissions.unit}
                </p>
                <p className="text-white text-xl p-4 font-bold">
                  Dietary Emissions: {result?.dietaryEmissions.value} {result?.dietaryEmissions.unit}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='w-1/2 ml-auto rounded-lg'>
      <div className="pl-5 flex-1 h-full">
      <div className="bg-black bg-opacity-30 p-5 w-full max-w-screen-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Global CO2 Emissions</h1>
        <div className="pb-1">
          <Line data={lineChartData} options={lineChartOptions}/>
        </div>
        <div className="bg-black bg-opacity-40 p-3 w-full max-w-screen-lg rounded-lg">
          <p className="text-white">
            Carbon emissions stayed low and steady from 1750 until the late 1800s, 
            reflecting minimal industrial impact. Things shifted in the early 20th century
            as industrialization, urban growth, and fossil fuel use kicked in, 
            with emissions climbing fast by mid-century thanks to post-war expansion 
            and population booms. The recent peak shows the strain of unsustainable habits,
            but the dip projected around 2050 hints at potential progress from cleaner 
            energy and global policies like the Paris Agreement. 
            The future isn't set in stone, but reducing your own emissions is a small, 
            meaningful way to make a difference. (Values are in Gigaton CO2/Year)
          </p>
        </div>
        
      </div>  
      </div>  
      </div>
      </div>
      </div>
    </>
  );
};

export default App;