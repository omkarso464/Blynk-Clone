import React, { useState, useEffect } from 'react';
import { ArrowLeft, Wrench, Bell, Info } from 'lucide-react';

// Reusable SVG Gauge Component
const Gauge = ({ 
  title, 
  value, 
  min, 
  max, 
  unit, 
  color, 
  trackColor = "#333336",
  formatValue = (v) => v.toFixed(2),
  sizeClass = "w-36 h-36",
  valueClass = "text-2xl",
  unitClass = "text-sm ml-0.5 mt-0.5"
}) => {
  const radius = 40;
  const circumference = 188.5; 
  const percent = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const visualPercent = Math.max(0.001, percent);
  const strokeDashoffset = circumference - (visualPercent * circumference);

  return (
    <div className="flex flex-col items-center justify-center p-2 relative">
      <span className="text-gray-300 text-[13px] font-medium mb-4">{title}</span>
      
      <div className={`relative ${sizeClass}`}>
        <svg className="w-full h-full transform" viewBox="0 0 100 100">
          <path
            d="M 21.72 78.28 A 40 40 0 1 1 78.28 78.28"
            fill="none"
            stroke={trackColor}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M 21.72 78.28 A 40 40 0 1 1 78.28 78.28"
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pb-2">
          <div style={{ color: color }} className={`${valueClass} font-semibold tracking-wide flex items-start`}>
            {formatValue(value)}
            <span className={unitClass}>{unit}</span>
          </div>
        </div>

        <div className="absolute -bottom-1 left-2 text-[#888] text-xs font-medium">{min}</div>
        <div className="absolute -bottom-1 right-2 text-[#888] text-xs font-medium">{max}</div>
      </div>
    </div>
  );
};

export default function App() {
  const [stats, setStats] = useState({
    voltage: 3.81,
    current: 11.79,
    temperature: 35.0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        const newVol = prev.voltage + (Math.random() - 0.5) * 0.06;
        const newCur = prev.current + (Math.random() - 0.5) * 0.4;
        const newTemp = prev.temperature + (Math.random() - 0.5) * 0.8;

        return {
          voltage: Math.max(0, Math.min(25, newVol)),
          current: Math.max(-30, Math.min(30, newCur)),
          temperature: Math.max(0, Math.min(100, newTemp))
        };
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#121214] flex justify-center font-sans selection:bg-gray-700">
      <div className="w-full max-w-md bg-[#222226] shadow-2xl overflow-hidden flex flex-col relative border-x border-gray-800/50">
        
        <header className="flex items-center justify-between px-5 pt-10 pb-6">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex items-center justify-between">
              <button className="text-gray-300 hover:text-white transition-colors">
                <ArrowLeft strokeWidth={1.5} size={26} />
              </button>
              
              <div className="flex items-center gap-4">
                <button className="bg-[#c8f046] p-1.5 rounded flex items-center justify-center hover:opacity-90 transition-opacity">
                  <Wrench size={20} color="#111" strokeWidth={2} />
                </button>
                <button className="text-gray-300 hover:text-white transition-colors">
                  <Bell size={22} strokeWidth={1.5} />
                </button>
                <button className="text-gray-300 hover:text-white transition-colors">
                  <Info size={22} strokeWidth={1.5} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <h1 className="text-white text-2xl font-bold tracking-tight">BMS System</h1>
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-2 py-4 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-x-2">
            <Gauge 
              title="Voltage" 
              value={stats.voltage} 
              min={0} max={25} unit="V" 
              color="#fb923c"
            />
            
            <Gauge 
              title="Current" 
              value={stats.current} 
              min={-30} max={30} unit="A" 
              color="#22c55e"
            />
          </div>
          
          <div className="flex justify-center mt-4 pb-12">
            <Gauge 
              title="Temperature" 
              value={stats.temperature} 
              min={0} max={100} unit="°C" 
              color="#ef4444"
              formatValue={(v) => Math.round(v)}
              sizeClass="w-56 h-56"
              valueClass="text-5xl"
              unitClass="text-xl ml-1 mt-1.5"
            />
          </div>
        </main>

      </div>
    </div>
  );
}
