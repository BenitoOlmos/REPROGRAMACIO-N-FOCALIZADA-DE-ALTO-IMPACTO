
import React, { useState, useEffect } from 'react';
import { User, Phase, TestResult, UserRole, ServiceType } from '../types';
import { PHASES, COLORS } from '../constants';
import AudioPlayer from '../components/AudioPlayer';
import EvolutionChart from '../components/EvolutionChart';
import Logo from '../components/Logo';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';

interface DashboardProps {
  user: User;
  daysElapsed: number;
  testResults: TestResult[];
  onAddTestResult: (res: TestResult) => void;
  onLogout: () => void;
}

// Definición de pestañas y sub-vistas para profesional
type ProfessionalTab = 'INICIO' | 'AGENDA' | 'PACIENTES' | 'PERFIL' | 'AJUSTES';
type PatientSubView = 'HISTORIAL' | 'REPORTE';

const Dashboard: React.FC<DashboardProps> = ({ user, daysElapsed, testResults, onLogout }) => {
  const [activeTab, setActiveTab] = useState<ProfessionalTab | 'CLIENTE_INICIO'>(
    user.role === UserRole.CLIENT ? 'CLIENTE_INICIO' : 'INICIO'
  );
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [patientSubView, setPatientSubView] = useState<PatientSubView>('REPORTE');

  // Mocks de datos robustos para Profesional
  const weeklyAudioData = [
    { day: 'L', min: 120 }, { day: 'M', min: 240 }, { day: 'X', min: 420 },
    { day: 'J', min: 180 }, { day: 'V', min: 210 }, { day: 'S', min: 90 }, { day: 'D', min: 60 },
  ];

  const patientsList = [
    { id: '1', name: 'Alejandro Moreno', phase: 3, label: 'Estabilización', progress: 85, lastSession: 'Hoy, 10:30 AM', img: 'https://i.pravatar.cc/150?u=alejandro', idExp: '#EQU-9042', activity: '4.2h / sem' },
    { id: '2', name: 'Sofía Luna', phase: 2, label: 'Evolución', progress: 42, lastSession: 'Ayer', img: 'https://i.pravatar.cc/150?u=sofia', idExp: '#EQU-1120', activity: '2.8h / sem' },
    { id: '3', name: 'Roberto Carlos', phase: 1, label: 'Inducción', progress: 12, lastSession: 'Hace 3 días', img: 'https://i.pravatar.cc/150?u=roberto', idExp: '#EQU-5541', activity: '0.5h / sem' },
    { id: '4', name: 'Martina Ruiz', phase: 2, label: 'Evolución', progress: 42, lastSession: '24 Oct, 16:00', img: 'https://i.pravatar.cc/150?u=martina', idExp: '#EQU-3321', activity: '3.1h / sem' },
    { id: '5', name: 'Ricardo Sánchez', phase: 3, label: 'Estabilización', progress: 75, lastSession: 'Mañana, 10:30', img: 'https://i.pravatar.cc/150?u=ricardo', idExp: '#EQU-8874', activity: '5.0h / sem' },
  ];

  const selectedPatient = patientsList.find(p => p.id === selectedPatientId) || patientsList[0];

  // --- VISTAS PROFESIONALES ---

  const renderInicio = () => (
    <div className="px-6 pb-32 space-y-8 animate-in fade-in duration-500">
      <header className="pt-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-turquesa/10 flex items-center justify-center border border-white shadow-sm overflow-hidden">
             <img src="https://i.pravatar.cc/100?u=doc" alt="Dra Elena" />
          </div>
          <div>
            <p className="label-caps !text-[8px] !text-turquesa">RFAI PLATFORM</p>
            <h2 className="text-sm font-bold">Centro Equilibrar</h2>
          </div>
        </div>
        <div className="flex gap-2">
           <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-300 shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
           <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-300 shadow-sm relative"><div className="absolute top-3 right-3 w-2 h-2 bg-red-400 rounded-full"></div><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg></button>
        </div>
      </header>

      <section className="space-y-6">
        <h3 className="text-2xl font-bold">Métricas de Grupo</h3>
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-white p-6 rounded-[2.5rem] card-shadow border border-slate-50">
              <p className="label-caps !text-[8px] mb-2">Pacientes</p>
              <p className="text-3xl font-bold text-[#2F2F2F]">48</p>
              <p className="text-[10px] text-green-500 font-bold mt-2 flex items-center gap-1">↑ +5%</p>
           </div>
           <div className="bg-white p-6 rounded-[2.5rem] card-shadow border border-slate-50">
              <p className="label-caps !text-[8px] mb-2">Progreso</p>
              <p className="text-3xl font-bold text-[#2F2F2F]">72%</p>
              <p className="text-[10px] text-green-500 font-bold mt-2 flex items-center gap-1">↑ +2.4%</p>
           </div>
        </div>
      </section>

      <div className="bg-white p-8 rounded-[3rem] card-shadow border border-slate-50">
         <div className="flex justify-between items-center mb-6">
            <div>
              <p className="label-caps !text-[8px] mb-1">Consumo de Audio Semanal</p>
              <p className="text-2xl font-bold">1,240 <span className="text-sm font-normal text-slate-300">min</span></p>
            </div>
            <span className="px-3 py-1 bg-turquesa/5 text-turquesa rounded-lg text-[9px] font-bold uppercase tracking-widest">Últimos 7 días</span>
         </div>
         <div className="h-24 w-full flex items-end justify-between gap-1 px-2">
            {weeklyAudioData.map(d => (
              <div key={d.day} className="flex flex-col items-center gap-2 flex-1 group">
                 <div className={`w-full rounded-t-lg transition-all ${d.day === 'X' ? 'bg-turquesa' : 'bg-slate-50 group-hover:bg-slate-100'}`} style={{ height: `${(d.min/450)*100}%` }}></div>
                 <span className={`text-[10px] font-bold ${d.day === 'X' ? 'text-turquesa' : 'text-slate-300'}`}>{d.day}</span>
              </div>
            ))}
         </div>
      </div>

      <section className="space-y-6">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xl font-bold">Pacientes Activos</h3>
          <button onClick={() => setActiveTab('PACIENTES')} className="text-turquesa text-[10px] font-bold uppercase tracking-widest hover:underline transition-all">Ver todos ›</button>
        </div>
        <div className="space-y-4">
           {patientsList.slice(0, 2).map(p => (
             <div key={p.id} className="bg-white p-6 rounded-[2.5rem] card-shadow border border-slate-50 space-y-4">
               <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <img src={p.img} alt={p.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                    <div>
                      <h4 className="font-bold text-sm">{p.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Progreso total • {p.progress}%</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-green-50 text-green-500 rounded-lg text-[8px] font-bold uppercase tracking-tighter">FASE {p.phase}: {p.label}</div>
               </div>
               <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                  <div className="h-full bg-turquesa rounded-full" style={{ width: `${p.progress}%` }}></div>
               </div>
               <div className="flex justify-between items-center pt-2">
                 <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium"><svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {p.activity}</div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium"><svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> {p.lastSession}</div>
                 </div>
                 <button onClick={() => { setSelectedPatientId(p.id); setActiveTab('PACIENTES'); setPatientSubView('REPORTE'); }} className="px-4 py-2 border border-turquesa/20 text-turquesa rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-turquesa/5">Ver Resultados</button>
               </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );

  const renderAgenda = () => (
    <div className="px-6 pb-32 space-y-8 animate-in fade-in duration-500">
      <header className="pt-10 flex justify-between items-center">
        <button onClick={() => setActiveTab('INICIO')} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-turquesa shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
        <div className="text-center">
           <p className="label-caps !text-[8px] !text-turquesa">GESTIÓN CLÍNICA</p>
           <h2 className="text-lg font-bold">Agenda de Sesiones</h2>
        </div>
        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-turquesa shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></button>
      </header>

      <div className="flex justify-between items-center bg-white p-5 rounded-[2.5rem] card-shadow border border-slate-50">
        {['12', '13', '14', '15', '16', '17', '18'].map((day, i) => (
          <div key={day} className={`flex flex-col items-center p-2 rounded-2xl min-w-[42px] transition-all ${i === 2 ? 'bg-turquesa text-white shadow-lg scale-105' : 'text-slate-400'}`}>
            <span className="text-[8px] font-bold uppercase mb-1">{['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'][i]}</span>
            <span className="text-sm font-bold">{day}</span>
            {i === 2 && <div className="w-1 h-1 bg-white rounded-full mt-1"></div>}
          </div>
        ))}
      </div>

      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="label-caps !text-slate-400">Pendientes de confirmar</h3>
          <span className="bg-orange-50 text-orange-500 text-[9px] font-bold px-3 py-1 rounded-full">2 NUEVAS</span>
        </div>
        <div className="bg-white p-6 rounded-[2.5rem] card-shadow flex items-center justify-between border border-slate-50">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-turquesa font-bold text-xs shadow-inner">JP</div>
              <div>
                 <h4 className="font-bold text-sm">Javier Portillo</h4>
                 <p className="text-[10px] text-slate-400">Mañana, 09:30 AM</p>
              </div>
           </div>
           <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-100 transition-all">✕</button>
              <button className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center hover:bg-green-100 transition-all">✓</button>
           </div>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="label-caps !text-slate-400 px-1">Sesiones de Hoy</h3>
        <div className="space-y-8 relative pl-6 border-l-2 border-slate-50 ml-4">
           <div className="relative">
              <div className="absolute -left-[32px] top-6 w-4 h-4 rounded-full bg-turquesa border-4 border-white shadow-sm z-10"></div>
              <div className="bg-white p-8 rounded-[3rem] card-shadow border border-slate-50 space-y-6">
                 <div className="flex justify-between items-start">
                    <div>
                       <span className="px-3 py-1 bg-turquesa/10 text-turquesa rounded-lg text-[8px] font-bold uppercase">En curso</span>
                       <h4 className="text-lg font-bold mt-2">Alejandro Moreno</h4>
                       <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 10:00 - 11:00 AM (Fase 3)</p>
                    </div>
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                       <img src="https://i.pravatar.cc/150?u=alejandro" alt="Alejandro" />
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <button className="flex-1 py-4 bg-turquesa text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg fab-glow"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Unirse a Meet</button>
                    <button className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">⋮</button>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <button className="fixed bottom-32 right-10 w-14 h-14 bg-turquesa text-white rounded-2xl flex items-center justify-center shadow-2xl fab-glow z-40 active:scale-90 transition-all"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></button>
    </div>
  );

  const renderPacientes = () => {
    if (selectedPatientId) {
      return (
        <div className="pb-32 animate-in fade-in duration-500">
           <header className="pt-10 px-6 flex justify-between items-center bg-[#F8FAFB] sticky top-0 z-20 pb-4">
              <button onClick={() => setSelectedPatientId(null)} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-turquesa shadow-sm">‹</button>
              <div className="flex bg-slate-100 p-1 rounded-full text-[9px] font-bold uppercase tracking-widest">
                 <button onClick={() => setPatientSubView('HISTORIAL')} className={`px-5 py-2 rounded-full transition-all ${patientSubView === 'HISTORIAL' ? 'bg-white text-turquesa shadow-sm' : 'text-slate-400'}`}>Expediente</button>
                 <button onClick={() => setPatientSubView('REPORTE')} className={`px-5 py-2 rounded-full transition-all ${patientSubView === 'REPORTE' ? 'bg-white text-turquesa shadow-sm' : 'text-slate-400'}`}>Reporte</button>
              </div>
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-turquesa shadow-sm">⋮</button>
           </header>

           <div className="px-6 mt-8 space-y-8">
              <div className="flex items-center gap-6">
                 <div className="w-24 h-24 rounded-[2.5rem] overflow-hidden border-[6px] border-white shadow-xl bg-slate-100">
                    <img src={selectedPatient.img} alt={selectedPatient.name} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold">{selectedPatient.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                       <div className="w-2 h-2 rounded-full bg-green-500"></div>
                       <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">FASE {selectedPatient.phase}: {selectedPatient.label.toUpperCase()}</p>
                    </div>
                    <p className="text-[10px] text-slate-300 font-medium mt-1">ID: {selectedPatient.idExp}</p>
                 </div>
              </div>

              {patientSubView === 'REPORTE' ? (
                <div className="space-y-8">
                   <div className="bg-white p-8 rounded-[3rem] card-shadow border border-slate-50 space-y-6">
                      <div className="flex justify-between items-center">
                        <h4 className="label-caps !text-[#2F2F2F] !text-[10px]">Progreso Terapéutico</h4>
                        <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 text-[10px]">i</div>
                      </div>
                      <EvolutionChart data={[{name: 'INICIAL', score: 32}, {name: 'CONTROL', score: 64}, {name: 'ACTUAL', score: 85}]} />
                      <div className="grid grid-cols-3 gap-2">
                         <div className="p-3 bg-slate-50 rounded-2xl text-center"><p className="label-caps !text-[6px]">Inicial</p><p className="text-lg font-bold">32%</p></div>
                         <div className="p-3 bg-slate-50 rounded-2xl text-center"><p className="label-caps !text-[6px]">Control</p><p className="text-lg font-bold">64%</p></div>
                         <div className="p-3 bg-turquesa/5 text-turquesa border border-turquesa/10 rounded-2xl text-center"><p className="label-caps !text-[6px] !text-turquesa">Final</p><p className="text-lg font-bold">85%</p></div>
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <h4 className="text-xl font-bold px-2">Actividad de Escucha</h4>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="bg-white p-6 rounded-[2.5rem] card-shadow space-y-4">
                            <p className="label-caps !text-[8px] !text-slate-400">Frecuencia</p>
                            <p className="text-2xl font-bold">5.2 <span className="text-[8px] text-slate-300 font-bold uppercase">veces/día</span></p>
                            <button className="w-full py-3 border border-turquesa/20 text-turquesa rounded-xl text-[9px] font-bold uppercase tracking-widest">Agendar</button>
                         </div>
                         <div className="bg-white p-6 rounded-[2.5rem] card-shadow space-y-4">
                            <p className="label-caps !text-[8px] !text-slate-400">Tiempo Total</p>
                            <p className="text-2xl font-bold">42.5 <span className="text-[8px] text-slate-300 font-bold uppercase">horas</span></p>
                            <button className="w-full py-3 bg-turquesa text-white rounded-xl text-[9px] font-bold uppercase tracking-widest shadow-lg">Nuevo Reporte</button>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h4 className="text-xl font-bold px-2">Bitácora de Sesiones</h4>
                      {[
                        { date: '24 OCT', title: 'Sesión 18: Refuerzo Auditivo', desc: '"El paciente muestra mayor tolerancia a frecuencias altas..."' },
                        { date: '17 OCT', title: 'Sesión 17: Control Fase 2', desc: 'Avance positivo en la discriminación auditiva selectiva.', opacity: true }
                      ].map((s, i) => (
                        <div key={i} className={`bg-white p-6 rounded-[2.5rem] card-shadow border border-slate-50 flex gap-6 ${s.opacity ? 'opacity-50' : ''}`}>
                           <div className="text-center min-w-[40px]"><p className="label-caps !text-[7px] text-slate-300 mb-1">{s.date.split(' ')[1]}</p><p className="text-xl font-bold">{s.date.split(' ')[0]}</p></div>
                           <div className="flex-1"><h5 className="font-bold text-sm leading-tight">{s.title}</h5><p className="text-[10px] text-slate-400 font-medium italic mt-2">{s.desc}</p></div>
                        </div>
                      ))}
                   </div>
                </div>
              ) : (
                <div className="space-y-8">
                   <div className="relative">
                      <input type="text" placeholder="Buscar en el historial..." className="w-full py-4 px-12 bg-white rounded-3xl card-shadow border-none text-sm placeholder:text-slate-200" />
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-3.5 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                   </div>
                   <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
                      {['Todo', 'Notas', 'Documentos', 'Tests'].map(f => (
                        <button key={f} className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all ${f === 'Todo' ? 'bg-turquesa text-white' : 'bg-white text-slate-300 border border-slate-50'}`}>{f}</button>
                      ))}
                   </div>
                   <div className="space-y-4">
                      {[
                        { icon: '📝', title: 'Sesión Semanal 12', date: '14 Oct, 2023 • 10:30 AM', body: 'El paciente muestra una mejora significativa en la respuesta a estímulos de baja frecuencia...', tags: ['PROGRESO', 'FASE 3'] },
                        { icon: '📊', title: 'Evaluación Psicométrica', date: '08 Oct, 2023', body: 'Puntaje de Estabilidad: 92/100', metric: 92 },
                        { icon: '📎', title: 'Consentimiento Informado Rev. 2', date: '02 Oct, 2023', file: 'PDF • 1.2 MB' }
                      ].map((item, i) => (
                        <div key={i} className="bg-white p-8 rounded-[3rem] card-shadow border border-slate-50 space-y-5">
                           <div className="flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg">{item.icon}</div>
                                 <div><h5 className="font-bold text-sm leading-tight">{item.title}</h5><p className="text-[9px] text-slate-300 mt-0.5">{item.date}</p></div>
                              </div>
                              <button className="text-slate-200">›</button>
                           </div>
                           {item.body && <p className="text-[11px] text-slate-400 leading-relaxed opacity-80">{item.body}</p>}
                           {item.tags && <div className="flex gap-2">{item.tags.map(t => <span key={t} className="px-3 py-1 bg-slate-50 text-[8px] font-bold text-slate-300 rounded-md tracking-widest">{t}</span>)}</div>}
                           {item.metric && <div className="space-y-2 pt-2"><div className="flex justify-between text-[8px] font-bold text-orange-500 uppercase tracking-widest"><span>Puntaje de Estabilidad</span><span>{item.metric}/100</span></div><div className="h-1 bg-slate-50 rounded-full overflow-hidden"><div className="h-full bg-orange-500" style={{ width: `${item.metric}%` }}></div></div></div>}
                           {item.file && <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl"><span className="text-[10px] font-bold text-slate-300">{item.file}</span><button className="text-slate-300">↓</button></div>}
                        </div>
                      ))}
                   </div>
                </div>
              )}
           </div>

           <button className="fixed bottom-32 right-10 w-14 h-14 bg-turquesa text-white rounded-full flex items-center justify-center shadow-2xl fab-glow z-40"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></button>
        </div>
      );
    }

    return (
      <div className="px-6 pb-32 animate-in fade-in duration-500">
        <header className="pt-12 pb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Pacientes</h1>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm"><img src="https://i.pravatar.cc/100?u=doc" alt="Doc" /></div>
        </header>
        <div className="relative mb-10">
          <input type="text" placeholder="Buscar paciente por nombre..." className="w-full py-5 px-14 bg-white rounded-[2rem] card-shadow border-none text-sm placeholder:text-slate-300 focus:ring-2 focus:ring-turquesa/10 transition-all outline-none" />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-5 top-4.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <div className="flex justify-between items-center mb-8 px-1">
          <h3 className="label-caps !text-turquesa !text-[11px]">Pacientes Asignados (48)</h3>
          <button className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4.5h18m-18 5h18m-18 5h18m-18 5h18" /></svg> Filtrar</button>
        </div>
        <div className="space-y-6">
           {patientsList.map(p => (
             <div key={p.id} className="bg-white p-8 rounded-[3rem] card-shadow border border-slate-50 space-y-6 transition-all hover:scale-[1.01]">
               <div className="flex justify-between items-start">
                  <div className="flex items-center gap-5">
                    <img src={p.img} alt={p.name} className="w-16 h-16 rounded-full border-4 border-white shadow-md" />
                    <div><h4 className="font-bold text-lg">{p.name}</h4><p className="text-[10px] text-slate-300 font-medium mt-1">Última sesión: {p.lastSession}</p></div>
                  </div>
                  <div className="px-3 py-1 bg-green-50 text-green-500 rounded-lg text-[9px] font-bold tracking-tighter uppercase">FASE {p.phase}</div>
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between items-center px-1"><span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Progreso del tratamiento</span><span className="text-turquesa font-bold text-xs">{p.progress}%</span></div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden"><div className="h-full bg-turquesa" style={{ width: `${p.progress}%` }}></div></div>
               </div>
               <div className="flex gap-4">
                  <button onClick={() => { setSelectedPatientId(p.id); setPatientSubView('REPORTE'); }} className="flex-1 py-4.5 bg-turquesa/5 text-turquesa rounded-[1.5rem] text-[10px] font-bold uppercase tracking-widest hover:bg-turquesa/10 transition-all">Ver Resultados</button>
                  <button className="w-14 h-14 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-slate-300">⋮</button>
               </div>
             </div>
           ))}
        </div>
      </div>
    );
  };

  const renderPerfilProfesional = () => (
    <div className="px-6 pb-32 space-y-12 animate-in fade-in duration-700">
      <header className="pt-10 flex justify-between items-center">
         <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-turquesa shadow-sm">‹</button>
         <h2 className="label-caps !text-[#2F2F2F] !text-[12px] !tracking-widest">Perfil Profesional</h2>
         <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-turquesa shadow-sm">⋮</button>
      </header>
      
      <div className="flex flex-col items-center pt-4">
        <div className="relative">
          <img src="https://i.pravatar.cc/300?u=doc_elena" alt="Elena" className="w-48 h-48 rounded-full border-8 border-white shadow-2xl" />
          <div className="absolute bottom-5 right-5 w-10 h-10 bg-green-500 rounded-full border-4 border-white"></div>
        </div>
        <h2 className="text-3xl font-bold mt-10">Dra. Elena Valenzuela</h2>
        <p className="text-turquesa font-bold text-[10px] mt-3 uppercase tracking-widest">Psicoterapeuta Clínica & Mindfulness</p>
      </div>

      <div className="grid grid-cols-3 gap-1 bg-white p-8 rounded-[3rem] card-shadow border border-slate-50">
         <div className="text-center space-y-1 border-r border-slate-100">
            <p className="label-caps !text-[7px]">Pacientes</p>
            <p className="text-2xl font-bold">24</p>
         </div>
         <div className="text-center space-y-1 border-r border-slate-100">
            <p className="label-caps !text-[7px]">Experiencia</p>
            <p className="text-2xl font-bold">12a</p>
         </div>
         <div className="text-center space-y-1">
            <p className="label-caps !text-[7px]">Rating</p>
            <div className="flex items-center justify-center gap-1"><p className="text-2xl font-bold">4.9</p><span className="text-orange-400 text-sm">★</span></div>
         </div>
      </div>

      <div className="space-y-4">
         <div className="flex justify-between items-center px-4">
            <h3 className="label-caps !text-[#2F2F2F] flex items-center gap-2 font-bold"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-turquesa" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> Disponibilidad</h3>
            <button className="text-turquesa text-[9px] font-bold uppercase tracking-widest">Ver Calendario</button>
         </div>
         <div className="bg-white p-8 rounded-[3rem] card-shadow border border-slate-50 flex items-center gap-8">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-turquesa">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div><h4 className="font-bold text-base">Lunes a Viernes</h4><p className="text-[11px] text-slate-300 font-medium mt-1">09:00 - 18:00 (GMT-4)</p></div>
         </div>
      </div>

      <div className="space-y-6">
         <div className="flex justify-between items-center px-4">
            <h3 className="label-caps !text-[#2F2F2F] flex items-center gap-2 font-bold"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-turquesa" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> Pacientes Asignados</h3>
            <button className="w-10 h-10 bg-turquesa text-white rounded-full flex items-center justify-center shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></button>
         </div>
         <div className="space-y-4">
           {patientsList.slice(0, 2).map(p => (
             <div key={p.id} className="bg-white p-6 rounded-[2.5rem] card-shadow border border-slate-50 space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <img src={p.img} alt={p.name} className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
                      <div><h4 className="font-bold text-sm">{p.name}</h4><p className="text-[9px] text-slate-300">Próxima sesión: Mañana, 10:30</p></div>
                   </div>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
                <div className="space-y-2 px-1">
                   <div className="flex justify-between items-center"><span className="label-caps !text-[7px]">Progreso Terapéutico</span><span className="text-[10px] font-bold text-turquesa">{p.progress}%</span></div>
                   <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden"><div className="h-full bg-turquesa" style={{ width: `${p.progress}%` }}></div></div>
                </div>
             </div>
           ))}
         </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
         <div className="bg-white p-8 rounded-[2.5rem] card-shadow border border-slate-50 text-center space-y-4 active:scale-95 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-turquesa mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <p className="text-xs font-bold uppercase tracking-widest">Expedientes</p>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] card-shadow border border-slate-50 text-center space-y-4 active:scale-95 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-turquesa mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <p className="text-xs font-bold uppercase tracking-widest">Estadísticas</p>
         </div>
      </div>
      
      <button onClick={onLogout} className="w-full py-6 bg-[#121212] text-white rounded-[2rem] text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl active:scale-[0.98] transition-all">Cerrar Sesión Profesional</button>
    </div>
  );

  const renderBottomNav = () => (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] lg:max-w-[500px] h-24 bottom-nav-blur border-t border-white flex items-center justify-between px-10 z-50">
      <button onClick={() => { setActiveTab('INICIO'); setSelectedPatientId(null); }} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'INICIO' ? 'text-turquesa' : 'text-slate-300'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        <span className="text-[9px] font-bold uppercase tracking-tighter">Inicio</span>
      </button>
      <button onClick={() => { setActiveTab('AGENDA'); setSelectedPatientId(null); }} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'AGENDA' ? 'text-turquesa' : 'text-slate-300'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        <span className="text-[9px] font-bold uppercase tracking-tighter">Agenda</span>
      </button>
      
      <div className="-translate-y-8">
        <button onClick={() => { setActiveTab('PERFIL'); setSelectedPatientId(null); }} className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-all active:scale-95 ${activeTab === 'PERFIL' ? 'bg-turquesa text-white fab-glow' : 'bg-white text-slate-300 border border-slate-50'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 14a4 4 0 014-4h8a4 4 0 014 4v2a4 4 0 01-4 4H8a4 4 0 01-4-4v-2z" /></svg>
        </button>
      </div>

      <button onClick={() => { setActiveTab('PACIENTES'); setSelectedPatientId(null); }} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'PACIENTES' ? 'text-turquesa' : 'text-slate-300'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        <span className="text-[9px] font-bold uppercase tracking-tighter">Pacientes</span>
      </button>
      <button onClick={() => { setActiveTab('AJUSTES'); setSelectedPatientId(null); }} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'AJUSTES' ? 'text-turquesa' : 'text-slate-300'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
        <span className="text-[9px] font-bold uppercase tracking-tighter">Ajustes</span>
      </button>
    </nav>
  );

  return (
    <div className="no-scrollbar h-full overflow-y-auto bg-[#F8FAFB]">
      <div className="min-h-screen relative">
        {user.role === UserRole.CLIENT ? (
          <div className="pb-32">
             <header className="pt-10 px-6 flex justify-between items-center"><button onClick={onLogout} className="w-10 h-10 rounded-full bg-white flex shadow-sm items-center justify-center">‹</button><Logo variant="icon" className="w-10" /></header>
             <div className="px-6 mt-10 space-y-8"><div className="bg-white p-10 rounded-[3rem] card-shadow"><h2 className="text-2xl font-bold">Bienvenido</h2><p className="text-xs text-slate-400 mt-2">Fase 1: Onboarding iniciada.</p></div><AudioPlayer title="Fundamentos de Calma" src="#" /></div>
          </div>
        ) : (
          <>
            {activeTab === 'INICIO' && renderInicio()}
            {activeTab === 'AGENDA' && renderAgenda()}
            {activeTab === 'PACIENTES' && renderPacientes()}
            {activeTab === 'PERFIL' && renderPerfilProfesional()}
            {activeTab === 'AJUSTES' && (
              <div className="p-12 animate-in fade-in space-y-10">
                <header className="flex justify-between items-center"><h1 className="text-4xl font-bold text-[#2F2F2F]">Ajustes</h1><Logo variant="icon" className="w-10" /></header>
                <div className="bg-white rounded-[2.5rem] card-shadow p-8 space-y-6 border border-slate-50">
                   <div className="flex items-center justify-between border-b border-slate-50 pb-5"><p className="font-bold text-sm">Modo Oscuro</p><div className="w-12 h-6 bg-slate-100 rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div></div></div>
                   <div className="flex items-center justify-between border-b border-slate-50 pb-5"><p className="font-bold text-sm">Notificaciones</p><div className="w-12 h-6 bg-turquesa rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div></div></div>
                </div>
                <button onClick={onLogout} className="w-full py-5.5 bg-[#121212] text-white rounded-[2rem] text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl active:scale-[0.98] transition-all">Cerrar Sesión Profesional</button>
              </div>
            )}
            {renderBottomNav()}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
