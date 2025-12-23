
import React, { useState } from 'react';
import { ContractDetails } from '../types';

interface ContractComposerProps {
  onGenerate: (details: ContractDetails) => void;
  isGenerating: boolean;
}

const ContractComposer: React.FC<ContractComposerProps> = ({ onGenerate, isGenerating }) => {
  const [details, setDetails] = useState<ContractDetails>({
    type: 'Prestação de Serviços',
    parties: '',
    clauses: '',
    tone: 'formal'
  });

  const [customType, setCustomType] = useState('');

  const contractPresets = [
    'Prestação de Serviços',
    'Locação Imobiliária',
    'Acordo de Confidencialidade (NDA)',
    'Cessão de Direitos Autorais',
    'Vesting de Startup',
    'Contrato Social Ltda.',
    'Compra e Venda',
    'Outro (Especificar)'
  ];

  const handleSubmit = () => {
    const finalType = details.type === 'Outro (Especificar)' ? customType : details.type;
    onGenerate({ ...details, type: finalType });
  };

  return (
    <div className="w-full max-w-4xl bg-zinc-900/40 backdrop-blur-3xl border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl space-y-8 animate-fade-in">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <div className="w-1 h-1 bg-amber-400 rounded-full"></div> Natureza Jurídica
            </label>
            <select 
              value={details.type}
              onChange={(e) => setDetails({ ...details, type: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-400 outline-none"
            >
              {contractPresets.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <div className="w-1 h-1 bg-amber-400 rounded-full"></div> Rigor da Redação
            </label>
            <div className="flex gap-2">
              {(['formal', 'amigável', 'rígido'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setDetails({ ...details, tone: t })}
                  className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold border transition-all uppercase tracking-tighter ${details.tone === t ? 'bg-amber-400 text-black border-amber-400' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {details.type === 'Outro (Especificar)' && (
          <div className="space-y-3 animate-slide-up">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Especifique o Tipo</label>
            <input 
              type="text"
              placeholder="Ex: Contrato de Namoro, Parceria de Influencer..."
              value={customType}
              onChange={(e) => setCustomType(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-400 outline-none"
            />
          </div>
        )}

        <div className="space-y-3">
          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Qualificação das Partes (Opcional)</label>
          <input 
            type="text"
            placeholder="Ex: Contratante X (Empresa Alpha), Contratado Y (João Silva)..."
            value={details.parties}
            onChange={(e) => setDetails({ ...details, parties: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-400 outline-none"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Cláusulas Específicas / Detalhes do Acordo</label>
          <textarea 
            placeholder="Descreva o objeto, valores, prazos e qualquer regra particular..."
            value={details.clauses}
            onChange={(e) => setDetails({ ...details, clauses: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-sm text-white focus:border-amber-400 outline-none min-h-[150px] resize-none"
          />
        </div>
      </div>

      <button 
        disabled={isGenerating || (details.type === 'Outro (Especificar)' && !customType)}
        onClick={handleSubmit}
        className="w-full py-6 bg-amber-400 hover:bg-amber-300 text-black font-black rounded-3xl transition-all shadow-xl shadow-amber-400/20 flex items-center justify-center gap-3 text-lg active:scale-[0.98] disabled:grayscale disabled:opacity-50"
      >
        {isGenerating ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ELABORANDO INSTRUMENTO...
          </div>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,66.34l-40-40A8,8,0,0,0,168,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V72A8,8,0,0,0,213.66,66.34ZM168,44l28,28H168ZM200,216H56V40h96V80a8,8,0,0,0,8,8h40V216ZM184,120H72a8,8,0,0,0,0,16H184a8,8,0,0,0,0-16Zm0,32H72a8,8,0,0,0,0,16H184a8,8,0,0,0,0-16Zm-48,32H72a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Z"></path></svg>
            SINTETIZAR CONTRATO ELITE
          </>
        )}
      </button>
    </div>
  );
};

export default ContractComposer;
