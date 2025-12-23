
import React, { useState, useEffect } from 'react';
import { GenerationType, MediaItem, ContractDetails } from './types';
import Sidebar from './components/Sidebar';
import ContractComposer from './components/ContractComposer';
import MediaGrid from './components/MediaGrid';
import ApiKeyOverlay from './components/ApiKeyOverlay';
import Onboarding from './components/Onboarding';
import Toast from './components/Toast';
import ContractPreview from './components/ContractPreview';
import { GeminiService } from './services/geminiService';

const gemini = new GeminiService();

export default function App() {
  const [activeTab, setActiveTab] = useState<GenerationType>(GenerationType.CONTRACT);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [isApiKeyActive, setIsApiKeyActive] = useState(false);
  const [isValidatingKey, setIsValidatingKey] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [toasts, setToasts] = useState<{id: number, message: string, type: 'success' | 'error' | 'info'}[]>([]);
  const [activeContract, setActiveContract] = useState<string | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const savedItems = localStorage.getItem('capy-contracts');
    if (savedItems) setItems(JSON.parse(savedItems));
    const onboardingDone = localStorage.getItem('capy-onboarding-contracts');
    if (onboardingDone) setShowOnboarding(false);
    checkApiKey();

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  useEffect(() => {
    localStorage.setItem('capy-contracts', JSON.stringify(items));
  }, [items]);

  const checkApiKey = async () => {
    const isValid = await gemini.validateKey();
    setIsApiKeyActive(isValid);
    return isValid;
  };

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleGenerateContract = async (details: ContractDetails) => {
    if (!isApiKeyActive) {
      setShowKeyModal(true);
      return;
    }

    setIsGenerating(true);
    try {
      const content = await gemini.generateContract(details);
      const newItem: MediaItem = {
        id: Date.now().toString(),
        type: 'contract',
        url: content,
        prompt: `Contrato: ${details.type}`,
        timestamp: Date.now()
      };
      setItems(prev => [newItem, ...prev]);
      setActiveContract(content);
      addToast("Instrumento jurídico gerado com sucesso!");
    } catch (error) {
      addToast("Falha na síntese jurídica", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeySelected = async () => {
    setIsValidatingKey(true);
    try {
      const isValid = await checkApiKey();
      if (isValid) {
        addToast("Chave validada e ativa!", "success");
        setShowKeyModal(false);
      } else {
        addToast("Chave inválida ou erro de conexão", "error");
      }
    } finally {
      setIsValidatingKey(false);
    }
  };

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-amber-400 selection:text-black overflow-x-hidden">
      {showOnboarding && <Onboarding onComplete={() => {
        setShowOnboarding(false);
        localStorage.setItem('capy-onboarding-contracts', 'true');
      }} />}
      
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        isApiKeyActive={isApiKeyActive}
        onOpenKeyModal={() => setShowKeyModal(true)}
        installPrompt={deferredPrompt}
        onInstallClick={handleInstallApp}
      />

      <main className="pb-24 md:pb-10 md:pl-24 pt-10 px-6 max-w-7xl mx-auto space-y-12">
        <header className="space-y-2 animate-reveal">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 md:w-12 md:h-12 bg-amber-400 rounded-xl flex items-center justify-center text-black">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M200,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32ZM184,96H72a8,8,0,0,0,0,16H184a8,8,0,0,0,0-16Zm0,32H72a8,8,0,0,0,0,16H184a8,8,0,0,0,0-16Zm-48,32H72a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Z"></path></svg>
             </div>
             <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
               CapyContrato <span className="text-amber-400 not-italic">Elite</span>
             </h1>
          </div>
          <p className="text-zinc-500 font-medium max-w-xl leading-relaxed text-xs md:text-sm">
            Assistente jurídico avançado para síntese de documentos legais e instrumentos particulares com rigor profissional.
          </p>
        </header>

        <section className="flex justify-center">
           <ContractComposer onGenerate={handleGenerateContract} isGenerating={isGenerating} />
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <h2 className="text-[10px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
              Histórico de Instrumentos
            </h2>
            <button 
              onClick={() => {if(window.confirm('Excluir histórico jurídico?')) {setItems([]); localStorage.removeItem('capy-contracts');}}}
              className="text-[10px] font-bold text-zinc-600 hover:text-red-500 transition-colors uppercase tracking-widest"
            >
              Limpar Repositório
            </button>
          </div>
          <MediaGrid items={items} />
        </section>
      </main>

      {showKeyModal && (
        <ApiKeyOverlay 
          onKeySelected={handleKeySelected} 
          onClose={() => setShowKeyModal(false)}
          isValidating={isValidatingKey}
        />
      )}

      {activeContract && (
        <ContractPreview initialContent={activeContract} onClose={() => setActiveContract(null)} />
      )}

      <div className="fixed top-0 right-0 p-6 flex flex-col gap-3 pointer-events-none z-[120]">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
