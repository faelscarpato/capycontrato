
import React, { useState } from 'react';
import { GenerationType, AppConfig } from '../types';

interface AppComposerProps {
  activeTab: GenerationType;
  onGenerate: (prompt: string, config: AppConfig) => void;
  isGenerating: boolean;
}

const AppComposer: React.FC<AppComposerProps> = ({ activeTab, onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const [isImproving, setIsImproving] = useState(false);
  const [techStack, setTechStack] = useState<'Tailwind CSS' | 'Bootstrap' | 'Vanilla CSS'>('Tailwind CSS');
  const [features, setFeatures] = useState('Responsive, Dark Mode, Modern UI');

  const handleImprove = async () => {
    if (!prompt || isImproving) return;
    setIsImproving(true);
    try {
      const event = new CustomEvent('improve-prompt', { detail: prompt });
      window.dispatchEvent(event);
    } finally {
      setIsImproving(false);
    }
  };

  React.useEffect(() => {
    const handler = (e: any) => setPrompt(e.detail);
    window.addEventListener('prompt-improved', handler);
    return () => window.removeEventListener('prompt-improved', handler);
  }, []);

  return (
    <div className="w-full max-w-4xl bg-zinc-900/40 backdrop-blur-3xl border border-zinc-800 rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-8 shadow-2xl space-y-6 md:space-y-8">
      <div className="relative group">
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Descreva o aplicativo... (ex: Dashboard de Vendas com gráficos)"
          className="w-full bg-zinc-950 text-white rounded-2xl md:rounded-3xl p-5 md:p-8 text-sm md:text-lg border border-zinc-800 focus:border-amber-400/50 outline-none transition-all resize-none min-h-[120px] md:min-h-[180px] shadow-inner"
        />
        <button 
          onClick={handleImprove}
          disabled={!prompt || isImproving}
          className="absolute top-3 right-3 md:top-4 md:right-4 px-3 py-1.5 md:px-4 md:py-2 bg-zinc-800/80 hover:bg-amber-400 hover:text-black text-amber-400 text-[10px] font-bold rounded-lg md:rounded-xl border border-zinc-700 transition-all disabled:opacity-50"
        >
          {isImproving ? 'Refinando...' : '✨ Refinar Prompt'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-3">
          <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <div className="w-1 h-1 bg-amber-400 rounded-full"></div> UI Tech Stack
          </label>
          <div className="flex gap-2">
            {['Tailwind CSS', 'Bootstrap', 'Vanilla CSS'].map((stack) => (
              <button
                key={stack}
                onClick={() => setTechStack(stack as any)}
                className={`flex-1 py-2.5 px-1 rounded-xl text-[10px] md:text-xs font-bold border transition-all ${techStack === stack ? 'bg-amber-400 text-black border-amber-400 shadow-md' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'}`}
              >
                {stack.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <div className="w-1 h-1 bg-amber-400 rounded-full"></div> Core Features
          </label>
          <input 
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-300 text-[10px] md:text-xs focus:border-amber-400/50 outline-none"
          />
        </div>
      </div>

      <button 
        disabled={isGenerating || !prompt}
        onClick={() => onGenerate(prompt, { appType: activeTab, techStack, features })}
        className="w-full py-4 md:py-6 bg-amber-400 hover:bg-amber-300 text-black font-black rounded-2xl md:rounded-3xl transition-all shadow-xl shadow-amber-400/20 flex items-center justify-center gap-3 text-sm md:text-lg active:scale-[0.98] disabled:grayscale disabled:opacity-50"
      >
        {isGenerating ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            SINTETIZANDO...
          </div>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M117.66,170.34a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L72,188.69V136a8,8,0,0,1,16,0v52.69l18.34-18.35A8,8,0,0,1,117.66,170.34Zm115.31,16.66l-32-32a8,8,0,0,0-11.32,0l-32,32a8,8,0,0,0,11.32,11.32L184,180.05l.31,44a8,8,0,0,0,16,0L200,180.05l18.34,18.35a8,8,0,0,0,11.32-11.4ZM208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"></path></svg>
            GENERATE ELITE APP
          </>
        )}
      </button>
    </div>
  );
};

export default AppComposer;
