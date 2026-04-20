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
  Search,
  LayoutDashboard,
  Users,
  Settings,
  ShieldCheck,
  RefreshCcw,
  BarChart3
} from 'lucide-react';

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [nodeStatus, setNodeStatus] = useState<'idle' | 'syncing' | 'active'>('idle');
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const init = async () => {
      addLog('Node starting sequence engaged...');
      sdk.actions.ready();
      setIsReady(true);
      addLog('SDK tunnel established.');
      
      const context = await sdk.context;
      if (context) {
        addLog(`Authorized: ${context.user?.displayName || 'Observer'}`);
      }
      
      setNodeStatus('syncing');
      setTimeout(() => {
        setNodeStatus('active');
        addLog('Synchronization finalized. Network connection healthy.');
      }, 3000);
    };

    init();

    const interval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-20), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sidebar Navigation - PROFESSIONAL POLISH THEME */}
      <aside className="w-64 bg-slate-900 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">PulseNode</span>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 bg-slate-800 text-white rounded-md transition-all">
            <LayoutDashboard size={18} className="text-indigo-400" />
            <span className="text-sm font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-md transition-all">
            <Users size={18} />
            <span className="text-sm font-medium">Peers</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-md transition-all">
            <BarChart3 size={18} />
            <span className="text-sm font-medium">Metrics</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-md transition-all">
            <Settings size={18} />
            <span className="text-sm font-medium">Settings</span>
          </a>
        </nav>

        <div className="p-6 mt-auto border-t border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <motion.div 
              animate={nodeStatus === 'active' ? { scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`w-2 h-2 rounded-full ${nodeStatus === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-slate-500'}`}
            />
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
              {nodeStatus === 'active' ? 'Node Active' : 'Initializing'}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">ID: 0xPULSE...NODE</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-slate-800">Operational Overview</h1>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest flex items-center gap-1">
              hub-prod-central-1 <span className="w-1 h-1 bg-slate-300 rounded-full"></span> Mainnet_Node
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
              <span className="text-xs font-medium text-slate-600 uppercase tracking-tighter">v2.4.0</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="text-xs font-medium text-slate-600">Synced</span>
            </div>
            <button 
              onClick={() => addLog('Remote refresh triggered...')}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-indigo-700 transition-all active:scale-95"
            >
              <RefreshCcw size={16} />
              Re-sync Node
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 overflow-y-auto flex-1">
          {/* Metric Grid - PROFESSIONAL POLISH THEME */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard label="Total Peers" value="1,244" trend="+12 last hour" icon={Network} />
            <StatCard label="Messages / Sec" value="84.2" detail="Avg latency: 14ms" icon={Zap} />
            <StatCard label="Storage Usage" value="64%" progress={64} icon={Database} />
            <StatCard label="Live Uptime" value={`${Math.floor(uptime/60)}m ${uptime%60}s`} healthy icon={Activity} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Network Sync Status - Large Panel */}
            <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-full min-h-[400px]">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Globe className="text-indigo-500" size={18} />
                  Network Sync status
                </h3>
                <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded uppercase font-mono tracking-widest animate-pulse">Live</span>
              </div>
              <div className="p-6 flex-1 space-y-6 overflow-y-auto">
                <SyncItem label="Cast Messages Sync" current={48122094} total={48122094} color="bg-emerald-500" />
                <SyncItem label="Reaction Delta Sync" current={112042391} total={112042391} color="bg-emerald-500" />
                <SyncItem label="Profile Data Backfill" current={1204882} total={1210000} color="bg-indigo-500" />
                
                {/* Recent Activity Feed */}
                <div className="pt-4 mt-4 border-t border-slate-50">
                   <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Ingress Activity Stream</h4>
                   <div className="space-y-3">
                     {[...Array(3)].map((_, i) => (
                       <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 border border-slate-100 group hover:border-indigo-200 transition-all">
                         <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-slate-200 text-slate-400 group-hover:text-indigo-500 transition-colors">
                           <Database size={14} />
                         </div>
                         <div className="flex-1 min-w-0">
                           <div className="flex justify-between">
                             <p className="text-xs font-semibold text-slate-700 truncate">BLOCK_HASH: 0x{Math.random().toString(16).slice(2, 10)}</p>
                             <span className="text-[10px] font-mono text-slate-400 uppercase">T-{i*4}s</span>
                           </div>
                           <p className="text-[10px] text-slate-500 truncate">Metadata consensus achieved via Layer-2 Base tunnel.</p>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>

            {/* Resource Monitor / Terminal - Professional Polish Right Column */}
            <div className="flex flex-col gap-6">
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm shrink-0">
                <div className="p-5 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <ShieldCheck className="text-emerald-500" size={18} />
                    Resource Monitor
                  </h3>
                </div>
                <div className="p-6 space-y-5">
                  <HealthIndicator label="CPU Load" percent={18} status="8 cores • Active" color="border-emerald-500" />
                  <HealthIndicator label="Memory Usage" percent={68} status="22GB / 32GB RAM" color="border-amber-400" />
                  <HealthIndicator label="I/O Wait" percent={12} status="NVMe Storage Tier" color="border-indigo-500" />
                </div>
              </div>

              {/* Terminal Panel - Integrated Logs */}
              <div className="flex-1 bg-slate-900 rounded-xl overflow-hidden shadow-2xl flex flex-col border border-slate-800">
                <div className="p-3 bg-slate-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <TerminalIcon size={12} />
                    Terminal_Output
                  </div>
                  <div className="flex gap-1.5 px-1">
                    <div className="w-2 h-2 rounded-full bg-red-400/80" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                    <div className="w-2 h-2 rounded-full bg-green-400/80" />
                  </div>
                </div>
                <div className="p-4 flex-1 font-mono text-[10px] text-slate-300 space-y-1 overflow-y-auto">
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-indigo-500 font-bold shrink-0">➜</span>
                      <span className="opacity-80 break-all">{log}</span>
                    </div>
                  ))}
                  <motion.div 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-1.5 h-3 bg-indigo-500 mt-1 inline-block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, trend, detail, progress, healthy, icon: Icon }: any) {
  return (
    <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm hover:border-indigo-200 transition-all group">
      <div className="flex justify-between items-start mb-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <Icon size={14} className="text-slate-200 group-hover:text-indigo-300 transition-colors" />
      </div>
      <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
      {trend && (
        <div className="mt-2 flex items-center text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
          <Activity size={12} className="mr-1" />
          <span>{trend}</span>
        </div>
      )}
      {detail && (
        <div className="mt-2 text-[10px] text-slate-400 font-medium tracking-wide">
          {detail}
        </div>
      )}
      {progress !== undefined && (
        <div className="mt-4 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className={`h-full ${progress > 80 ? 'bg-amber-500' : 'bg-indigo-500'}`}
          />
        </div>
      )}
      {healthy && (
        <div className="mt-2 flex items-center text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
           Healthy Status
        </div>
      )}
    </div>
  );
}

function SyncItem({ label, current, total, color }: any) {
  const percent = (current / total) * 100;
  return (
    <div className="group">
      <div className="flex justify-between items-end mb-2">
        <span className="text-xs font-semibold text-slate-700">{label}</span>
        <span className="text-[10px] font-mono text-slate-400 tracking-tight">
          {current.toLocaleString()} / {total.toLocaleString()}
        </span>
      </div>
      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          className={`${color} h-full transition-all duration-1000 shadow-[0_0_8px_rgba(0,0,0,0.1)]`}
        />
      </div>
    </div>
  );
}

function HealthIndicator({ label, percent, status, color }: any) {
  return (
    <div className="flex items-center gap-4 group">
      <div className={`w-12 h-12 rounded-full border-4 ${color} flex items-center justify-center shrink-0 relative shadow-sm`}>
        <span className="text-[10px] font-bold text-slate-800">{percent}%</span>
        {percent > 60 && <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-400 animate-pulse border border-white" />}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-800">{label}</p>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{status}</p>
      </div>
    </div>
  );
}
