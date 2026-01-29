
import React, { useState } from 'react';
import { User, UserRole, ServiceType } from '../types';
import Logo from '../components/Logo';

interface LoginProps {
  onLogin: (u: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDemo, setShowDemo] = useState(true);

  const handleDemoLogin = (role: UserRole, name: string, service?: ServiceType, daysAgo: number = 0) => {
    const regDate = new Date();
    regDate.setDate(regDate.getDate() - daysAgo);

    onLogin({
      id: `usr_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email: `${role.toLowerCase()}@equilibrar.com`,
      role,
      service: service || ServiceType.CALMA,
      registrationDate: regDate,
      isActive: true,
      professionalName: 'Dr. Julián Serna'
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFD] p-6">
      {/* Brand Logo - Internal SVG Component */}
      <div className="mb-6 w-full max-w-[240px]">
        <Logo />
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-[40px] soft-shadow p-10 relative border-t-[3px] border-turquesa overflow-hidden">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light text-[#2F2F2F]">Plataforma <span className="font-bold text-turquesa">RFAI</span></h1>
        </div>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col">
            <label className="label-caps mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="ejemplo@clinica.com"
              className="clinical-input placeholder:text-slate-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col relative">
            <label className="label-caps mb-1">Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="clinical-input placeholder:text-slate-200 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="absolute right-0 bottom-3 text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>

          <div className="pt-4 flex flex-col items-center gap-6">
            <button 
              className="w-full py-5 bg-turquesa text-white rounded-full text-lg font-medium flex items-center justify-center gap-3 soft-shadow hover:opacity-95 transition-all shadow-[0_10px_20px_rgba(0,151,178,0.2)]"
            >
              Iniciar Sesión
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            
            <a href="#" className="text-xs font-medium text-slate-400 hover:text-turquesa transition-colors">¿Olvidaste tu contraseña?</a>
          </div>
        </form>

        {/* Full Demo Access Panel */}
        {showDemo && (
          <div className="mt-10 pt-8 border-t border-slate-50 animate-in fade-in slide-in-from-top-4 duration-500">
             <p className="text-center label-caps mb-6 text-turquesa !text-[9px]">Accesos Demo Solicitados</p>
             <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleDemoLogin(UserRole.CLIENT, 'Elena R.', ServiceType.CALMA, 0)} 
                  className="text-[9px] p-3 border border-slate-100 rounded-2xl hover:bg-slate-50 font-bold uppercase tracking-tighter transition-all"
                >
                  Cliente 1 día
                </button>
                <button 
                  onClick={() => handleDemoLogin(UserRole.CLIENT, 'Elena R.', ServiceType.CALMA, 7)} 
                  className="text-[9px] p-3 border border-slate-100 rounded-2xl hover:bg-slate-50 font-bold uppercase tracking-tighter transition-all"
                >
                  Cliente 8 días
                </button>
                <button 
                  onClick={() => handleDemoLogin(UserRole.CLIENT, 'Elena R.', ServiceType.CALMA, 14)} 
                  className="text-[9px] p-3 border border-slate-100 rounded-2xl hover:bg-slate-50 font-bold uppercase tracking-tighter transition-all"
                >
                  Cliente 15 días
                </button>
                <button 
                  onClick={() => handleDemoLogin(UserRole.COORDINATOR, 'Dra. Sandra (Coord)')} 
                  className="text-[9px] p-3 border border-slate-100 rounded-2xl hover:bg-slate-50 font-bold uppercase tracking-tighter transition-all"
                >
                  Coordinador
                </button>
                <button 
                  onClick={() => handleDemoLogin(UserRole.PROFESSIONAL, 'Dr. Julián (Prof)')} 
                  className="text-[9px] p-3 border border-slate-100 rounded-2xl hover:bg-slate-50 font-bold uppercase tracking-tighter transition-all"
                >
                  Profesional
                </button>
                <button 
                  onClick={() => handleDemoLogin(UserRole.ADMIN, 'Admin Equilibrar')} 
                  className="text-[9px] p-3 bg-slate-900 text-white border border-slate-900 rounded-2xl hover:bg-black font-bold uppercase tracking-tighter transition-all"
                >
                  Administrador
                </button>
             </div>
          </div>
        )}
      </div>

      <div className="mt-12 flex flex-col items-center gap-6">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Centro Clínico Equilibrar © 2024</p>
        
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </div>
          <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
