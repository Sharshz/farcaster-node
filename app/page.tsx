'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Cpu, 
  Database, 
  Network, 
  Terminal as TerminalIcon,
  Zap,
  Globe,
  Lock,
  LayoutDashboard,
  Users,
  Settings,
  ShieldCheck,
  RefreshCcw,
  BarChart3,
  Server,
  Key,
  HardDrive,
  Save,
  ChevronRight
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings'>('dashboard');
  const [logs, setLogs] = useState<string[]>([]);
  const [nodeStatus, setNodeStatus] = useState<'idle' | 'syncing' | 'active'>('idle');
  const [uptime, setUptime] = useState(0);

  // Settings State
  const [settings, setSettings] = useState({
    network: 'mainnet',
    storagePath: '/opt/farcaster/data',
    syncCasts: true,
    syncReactions: true,
    syncProfiles: false,
    neynarApiKey: '••••••••••••••••',
    hubbleEndpoint: 'https://hubble.farcaster.xyz:2283'
  });

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-20), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleSaveSettings = () => {
    addLog('System configuration updated. Reloading services...');
    setNodeStatus('syncing');
    setTimeout(() => {
      setNodeStatus('active');
      addLog('Node restarted with new configurations.');
    }, 2000);
  };

  useEffect(() => {
    const init = async () => {
      addLog('Node starting sequence engaged...');
      if (typeof window !== 'undefined') {
        try {
          await sdk.actions.ready();
          addLog('SDK tunnel established.');
          const context = await sdk.context;
          if (context) {
            addLog(`Authorized: ${context.user?.displayName || 'Observer'}`);
          }
        } catch (e) {
          addLog('SDK connection bypass (local mode)');
        }
      }
      
      setNodeStatus('syncing');
      const timer = setTimeout(() => {
        setNodeStatus('active');
        addLog('Synchronization finalized. Network connection healthy.');
      }, 3000);
      return () => clearTimeout(timer);
    };

    init();

    const interval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">PulseNode</span>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all ${activeTab === 'dashboard' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
          >
            <LayoutDashboard size={18} className={activeTab === 'dashboard' ? 'text-indigo-400' : ''} />
            <span className="text-sm font-medium">Dashboard</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-md transition-all">
            <Users size={18} />
            <span className="text-sm font-medium">Peers</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-md transition-all">
            <BarChart3 size={18} />
            <span className="text-sm font-medium">Metrics</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all ${activeTab === 'settings' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
          >
            <Settings size={18} className={activeTab === 'settings' ? 'text-indigo-400' : ''} />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </nav>

        <div className="p-6 mt-auto border-t border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${nodeStatus === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-slate-500'}`} />
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
              {nodeStatus === 'active' ? 'Node Active' : 'Initializing'}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono text-[8px]">ID: 0xPULSE...NODE</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header Header Dynamic */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-slate-800">
              {activeTab === 'dashboard' ? 'Operational Overview' : 'Node Configuration'}
            </h1>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest flex items-center gap-1">
              hub-prod-central-1 <span className="w-1 h-1 bg-slate-300 rounded-full"></span> {activeTab === 'dashboard' ? 'Mainnet_Node' : 'System_Settings'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
              <span className="text-xs font-medium text-slate-600 uppercase tracking-tighter">v2.4.0</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="text-xs font-medium text-slate-600">Synced</span>
            </div>
            {activeTab === 'dashboard' ? (
              <button 
                onClick={() => addLog('Remote refresh triggered...')}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-indigo-700 transition-all active:scale-95"
              >
                <RefreshCcw size={16} />
                Re-sync
              </button>
            ) : (
              <button 
                onClick={handleSaveSettings}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-emerald-700 transition-all active:scale-95"
              >
                <Save size={16} />
                Save Changes
              </button>
            )}
          </div>
        </header>

        <div className="p-8 overflow-y-auto flex-1 bg-slate-50">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' ? (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <StatCard label="Total Peers" value="1,244" trend="+12 last hr" icon={Network} />
                  <StatCard label="MSG / Sec" value="84.2" detail="14ms latency" icon={Zap} />
                  <StatCard label="Storage" value="64%" progress={64} icon={Database} />
                  <StatCard label="Uptime" value={`${Math.floor(uptime/60)}m ${uptime%60}s`} healthy icon={Activity} />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col min-h-[400px]">
                    <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                      <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Globe className="text-indigo-500" size={18} />
                        Network Sync status
                      </h3>
                      <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded uppercase font-mono tracking-widest animate-pulse">Live</span>
                    </div>
                    <div className="p-6 flex-1 space-y-6">
                      <SyncItem label="Cast Messages Sync" current={48122094} total={48122094} color="bg-emerald-500" />
                      <SyncItem label="Reaction Delta Sync" current={112042391} total={112042391} color="bg-emerald-500" />
                      <SyncItem label="Profile Data Backfill" current={1204882} total={1210000} color="bg-indigo-500" />
                      
                      <div className="pt-4 mt-4 border-t border-slate-50">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Ingress Activity Stream</h4>
                        <div className="space-y-2">
                          {[...Array(3)].map((_, i) => (
                            <div key={`stream-item-${i}`} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 group">
                              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-slate-200 text-slate-400">
                                <Database size={12} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                  <p className="text-[10px] font-bold text-slate-700 truncate">SYNC_BLOCK_0x{Math.abs(8952-i)}...</p>
                                  <span className="text-[8px] font-mono text-slate-400 uppercase">T-{i*4}s</span>
                                </div>
                                <p className="text-[9px] text-slate-500 truncate font-sans">Layer-2 Base tunnel consensus verified at edge node.</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 h-full">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
                      <div className="p-5 border-b border-slate-100">
                        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                          <ShieldCheck className="text-emerald-500" size={18} />
                          Hardware Health
                        </h3>
                      </div>
                      <div className="p-6 space-y-4">
                        <HealthIndicator label="CPU Load" percent={18} status="8 cores active" color="border-emerald-500" />
                        <HealthIndicator label="Memory" percent={68} status="22GB / 32GB" color="border-amber-400" />
                        <HealthIndicator label="I/O Wait" percent={12} status="NVMe Storage" color="border-indigo-500" />
                      </div>
                    </div>

                    <div className="flex-1 bg-slate-900 rounded-xl overflow-hidden shadow-xl flex flex-col border border-slate-800 min-h-[250px]">
                      <div className="p-3 bg-slate-800/50 flex items-center justify-between border-b border-white/5">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <TerminalIcon size={12} />
                          Terminal_Output
                        </div>
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
                        </div>
                      </div>
                      <div className="p-4 flex-1 font-mono text-[9px] text-slate-300 space-y-1 overflow-y-auto custom-scrollbar">
                        {logs.map((log, i) => (
                          <div key={`log-${i}`} className="flex gap-2">
                            <span className="text-indigo-400 font-bold opacity-50 select-none">»</span>
                            <span className="opacity-90 leading-relaxed font-mono">{log}</span>
                          </div>
                        ))}
                        <div className="w-1 h-3 bg-indigo-500/80 mt-1 inline-block animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="max-w-4xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Settings Sidebar - Internal */}
                  <div className="md:col-span-1 space-y-2">
                    <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-indigo-200 text-indigo-700 shadow-sm transition-all">
                      <div className="flex items-center gap-3">
                        <Server size={18} />
                        <span className="text-sm font-semibold">General Node</span>
                      </div>
                      <ChevronRight size={14} />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white text-slate-500 hover:text-slate-900 transition-all">
                      <div className="flex items-center gap-3">
                        <Key size={18} />
                        <span className="text-sm font-semibold">API Credentials</span>
                      </div>
                      <ChevronRight size={14} />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white text-slate-500 hover:text-slate-900 transition-all">
                      <div className="flex items-center gap-3">
                        <Network size={18} />
                        <span className="text-sm font-semibold">RPC Endpoints</span>
                      </div>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  {/* Settings Form Content */}
                  <div className="md:col-span-2 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                      <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-2">
                        <Server size={16} className="text-indigo-500" />
                        Network_Environment
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Selected Network</label>
                          <select 
                            value={settings.network}
                            onChange={(e) => setSettings({...settings, network: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          >
                            <option value="mainnet">Farcaster Mainnet (Hubble)</option>
                            <option value="testnet">Farcaster Testnet</option>
                            <option value="devnet">Private Devnode</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                            Storage Backend Path
                            <HardDrive size={12} />
                          </label>
                          <input 
                            type="text" 
                            value={settings.storagePath}
                            onChange={(e) => setSettings({...settings, storagePath: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                      <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-2">
                        <Database size={16} className="text-emerald-500" />
                        Synchronization_Scope
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <SyncToggle 
                          label="Casts & Messages" 
                          active={settings.syncCasts} 
                          onChange={(v) => setSettings({...settings, syncCasts: v})} 
                        />
                        <SyncToggle 
                          label="Reactions & Likes" 
                          active={settings.syncReactions} 
                          onChange={(v) => setSettings({...settings, syncReactions: v})} 
                        />
                        <SyncToggle 
                          label="Full Profile Backfill" 
                          active={settings.syncProfiles} 
                          onChange={(v) => setSettings({...settings, syncProfiles: v})} 
                        />
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                      <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-2">
                        <Key size={16} className="text-amber-500" />
                        API_Security
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Neynar API Key</label>
                          <div className="relative">
                            <input 
                              type="password" 
                              value={settings.neynarApiKey}
                              readOnly
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-mono pr-12 focus:ring-2 focus:ring-indigo-500 outline-none transition-all opacity-50 cursor-not-allowed"
                            />
                            <Lock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 underline decoration-indigo-200">Hubble RPC Endpoint</label>
                          <input 
                            type="text" 
                            value={settings.hubbleEndpoint}
                            onChange={(e) => setSettings({...settings, hubbleEndpoint: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      `}</style>
    </div>
  );
}

function StatCard({ label, value, trend, detail, progress, healthy, icon: Icon }: any) {
  return (
    <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm hover:ring-1 hover:ring-indigo-100 transition-all group">
      <div className="flex justify-between items-start mb-1">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">{label}</p>
        <Icon size={12} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
      </div>
      <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
      {trend && (
        <div className="mt-1 flex items-center text-[9px] text-emerald-600 font-bold uppercase tracking-wider">
          <span>{trend}</span>
        </div>
      )}
      {detail && (
        <div className="mt-1 text-[9px] text-slate-400 font-medium whitespace-nowrap">
          {detail}
        </div>
      )}
      {progress !== undefined && (
        <div className="mt-3 w-full bg-slate-100 rounded-full h-1 overflow-hidden">
          <div 
            style={{ width: `${progress}%` }}
            className={`h-full transition-all duration-500 ${progress > 80 ? 'bg-amber-500' : 'bg-indigo-500'}`}
          />
        </div>
      )}
      {healthy && (
        <div className="mt-1 flex items-center text-[9px] text-emerald-600 font-bold uppercase tracking-wider">
           Stable Pulse
        </div>
      )}
    </div>
  );
}

function SyncItem({ label, current, total, color }: any) {
  const percent = (current / total) * 100;
  return (
    <div className="group">
      <div className="flex justify-between items-end mb-1.5">
        <span className="text-[11px] font-bold text-slate-700 tracking-tight">{label}</span>
        <span className="text-[9px] font-mono text-slate-400">
          {(percent).toFixed(1)}%
        </span>
      </div>
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div 
          style={{ width: `${percent}%` }}
          className={`${color} h-full transition-all duration-1000`}
        />
      </div>
    </div>
  );
}

function HealthIndicator({ label, percent, status, color }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full border-2 ${color} flex items-center justify-center shrink-0 relative bg-white`}>
        <span className="text-[9px] font-bold text-slate-800">{percent}%</span>
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold text-slate-800 truncate">{label}</p>
        <p className="text-[9px] text-slate-400 truncate uppercase font-semibold">{status}</p>
      </div>
    </div>
  );
}

function SyncToggle({ label, active, onChange }: { label: string, active: boolean, onChange: (v: boolean) => void }) {
  return (
    <button 
      onClick={() => onChange(!active)}
      className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-all group"
    >
      <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{label}</span>
      <div className={`w-10 h-5 rounded-full relative transition-all ${active ? 'bg-indigo-600' : 'bg-slate-300'}`}>
        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${active ? 'left-6' : 'left-1'}`} />
      </div>
    </button>
  );
}
