
import React, { useState } from 'react';
import { User, UserRole, TestResult } from '../types';
import Logo from '../components/Logo';
import { 
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, 
  Cell, PieChart, Pie 
} from 'recharts';

interface DashboardProps {
  user: User;
  daysElapsed: number;
  testResults: TestResult[];
  onAddTestResult: (res: TestResult) => void;
  onLogout: () => void;
}

type AdminTab = 'INICIO' | 'USUARIOS' | 'LOGS' | 'PERFIL' | 'CONFIG' | 'SISTEMAS';

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('PERFIL');
  const [phaseDuration, setPhaseDuration] = useState(4);
  const [therapeuticIntensity, setTherapeuticIntensity] = useState(85);

  const adminLogs = [
    { id: 'l1', type: 'INFO', title: 'Sesión Iniciada', desc: 'El administrador Laura Méndez ha accedido al panel global.', time: '10:42 AM', date: 'RECIENTES', color: 'bg-turquesa' },
    { id: 'l2', type: 'CONFIG', title: 'Actualización de Contenido', desc: 'Sincronización automática de protocolos terapéuticos completada.', time: '09:15 AM', date: 'RECIENTES', color: 'bg-slate-300' },
    { id: 'l3', type: 'ERROR', title: 'Error de Autenticación', desc: '3 intentos fallidos desde la IP 192.168.1.45.', time: '08:30 AM', date: 'RECIENTES', color: 'bg-red-400' },
  ];

  const allUsers = [
    { id: 'u1', name: 'Dr. Alejandro Sanz', role: 'PROFESIONAL', active: true, img: 'https://i.pravatar.cc/150?u=asanz' },
    { id: 'u2', name: 'María García', role: 'CLIENTE', active: true, img: 'https://i.pravatar.cc/150?u=mgarcia' },
    { id: 'u3', name: 'Elena Martínez', role: 'COORDINADORA', active: false, img: 'https://i.pravatar.cc/150?u=emartinez' },
  ];

  // --- RENDER: CONFIGURACIÓN GLOBAL ---
  const renderAdminConfig = () => (
    <div className="px-6 pb-32 animate-in fade-in duration-500">
      <header className="pt-10 flex justify-between items-center px-1 mb-8">
        <button onClick={() => setActiveTab('PERFIL')} className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm active:scale-90 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-sm font-bold text-[#2F2F2F] tracking-widest uppercase">Configuración Global</h2>
        <button className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-turquesa shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
        </button>
      </header>

      <div className="flex flex-col items-center mb-10">
        <Logo variant="icon" className="w-16 opacity-60 mb-2" />
        <p className="label-caps !text-[8px] tracking-[0.3em]">ECOSISTEMA RFAI</p>
      </div>

      <div className="space-y-10">
        {/* Mantenimiento */}
        <section className="space-y-4">
          <p className="label-caps !text-[9px] px-2">MANTENIMIENTO DEL SISTEMA</p>
          <div className="bg-white p-8 rounded-[3rem] card-shadow border border-slate-50 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold">Modo Mantenimiento</h4>
                <p className="text-[10px] text-slate-300 mt-1">Desactiva el acceso público</p>
              </div>
              <div className="w-12 h-6 bg-slate-100 rounded-full relative p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold">Depuración Log</h4>
                <p className="text-[10px] text-slate-300 mt-1">Registro detallado de errores</p>
              </div>
              <div className="w-12 h-6 bg-turquesa rounded-full relative p-1 flex justify-end cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Notificaciones */}
        <section className="space-y-4">
          <p className="label-caps !text-[9px] px-2">NOTIFICACIONES GLOBALES</p>
          <div className="bg-white p-8 rounded-[3rem] card-shadow border border-slate-50 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-turquesa">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h4 className="text-sm font-bold">Alertas de Email</h4>
              </div>
              <div className="w-12 h-6 bg-turquesa rounded-full relative p-1 flex justify-end cursor-pointer"><div className="w-4 h-4 bg-white rounded-full shadow-sm"></div></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-turquesa">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </div>
                <h4 className="text-sm font-bold">Push App</h4>
              </div>
              <div className="w-12 h-6 bg-turquesa rounded-full relative p-1 flex justify-end cursor-pointer"><div className="w-4 h-4 bg-white rounded-full shadow-sm"></div></div>
            </div>
          </div>
        </section>

        {/* Parámetros */}
        <section className="space-y-4">
          <p className="label-caps !text-[9px] px-2">PARÁMETROS DE FASES</p>
          <div className="bg-white p-8 rounded-[3rem] card-shadow border border-slate-50 space-y-12">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold">Duración Fase 1 (Semanas)</h4>
                <span className="text-turquesa font-bold">{phaseDuration}</span>
              </div>
              <input type="range" min="1" max="8" value={phaseDuration} onChange={(e) => setPhaseDuration(parseInt(e.target.value))} className="w-full accent-turquesa" />
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold">Intensidad Terapéutica</h4>
                <span className="text-turquesa font-bold">{therapeuticIntensity}%</span>
              </div>
              <input type="range" min="0" max="100" value={therapeuticIntensity} onChange={(e) => setTherapeuticIntensity(parseInt(e.target.value))} className="w-full accent-turquesa" />
            </div>
          </div>
        </section>

        {/* Integraciones */}
        <section className="space-y-4">
          <p className="label-caps !text-[9px] px-2">INTEGRACIONES DE TERCEROS</p>
          <div className="bg-white p-8 rounded-[3rem] card-shadow border border-slate-50 space-y-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-turquesa">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h4 className="text-sm font-bold">Google Meet</h4>
                <p className="text-[10px] text-slate-300">Sincronización de sesiones</p>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <p className="label-caps !text-[7px] mb-2">API CLIENT ID</p>
                <div className="h-12 bg-slate-50 rounded-2xl flex items-center px-6 text-[10px] text-slate-400 overflow-hidden">••••••••••••••••••••••••••••••••</div>
              </div>
              <div>
                <p className="label-caps !text-[7px] mb-2">SECRET KEY</p>
                <div className="h-12 bg-slate-50 rounded-2xl flex items-center px-6 text-[10px] text-slate-400 overflow-hidden">••••••••••••••••••••</div>
              </div>
              <button className="w-full py-4 bg-sky-50 text-turquesa rounded-2xl text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-all">Validar Conexión</button>
            </div>
          </div>
        </section>

        <button className="w-full py-6 border border-red-50 text-red-400 rounded-3xl flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest active:bg-red-50 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Restablecer Valores Fábrica
        </button>
      </div>
    </div>
  );

  // --- RENDER: AUDITORÍA Y MANTENIMIENTO ---
  const renderAdminSystems = () => (
    <div className="px-6 pb-32 animate-in fade-in duration-500 overflow-hidden">
      <div className="relative -mx-6 h-80 bg-[#FFF9F2] flex flex-col items-center justify-center">
        <Logo className="w-64 opacity-90" />
        <div className="absolute bottom-10 text-center w-full">
           <h1 className="text-4xl font-bold text-[#121212] tracking-tight px-10">Panel de Administración</h1>
           <p className="text-lg font-bold text-[#121212] mt-4">Auditoría y Mantenimiento</p>
        </div>
      </div>

      <div className="mt-12 space-y-12">
        {/* Auditoría */}
        <section className="space-y-6">
           <div>
              <div className="flex items-center gap-2 mb-1">
                 <h3 className="text-sm font-medium text-slate-400">Sistemas Operativos</h3>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              </div>
              <p className="text-base font-bold">Protegido</p>
           </div>

           <div>
              <h3 className="text-xl font-bold mb-3">Auditoría de Seguridad</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[300px]">Último escaneo completo realizado hace 4 horas sin vulnerabilidades detectadas.</p>
              <div className="flex items-center justify-between mt-4">
                 <div>
                   <p className="text-sm text-slate-500">Índice de Confianza: <span className="text-black font-bold">98%</span></p>
                   <div className="flex items-center gap-3 mt-4">
                      <button className="w-10 h-10 bg-white border border-slate-100 rounded-lg flex items-center justify-center shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></button>
                      <div className="flex items-center gap-2 text-xs font-bold"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Sincronizado</div>
                   </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Copias */}
        <section className="space-y-4">
           <h3 className="text-xl font-bold">Estado de Copias</h3>
           <p className="text-sm text-slate-500 leading-relaxed">Respaldo diario en la nube completado. Próximo ciclo programado: 04:00 AM.</p>
           <div className="pt-2">
              <div className="flex justify-between text-sm font-bold mb-2"><span>Espacio en Nube</span><span>1.2 TB / 2.0 TB</span></div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-black w-[60%]"></div>
              </div>
              <div className="flex items-center gap-2 mt-4 text-xs font-bold">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 112 0 1 1 0 01-2 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 112 0 1 1 0 01-2 0z" /></svg> Estable
              </div>
           </div>
        </section>

        {/* Servidor */}
        <section className="space-y-6">
           <h3 className="text-xl font-bold">Uso de Servidor</h3>
           <p className="text-sm text-slate-500 leading-relaxed">Monitoreo de carga en tiempo real para los servicios centrales de RFAI.</p>
           <div className="grid grid-cols-2 gap-10">
              <div className="space-y-1">
                 <p className="text-3xl font-bold">24%</p>
                 <p className="text-xs text-slate-400 font-medium">CPU Load</p>
              </div>
              <div className="space-y-1">
                 <p className="text-3xl font-bold">42ms</p>
                 <p className="text-xs text-slate-400 font-medium">Latencia</p>
              </div>
           </div>
        </section>

        <div className="flex flex-col gap-3 pt-4">
           <button className="w-full h-14 bg-slate-100 rounded-xl flex items-center justify-center gap-3 text-sm font-bold">Generar Reporte Mensual <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg></button>
           <div className="flex gap-2">
              <button className="flex-1 h-14 bg-slate-100 rounded-xl flex items-center justify-center gap-2 text-xs font-bold"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> Configuración Técnica</button>
           </div>
           <div className="grid grid-cols-2 gap-2 mt-4">
              <button onClick={() => setActiveTab('INICIO')} className="h-14 border border-slate-100 rounded-xl flex items-center justify-center gap-2 text-xs font-bold"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg> Inicio</button>
              <button className="h-14 border border-slate-100 rounded-xl flex items-center justify-center gap-2 text-xs font-bold"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" /><path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" /></svg> Clínica</button>
           </div>
           <button className="w-full h-14 border border-slate-100 rounded-xl flex items-center justify-center mt-2 font-bold">+</button>
           <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setActiveTab('PERFIL')} className="h-14 border border-slate-100 rounded-xl flex items-center justify-center gap-2 text-xs font-bold"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> Sistemas</button>
              <button className="h-14 border border-slate-100 rounded-xl flex items-center justify-center gap-2 text-xs font-bold"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg> Perfil</button>
           </div>
        </div>
      </div>
    </div>
  );

  const renderAdminProfile = () => (
    <div className="px-8 pb-32 animate-in fade-in duration-500 flex flex-col items-center">
       <header className="w-full pt-10 flex flex-col items-center relative">
          <button className="absolute right-0 top-10 w-11 h-11 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          </button>
          <Logo variant="icon" className="w-24 opacity-80" />
          <div className="text-center mt-6">
             <p className="label-caps !text-[10px] tracking-[0.2em] mb-1">PANEL DE CONTROL</p>
             <h1 className="text-3xl font-light text-[#2F2F2F]">Perfil de <span className="font-bold text-turquesa">Administrador</span></h1>
          </div>
       </header>

       <div className="w-full mt-10 bg-white p-8 rounded-[3rem] card-shadow border border-slate-50 flex items-center gap-5">
          <div className="relative">
             <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center text-turquesa">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
             </div>
             <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
          </div>
          <div><h3 className="text-xl font-bold">Admin Principal</h3><p className="text-xs text-slate-400">admin@equilibrar.com</p><span className="mt-2 inline-block px-3 py-1 bg-turquesa text-white text-[8px] font-bold rounded-lg uppercase tracking-widest">NIVEL MASTER</span></div>
       </div>

       <div className="w-full mt-12 space-y-8">
          <div>
             <div className="flex justify-between items-center px-2 mb-4"><p className="label-caps !text-[9px] tracking-[0.15em]">GESTIÓN DE SISTEMA</p><button className="text-slate-200">⋮</button></div>
             <div className="space-y-4">
                {[
                  { icon: '👥', title: 'Gestión de Usuarios', desc: '24 usuarios activos', tab: 'USUARIOS' },
                  { icon: '🕒', title: 'Logs del Sistema', desc: 'Último acceso: hace 5m', tab: 'LOGS' },
                  { icon: '⚙️', title: 'Configuración Global', desc: 'Ajustes generales de RFAI', tab: 'CONFIG' }
                ].map((item, i) => (
                  <button key={i} onClick={() => setActiveTab(item.tab as AdminTab)} className="w-full bg-white p-6 rounded-[2.5rem] card-shadow border border-slate-50 flex items-center justify-between group active:scale-[0.98] transition-all"><div className="flex items-center gap-5"><div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl group-hover:bg-sky-50 transition-colors">{item.icon}</div><div className="text-left"><h4 className="font-bold text-sm text-[#2F2F2F]">{item.title}</h4><p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p></div></div><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-200 group-hover:text-turquesa transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg></button>
                ))}
             </div>
          </div>
          <div>
             <p className="label-caps !text-[9px] tracking-[0.15em] px-2 mb-4">MANTENIMIENTO</p>
             <div className="bg-white rounded-[2.5rem] card-shadow border border-slate-50 divide-y divide-slate-50">
                <button onClick={() => setActiveTab('SISTEMAS')} className="w-full p-6 flex items-center justify-between">
                   <div className="flex items-center gap-4 text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg><span className="text-xs font-medium text-slate-600">Auditoría de Seguridad</span></div>
                   <button className="text-turquesa text-[10px] font-bold uppercase tracking-widest">Revisar</button>
                </button>
                <div className="p-6 flex items-center justify-between">
                   <div className="flex items-center gap-4 text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg><span className="text-xs font-medium text-slate-600">Copias de Seguridad</span></div><span className="text-slate-300 text-[10px] font-medium">Hoy, 04:00 AM</span>
                </div>
             </div>
          </div>
       </div>
       <button onClick={onLogout} className="w-full mt-10 py-5 border border-slate-100 rounded-2xl flex items-center justify-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg> Cerrar Sesión
       </button>
    </div>
  );

  const renderAdminUsers = () => (
    <div className="px-6 pb-32 space-y-8 animate-in fade-in duration-500">
       <header className="pt-10 flex justify-between items-center px-1"><button onClick={() => setActiveTab('PERFIL')} className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm">‹</button><h2 className="text-xl font-bold">Gestión de Usuarios</h2><Logo variant="icon" className="w-10 opacity-30" /></header>
       <div className="relative"><input type="text" placeholder="Buscar..." className="w-full h-16 bg-white rounded-[2rem] border border-slate-100 px-14 text-sm font-medium placeholder:text-slate-200 focus:outline-none focus:border-turquesa/30 transition-all card-shadow" /><svg xmlns="http://www.w3.org/2000/svg" className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-turquesa" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div>
       <div className="space-y-4">
          {allUsers.map(u => (
            <div key={u.id} className="bg-white p-6 rounded-[2.5rem] card-shadow border border-slate-50 flex items-center justify-between"><div className="flex items-center gap-4"><img src={u.img} className="w-14 h-14 rounded-full border-2 border-white shadow-sm" alt="" /><div><h4 className="font-bold text-sm">{u.name}</h4><p className="text-[10px] text-turquesa font-bold uppercase mt-0.5">{u.role}</p></div></div><div className={`w-12 h-6 rounded-full p-1 relative transition-colors ${u.active ? 'bg-turquesa' : 'bg-slate-100'}`}><div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${u.active ? 'translate-x-6' : 'translate-x-0'}`}></div></div></div>
          ))}
       </div>
    </div>
  );

  const renderAdminLogs = () => (
    <div className="px-6 pb-32 space-y-8 animate-in fade-in duration-500">
       <header className="pt-10 flex flex-col items-center px-1 relative"><button onClick={() => setActiveTab('PERFIL')} className="absolute left-0 top-10 w-11 h-11 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm">‹</button><p className="label-caps !text-[9px] mb-1">ACTIVIDAD GLOBAL</p><h1 className="text-2xl font-light">Logs del <span className="font-bold text-turquesa">Sistema</span></h1></header>
       <div className="space-y-6">
          {adminLogs.map(log => (
            <div key={log.id} className="bg-white p-7 rounded-[2.5rem] card-shadow border border-slate-50 relative overflow-hidden"><div className={`absolute left-0 top-0 w-1.5 h-full ${log.color}`}></div><div className="flex justify-between items-start"><div><h4 className="font-bold text-sm">{log.title}</h4><p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{log.desc}</p></div><span className="text-[9px] font-bold text-slate-300">{log.time}</span></div></div>
          ))}
       </div>
    </div>
  );

  const renderAdminBottomNav = () => (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-24 bottom-nav-blur border-t border-white flex items-center justify-between px-10 z-50">
      <button onClick={() => setActiveTab('INICIO')} className={`flex flex-col items-center gap-1.5 ${activeTab === 'INICIO' ? 'text-turquesa' : 'text-slate-300'}`}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg><span className="text-[9px] font-bold uppercase">Inicio</span></button>
      <button onClick={() => setActiveTab('USUARIOS')} className={`flex flex-col items-center gap-1.5 ${activeTab === 'USUARIOS' ? 'text-turquesa' : 'text-slate-300'}`}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg><span className="text-[9px] font-bold uppercase">Usuarios</span></button>
      <div className="-translate-y-8"><button className="w-16 h-16 rounded-full bg-turquesa text-white flex items-center justify-center shadow-2xl fab-glow active:scale-95 transition-all"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg></button></div>
      <button onClick={() => setActiveTab('LOGS')} className={`flex flex-col items-center gap-1.5 ${activeTab === 'LOGS' ? 'text-turquesa' : 'text-slate-300'}`}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg><span className="text-[9px] font-bold uppercase">Logs</span></button>
      <button onClick={() => setActiveTab('CONFIG')} className={`flex flex-col items-center gap-1.5 ${activeTab === 'CONFIG' ? 'text-turquesa' : 'text-slate-300'}`}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg><span className="text-[9px] font-bold uppercase">Config</span></button>
    </nav>
  );

  return (
    <div className="no-scrollbar h-full overflow-y-auto bg-[#F8FAFB]">
      <div className="min-h-screen relative">
        {activeTab === 'PERFIL' && renderAdminProfile()}
        {activeTab === 'USUARIOS' && renderAdminUsers()}
        {activeTab === 'LOGS' && renderAdminLogs()}
        {activeTab === 'CONFIG' && renderAdminConfig()}
        {activeTab === 'SISTEMAS' && renderAdminSystems()}
        {activeTab === 'INICIO' && (
           <div className="p-10 animate-in fade-in flex flex-col items-center">
              <h2 className="text-2xl font-light text-center mb-10">Salud del <span className="font-bold text-turquesa">Ecosistema</span></h2>
              <div className="w-full h-64 bg-white p-6 rounded-[2.5rem] card-shadow border border-slate-50">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[{n: 'Lun', v: 40}, {n: 'Mar', v: 60}, {n: 'Mie', v: 45}, {n: 'Jue', v: 80}, {n: 'Vie', v: 95}]}>
                       <Bar dataKey="v" fill="#0097B2" radius={[10, 10, 0, 0]} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>
        )}
        {renderAdminBottomNav()}
      </div>
    </div>
  );
};

export default Dashboard;
