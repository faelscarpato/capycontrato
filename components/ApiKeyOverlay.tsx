
import React, { useState } from 'react';

interface ApiKeyOverlayProps {
  onKeySelected: (manualKey?: string) => void;
  onClose: () => void;
  isValidating: boolean;
}

const ApiKeyOverlay: React.FC<ApiKeyOverlayProps> = ({ onKeySelected, onClose, isValidating }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSelectKey = async () => {
    try {
      // @ts-ignore
      if (window.aistudio?.openSelectKey) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
        onKeySelected();
      }
    } catch (e) {
      console.error("Failed to open key selector", e);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onKeySelected(inputValue.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[300] bg-[#02020a]/95 backdrop-blur-2xl flex items-center justify-center p-6 animate-fade-in">
      <div className="max-w-md w-full bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-8 md:p-10 text-center shadow-2xl relative overflow-hidden">
        {/* Elite gradient border top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400"></div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-zinc-600 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
        </button>

        <div className="relative">
          <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-400 shadow-xl group transition-transform hover:rotate-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
              <path d="M208,80H171.64A84,84,0,1,0,80,171.64V208a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V176h16a16,16,0,0,0,16-16V144h32a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM128,144a16,16,0,1,1,16-16A16,16,0,0,1,128,144Z"></path>
            </svg>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tighter uppercase">Elite Auth</h2>
          <p className="text-zinc-500 mb-8 text-xs md:text-sm leading-relaxed font-medium">
            Insira sua chave ou use o seletor nativo do <span className="text-amber-400 text-xs font-bold">Google AI Studio</span>.
          </p>
          
          <div className="space-y-4">
            <form onSubmit={handleManualSubmit} className="space-y-3 text-left">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Chave API Manual</label>
              <div className="relative group">
                <input 
                  type="password"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:border-amber-400/50 outline-none transition-all pr-10"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm125.12-37.16a16,16,0,0,0-2.24-4.84C216.5,74.12,174,48,128,48S39.5,74.12,25.12,118a16,16,0,0,0,0,20C39.5,181.88,82,208,128,208s88.5-26.12,102.88-70A16,16,0,0,0,253.12,122.84ZM128,192c-38.16,0-74.45-21-96-64,21.55-43,57.84-64,96-64s74.45,21,96,64C202.45,171,166.16,192,128,192Z"></path></svg>
                </div>
              </div>
              <button 
                type="submit"
                disabled={isValidating || !inputValue}
                className="w-full py-3 bg-zinc-100 hover:bg-white text-black font-black rounded-xl transition-all active:scale-95 disabled:opacity-50 text-xs"
              >
                {isValidating ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    VALIDANDO...
                  </div>
                ) : 'VALIDAR CHAVE MANUAL'}
              </button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold text-zinc-600"><span className="bg-zinc-950 px-2 tracking-[0.2em]">ou use o seletor</span></div>
            </div>

            <button 
              onClick={handleSelectKey}
              disabled={isValidating}
              className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-black font-black rounded-xl shadow-[0_0_40px_rgba(251,191,36,0.1)] hover:shadow-[0_0_60px_rgba(251,191,36,0.2)] transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 text-xs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                <path d="M208,80H171.64A84,84,0,1,0,80,171.64V208a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V176h16a16,16,0,0,0,16-16V144h32a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Z"></path>
              </svg>
              ABRIR SELETOR GOOGLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyOverlay;
