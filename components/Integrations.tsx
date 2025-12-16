
import React, { useState } from 'react';
import { MOCK_CONNECTORS } from '../constants';
import { Connector } from '../types';
import { 
  Database, FileSpreadsheet, Ticket, ShoppingBag, Share2, Landmark, 
  CheckCircle2, AlertCircle, Plus, Upload, Server, RefreshCw, X, Lock, 
  Activity, Cpu, HardDrive, Network
} from 'lucide-react';
import NiFiEditor from './NiFiEditor';

interface IntegrationsProps {
  userRole: 'EXECUTIVE' | 'SCIENTIST';
}

const Integrations: React.FC<IntegrationsProps> = ({ userRole }) => {
  const [connectors, setConnectors] = useState<Connector[]>(MOCK_CONNECTORS);
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showNiFi, setShowNiFi] = useState(false);
  const [niFiConnectorName, setNiFiConnectorName] = useState('');
  
  // Cloudera Tabs
  const [activeTab, setActiveTab] = useState<'CDP' | 'CDF'>('CDP');

  const getIcon = (iconName: string, size = 24) => {
    switch(iconName) {
      case 'Database': return <Database size={size} />;
      case 'FileSpreadsheet': return <FileSpreadsheet size={size} />;
      case 'Ticket': return <Ticket size={size} />;
      case 'ShoppingBag': return <ShoppingBag size={size} />;
      case 'Share2': return <Share2 size={size} />;
      case 'Landmark': return <Landmark size={size} />;
      default: return <Server size={size} />;
    }
  };

  const handleConnectClick = (connector: Connector) => {
    setSelectedConnector(connector);
    setIsModalOpen(true);
  };

  const handleSimulateConnection = () => {
    if (!selectedConnector) return;

    setIsSimulating(true);
    setTimeout(() => {
      setConnectors(prev => prev.map(c => 
        c.id === selectedConnector.id 
          ? { ...c, status: 'Connected', lastSync: 'Agora mesmo' } 
          : c
      ));
      setIsSimulating(false);
      setIsModalOpen(false);
      setSelectedConnector(null);
    }, 2000);
  };

  const openNiFi = (name: string) => {
    setNiFiConnectorName(name);
    setShowNiFi(true);
  };

  if (showNiFi) {
    return <NiFiEditor connectorName={niFiConnectorName} onClose={() => setShowNiFi(false)} />;
  }

  // --- CLOUDERA INTERFACE FOR DATA SCIENTISTS ---
  if (userRole === 'SCIENTIST') {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Cloudera Branded Header */}
        <div className="bg-[#1D3241] p-6 rounded-t-xl text-white flex justify-between items-center shadow-md">
          <div className="flex items-center gap-4">
             <div className="flex flex-col">
                <h2 className="text-2xl font-light tracking-wide">CLOUDERA <span className="font-bold text-[#FF6B00]">Data Platform</span></h2>
                <p className="text-gray-400 text-xs tracking-wider uppercase">Enterprise Data Cloud for Vasco da Gama</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('CDP')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'CDP' ? 'bg-[#FF6B00] text-white' : 'hover:bg-white/10 text-gray-300'}`}
            >
              Data Hub (CDP)
            </button>
            <button 
               onClick={() => setActiveTab('CDF')}
               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'CDF' ? 'bg-[#FF6B00] text-white' : 'hover:bg-white/10 text-gray-300'}`}
            >
              Data Flow (CDF)
            </button>
          </div>
        </div>

        {/* CDP Dashboard View */}
        {activeTab === 'CDP' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-1 md:col-span-3">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Activity className="text-green-500" /> System Health
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <p className="text-xs text-green-700 uppercase font-bold">Services</p>
                  <p className="text-2xl font-bold text-gray-800">24/24</p>
                  <p className="text-xs text-gray-500">Running</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                   <p className="text-xs text-blue-700 uppercase font-bold">Data Lake</p>
                   <p className="text-2xl font-bold text-gray-800">4.2 TB</p>
                   <p className="text-xs text-gray-500">S3 / HDFS</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                   <p className="text-xs text-purple-700 uppercase font-bold">Queries</p>
                   <p className="text-2xl font-bold text-gray-800">1.2k</p>
                   <p className="text-xs text-gray-500">Last 24h</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                   <p className="text-xs text-orange-700 uppercase font-bold">Alerts</p>
                   <p className="text-2xl font-bold text-gray-800">0</p>
                   <p className="text-xs text-gray-500">Critical</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-1 md:col-span-2">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Cpu className="text-gray-600" /> Compute Resources
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1"><span>CPU Usage (Spark/Hive)</span> <span>65%</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-[#1D3241] h-2 rounded-full" style={{width: '65%'}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span>Memory Allocation</span> <span>42%</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-[#FF6B00] h-2 rounded-full" style={{width: '42%'}}></div></div>
                </div>
                 <div>
                  <div className="flex justify-between text-sm mb-1"><span>Disk I/O</span> <span>28%</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{width: '28%'}}></div></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <HardDrive className="text-gray-600" /> Storage Zones
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded">
                  <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Raw Zone</span>
                  <span className="font-mono text-gray-600">2.1 TB</span>
                </li>
                <li className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded">
                  <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Trusted</span>
                   <span className="font-mono text-gray-600">1.8 TB</span>
                </li>
                <li className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded">
                  <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Refined</span>
                   <span className="font-mono text-gray-600">300 GB</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* CDF (Flow) View - Reuses the Connector Logic but styled for CDF */}
        {activeTab === 'CDF' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Network className="text-brand-blue" />
                <div>
                  <h4 className="font-bold text-brand-blue">Cloudera Data Flow (NiFi)</h4>
                  <p className="text-sm text-gray-600">Managing real-time data ingestion pipelines from external sources.</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded text-sm font-medium hover:bg-gray-50">View Global Canvas</button>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {connectors.map(connector => (
                  <div key={connector.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#FF6B00]"></div>
                    <div>
                      <div className="flex items-start justify-between mb-4 pl-2">
                        <div className="p-2 bg-gray-100 rounded text-gray-600">
                          {getIcon(connector.icon)}
                        </div>
                        <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          connector.status === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {connector.status === 'Connected' ? 'Running' : 'Stopped'}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 pl-2">{connector.name}</h3>
                      <p className="text-xs text-gray-500 pl-2 mt-1 font-mono">Process Group: {connector.id}_v2.flow</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-50 pl-2">
                       {connector.status === 'Connected' ? (
                          <button 
                            onClick={() => openNiFi(connector.name)}
                            className="w-full py-2 bg-[#1D3241] text-white rounded text-sm hover:bg-[#2a4558] transition-colors flex items-center justify-center gap-2"
                          >
                            <Server size={14} /> Open Flow Canvas
                          </button>
                       ) : (
                          <button 
                             onClick={() => handleConnectClick(connector)}
                             className="w-full py-2 border border-gray-300 text-gray-600 rounded text-sm hover:bg-gray-50 transition-colors"
                          >
                            Configure Processor
                          </button>
                       )}
                    </div>
                  </div>
                ))}
                
                {/* New Processor Button */}
                <button className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center hover:border-[#FF6B00] hover:bg-orange-50 transition-colors min-h-[200px]">
                    <Plus className="text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-600">Create New Flow</span>
                </button>
             </div>
          </div>
        )}

         {/* Connection Modal (Reused) */}
        {isModalOpen && selectedConnector && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-lg w-full max-w-md shadow-2xl overflow-hidden border-t-4 border-[#FF6B00]">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  Configuring Processor Group
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                 <div className="bg-gray-100 p-3 rounded text-xs font-mono text-gray-700 mb-4">
                    Target: {selectedConnector.name}<br/>
                    Class: org.apache.nifi.processors.standard.GetHTTP
                 </div>
                 <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Remote URL</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#FF6B00] outline-none text-sm" placeholder="https://..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">FlowFile Name</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#FF6B00] outline-none text-sm" placeholder="ingest_data_v1" />
                    </div>
                  </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 text-sm font-medium">Cancel</button>
                <button 
                  onClick={handleSimulateConnection}
                  disabled={isSimulating}
                  className="px-4 py-2 bg-[#FF6B00] text-white rounded text-sm font-medium hover:bg-orange-600 flex items-center gap-2"
                >
                  {isSimulating ? <RefreshCw className="animate-spin" size={14} /> : 'Deploy Flow'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- STANDARD VIEW FOR EXECUTIVES (Previous Logic) ---
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Server className="text-brand-orange" />
              Camada de Ingestão & Coleta
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Visualização de conectores ativos.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3 mb-6">
          <Lock className="text-brand-blue mt-0.5" size={18} />
          <div>
            <h4 className="font-bold text-brand-blue text-sm">Modo de Visualização Executiva</h4>
            <p className="text-sm text-gray-600">
              Para configurações avançadas e acesso ao Cloudera Data Platform, acesse como Cientista de Dados.
            </p>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connectors.map(connector => (
          <div key={connector.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between opacity-75">
             <div>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gray-100 text-gray-600`}>
                  {getIcon(connector.icon)}
                </div>
                 <div className={`px-2 py-1 rounded text-xs font-medium bg-gray-50 text-gray-500 border border-gray-200`}>
                  {connector.status === 'Connected' ? 'Conectado' : 'Desconectado'}
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{connector.name}</h3>
              <p className="text-sm text-gray-500">{connector.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Integrations;
