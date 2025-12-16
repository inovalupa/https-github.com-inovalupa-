
import React, { useState } from 'react';
import { Play, Square, Settings, ArrowRight, RefreshCw, X, FileJson, Database, Server, Filter } from 'lucide-react';

interface NiFiEditorProps {
  onClose: () => void;
  connectorName: string;
}

const NiFiProcessor = ({ 
  name, 
  type, 
  status, 
  stats, 
  icon: Icon,
  x, 
  y 
}: { 
  name: string; 
  type: string; 
  status: 'RUNNING' | 'STOPPED' | 'DISABLED'; 
  stats: { in: string, out: string, tasks: string };
  icon: any;
  x: number;
  y: number;
}) => (
  <div 
    className="absolute w-64 bg-white border border-gray-400 shadow-lg rounded-sm cursor-move group"
    style={{ left: x, top: y }}
  >
    {/* Header */}
    <div className="bg-gray-100 p-2 flex items-center justify-between border-b border-gray-300 h-10">
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-gray-600" />
        <span className="font-bold text-xs text-gray-800 truncate max-w-[120px]">{name}</span>
      </div>
      <div className="flex gap-1">
        {status === 'RUNNING' ? (
           <div className="bg-green-500 p-1 rounded-sm"><Play size={10} className="text-white fill-current" /></div>
        ) : (
           <div className="bg-red-500 p-1 rounded-sm"><Square size={10} className="text-white fill-current" /></div>
        )}
      </div>
    </div>
    
    {/* Body */}
    <div className="p-2 text-[10px] font-mono bg-[#fdfdfd]">
      <div className="text-gray-500 mb-1">{type}</div>
      <div className="grid grid-cols-2 gap-1 mt-2">
        <div className="text-gray-600">In: <span className="font-bold text-black">{stats.in}</span></div>
        <div className="text-gray-600">Out: <span className="font-bold text-black">{stats.out}</span></div>
        <div className="text-gray-600 col-span-2">Tasks: <span className="font-bold text-black">{stats.tasks}</span></div>
      </div>
    </div>

    {/* Connection Point */}
    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-green-500 rounded-full border border-white cursor-crosshair hover:scale-125 transition-transform"></div>
  </div>
);

const ConnectionLine = ({ x1, y1, x2, y2, label }: { x1: number, y1: number, x2: number, y2: number, label?: string }) => {
  // Simple bezier curve calculation
  const midX = (x1 + x2) / 2;
  const path = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;

  return (
    <g>
      <path d={path} stroke="#9CA3AF" strokeWidth="2" fill="none" />
      <path d={path} stroke="transparent" strokeWidth="10" fill="none" className="hover:stroke-blue-200 cursor-pointer" />
      <polygon points={`${x2},${y2} ${x2-6},${y2-4} ${x2-6},${y2+4}`} fill="#9CA3AF" />
      {label && (
        <rect x={midX - 25} y={(y1+y2)/2 - 10} width="50" height="20" rx="4" fill="white" stroke="#E5E7EB" />
      )}
      {label && (
        <text x={midX} y={(y1+y2)/2 + 4} textAnchor="middle" fontSize="10" fill="#4B5563">{label}</text>
      )}
    </g>
  );
};

const NiFiEditor: React.FC<NiFiEditorProps> = ({ onClose, connectorName }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const toggleProcessor = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      setLogs(prev => [...prev, `[INFO] Starting FlowFile processor for ${connectorName}...`, `[INFO] Connected to Source API`, `[INFO] Transformed 450 records`, `[SUCCESS] Loaded into Data Lake`]);
    } else {
      setLogs(prev => [...prev, `[INFO] Stopping processor group...`]);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/90 z-50 flex flex-col animate-fade-in">
      {/* NiFi Top Bar */}
      <div className="bg-gray-100 border-b border-gray-300 px-4 py-2 flex items-center justify-between h-14">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Apache_NiFi_logo.svg/1200px-Apache_NiFi_logo.svg.png" alt="NiFi" className="h-8" />
            <span className="text-gray-400 text-xl font-light">|</span>
            <span className="font-bold text-gray-700">{connectorName} Flow</span>
          </div>
          
          <div className="flex items-center gap-1 bg-white border border-gray-300 rounded shadow-sm px-1 py-1 ml-6">
            <button 
              onClick={toggleProcessor}
              className={`p-1 rounded ${isRunning ? 'text-gray-400' : 'text-green-600 hover:bg-green-50'}`} 
              disabled={isRunning}
              title="Start"
            >
              <Play size={18} fill="currentColor" />
            </button>
            <button 
              onClick={toggleProcessor}
              className={`p-1 rounded ${!isRunning ? 'text-gray-400' : 'text-red-600 hover:bg-red-50'}`}
              disabled={!isRunning} 
              title="Stop"
            >
              <Square size={18} fill="currentColor" />
            </button>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <button className="p-1 text-gray-600 hover:bg-gray-100 rounded" title="Configure"><Settings size={18} /></button>
          </div>
        </div>

        <button onClick={onClose} className="text-gray-600 hover:text-red-600 p-2">
          <X size={24} />
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-[#f4f4f4] relative overflow-hidden" 
           style={{ backgroundImage: 'radial-gradient(#ddd 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <ConnectionLine x1={150+256/2} y1={100+110} x2={500+256/2} y2={100} label="Success" />
          <ConnectionLine x1={500+256/2} y1={100+110} x2={500+256/2} y2={350} label="SQL Ready" />
        </svg>

        {/* Processor 1: Ingest */}
        <NiFiProcessor 
          x={150} y={100} 
          name={`Get${connectorName.replace(/\s/g, '')}Data`} 
          type="org.apache.nifi.processors.standard.GetHTTP"
          status={isRunning ? 'RUNNING' : 'STOPPED'}
          icon={Server}
          stats={isRunning ? { in: '1.2 MB', out: '1.2 MB', tasks: '1' } : { in: '0', out: '0', tasks: '0' }}
        />

        {/* Processor 2: Transform */}
        <NiFiProcessor 
          x={500} y={100} 
          name="ConvertJSONtoSQL" 
          type="org.apache.nifi.processors.standard.ConvertJSONToSQL"
          status={isRunning ? 'RUNNING' : 'STOPPED'}
          icon={FileJson}
          stats={isRunning ? { in: '450 rec', out: '450 rec', tasks: '45' } : { in: '0', out: '0', tasks: '0' }}
        />

         {/* Processor 3: Load */}
         <NiFiProcessor 
          x={500} y={350} 
          name="PutDatabaseRecord" 
          type="org.apache.nifi.processors.standard.PutDatabaseRecord"
          status={isRunning ? 'RUNNING' : 'STOPPED'}
          icon={Database}
          stats={isRunning ? { in: '450 rec', out: 'Success', tasks: '1' } : { in: '0', out: '0', tasks: '0' }}
        />

      </div>

      {/* Footer Logs */}
      <div className="h-32 bg-white border-t border-gray-300 p-2 font-mono text-xs overflow-y-auto">
        <div className="text-gray-500 font-bold mb-1 border-b border-gray-100 pb-1">Controller Status History</div>
        {logs.length === 0 && <span className="text-gray-400 italic">No events generated. Click Play to start the flow.</span>}
        {logs.map((log, i) => (
          <div key={i} className="mb-0.5">
            <span className="text-gray-400 mr-2">{new Date().toLocaleTimeString()}</span>
            <span className={log.includes('SUCCESS') ? 'text-green-600' : log.includes('Stopping') ? 'text-red-600' : 'text-blue-600'}>
              {log}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NiFiEditor;
