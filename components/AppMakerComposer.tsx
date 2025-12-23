
import React, { useState } from 'react';
import { GenerationConfig } from '../types';

interface AppMakerComposerProps {
  prompt: string;
  onPromptChange: (val: string) => void;
  onGenerate: (config: GenerationConfig) => void;
  onImprove: () => void;
  isGenerating: boolean;
  isImproving: boolean;
}

const AppMakerComposer: React.FC<AppMakerComposerProps> = ({ 
  prompt, onPromptChange, onGenerate, onImprove, isGenerating, isImproving 
}) => {
  const [appType, setAppType] = useState<'web' | 'react' | 'mobile-concept'>('web');
  const [techStack, setTechStack] = useState<'none' | 'Tailwind CSS' | 'Bootstrap'>('Tailwind CSS');
  const [feature, setFeature] = useState('none');

  const features = [
    { id: 'none', label: 'Nenhum' },
    { id: 'auth', label: 'Autenticação' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'forms', label: 'Formulários' }
  ];

  return (
    <div className="w-full space-y-6">
      <div className="relative group">
        <textarea 
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Descreva seu aplicativo (ex: Um app de controle de gastos com gráficos...)"
          className="w-full bg-zinc-950 text-white rounded-2xl p-6 text-lg border border-zinc-800 focus:border-amber-400/50 transition-all resize-none min-h-[160px]"
        />
        <button 
          onClick={onImprove}
          disabled={isImproving || !prompt}
          className="absolute top-4 right-4 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-amber-400 text-xs font-bold rounded-lg border border-zinc-700 flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {isImproving ? <div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" /> : '✨'}
          Melhorar com IA
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Tipo de Projeto</label>
          <div className="flex flex-col gap-2">
            {[
              { id: 'web', label: 'Web (HTML/JS)' },
              { id: 'react', label: 'React Component' },
              { id: 'mobile-concept', label: 'Concept Design' }
            ].map(t => (
              <button 
                key={t.id}
                onClick={() => setAppType(t.id as any)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border text-left transition-all ${appType === t.id ? 'bg-amber-400 text-black border-amber-400 shadow-lg shadow-amber-400/10' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Framework CSS</label>
          <div className="flex flex-col gap-2">
            {['Tailwind CSS', 'Bootstrap', 'none'].map(s => (
              <button 
                key={s}
                onClick={() => setTechStack(s as any)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border text-left transition-all ${techStack === s ? 'bg-amber-400 text-black border-amber-400' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'}`}
              >
                {s === 'none' ? 'CSS Customizado' : s}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Recurso Chave</label>
          <div className="flex flex-col gap-2">
            {features.map(f => (
              <button 
                key={f.id}
                onClick={() => setFeature(f.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border text-left transition-all ${feature === f.id ? 'bg-amber-400 text-black border-amber-400' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button 
        disabled={isGenerating || !prompt}
        onClick={() => onGenerate({
          appType,
          techStack,
          features: feature,
          aspectRatio: '1:1',
          imageSize: '1K',
          videoResolution: '720p'
        })}
        className="w-full py-5 bg-amber-400 hover:bg-amber-300 text-black font-black rounded-2xl transition-all shadow-xl shadow-amber-400/20 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
      >
        {isGenerating ? (
          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M117.66,170.34a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L72,188.69V136a8,8,0,0,1,16,0v52.69l18.34-18.35A8,8,0,0,1,117.66,170.34ZM224,32H32A16,16,0,0,0,16,48V208a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V48A16,16,0,0,0,224,32Zm0,176H32V48H224V208Z"></path></svg>
        )}
        CONSTRUIR APLICATIVO AGORA
      </button>
    </div>
  );
};

export default AppMakerComposer;
