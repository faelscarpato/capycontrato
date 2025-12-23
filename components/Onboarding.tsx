
import React, { useState, useEffect } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'splash' | 'welcome' | 'tutorial'>('splash');
  const [splashIcon, setSplashIcon] = useState('⚖️');
  const [logSnippet, setLogSnippet] = useState('');

  useEffect(() => {
    if (step === 'splash') {
      const icons = ['⚖️', '📜', '🖋️', '🏛️', '📅', '📂', '🔒', '✅'];
      const legalLogs = [
        'Analisando_Jurisprudência...',
        'Compilando_Cláusulas...',
        'Validando_Vigência...',
        'Drafting_Protocol...',
        'Legal_Engine_Active',
        'Sintetizando_Instrumento...',
        'Checking_Risk_Factors...',
        'Finalizing_Contract...'
      ];
      let idx = 0;
      
      const iconInterval = setInterval(() => {
        setSplashIcon(icons[idx % icons.length]);
        setLogSnippet(legalLogs[idx % legalLogs.length]);
        idx++;
      }, 500);

      const timer = setTimeout(() => {
        clearInterval(iconInterval);
        setStep('welcome');
      }, 4500);
      
      return () => {
        clearInterval(iconInterval);
        clearTimeout(timer);
      };
    }
  }, [step]);

  if (step === 'splash') {
    return (
      <div className="fixed inset-0 z-[200] neural-bg flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none font-mono text-[8px] md:text-[10px] grid grid-cols-6 md:grid-cols-12 gap-4 p-4 overflow-hidden">
            {Array.from({length: 120}).map((_, i) => (
                <div key={i} className="flex flex-col items-center whitespace-nowrap animate-pulse">
                    <span className="text-amber-400 font-black">{['ARTIGO', 'CLÁUSULA', 'FORO', 'OBJETO', 'MULTA', 'VIGÊNCIA'][i % 6]}</span>
                    <span className="text-zinc-600">[{Math.random().toString(16).slice(2, 8).toUpperCase()}]</span>
                </div>
            ))}
        </div>

        <div className="relative flex flex-col items-center">
          <div className="absolute inset-0 bg-amber-400 blur-[80px] opacity-20 animate-pulse"></div>
          
          <div className="relative flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-amber-400 rounded-[2rem] flex items-center justify-center text-black shadow-[0_0_40px_rgba(251,191,36,0.4)] relative transition-all duration-700 hover:rotate-12">
               <div className="absolute -top-12 text-3xl animate-bounce drop-shadow-lg">{splashIcon}</div>
               <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 256 256">
                 <path d="M200,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-88,88a12,12,0,1,1,12-12A12,12,0,0,1,112,120Zm48,48H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"></path>
               </svg>
            </div>
            
            <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-5xl font-black font-heading text-white tracking-tighter animate-reveal italic">
                  CapyContrato <span className="text-amber-400 not-italic">Elite</span>
                </h1>
                <div className="h-6 mt-4 overflow-hidden">
                    <p className="text-zinc-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] animate-pulse font-bold">
                        {logSnippet}
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[190] bg-zinc-950/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative animate-fade-in my-auto overflow-hidden">
        {/* Elite gradient border top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400"></div>
        
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-zinc-900 border-4 border-amber-400 rounded-3xl flex items-center justify-center animate-float shadow-2xl rotate-12">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#FBBF24" viewBox="0 0 256 256">
                <path d="M200,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32ZM112,120a12,12,0,1,1,12-12A12,12,0,0,1,112,120Zm48,48H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"></path>
            </svg>
        </div>

        {step === 'welcome' && (
          <div className="text-center space-y-6 pt-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Síntese Jurídica</h2>
              <div className="w-12 h-1 bg-amber-400 mx-auto rounded-full"></div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed font-medium">
              Transforme intenções em contratos profissionais e robustos em segundos com o motor de redação jurídica mais avançado da categoria.
            </p>
            <button 
              onClick={() => setStep('tutorial')}
              className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-black font-black rounded-2xl transition-all shadow-xl active:scale-95 text-xs uppercase tracking-widest"
            >
              Explorar Capacidades
            </button>
          </div>
        )}

        {step === 'tutorial' && (
          <div className="space-y-6 pt-10">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-black text-white uppercase tracking-tighter">Legal Intelligence Engine</h2>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Protocolos de Segurança Elite</p>
            </div>
            
            <div className="space-y-3">
              {[
                { t: "Síntese de Cláusulas", d: "Redação com rigor técnico e conformidade legal.", i: "🖋️" },
                { t: "Modelos Dinâmicos", d: "De NDAs a Contratos Sociais, tudo sob demanda.", i: "📜" },
                { t: "Canva de Edição", d: "Refine seu instrumento no editor e exporte em PDF.", i: "🖥️" }
              ].map(item => (
                <div key={item.t} className="flex gap-4 p-4 bg-zinc-950/40 rounded-2xl border border-zinc-800 hover:border-amber-400/20 transition-all group">
                  <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{item.i}</span>
                  <div>
                    <h4 className="font-black text-white text-[11px] uppercase tracking-wide">{item.t}</h4>
                    <p className="text-[10px] text-zinc-500 mt-1 leading-snug font-medium">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={onComplete}
              className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-black font-black rounded-2xl transition-all active:scale-95 text-xs uppercase tracking-widest shadow-xl shadow-amber-400/10"
            >
              Iniciar Consultoria
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
