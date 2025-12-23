
import React from 'react';
import { GenerationType } from '../types';

interface SidebarProps {
  activeTab: GenerationType;
  onTabChange: (tab: GenerationType) => void;
  isApiKeyActive: boolean;
  onOpenKeyModal: () => void;
  installPrompt?: any;
  onInstallClick?: () => void;
}

export default function Sidebar({ 
  activeTab, 
  onTabChange, 
  isApiKeyActive, 
  onOpenKeyModal,
  installPrompt,
  onInstallClick
}: SidebarProps) {
  return (
    <nav className="fixed z-50 bg-zinc-950/80 backdrop-blur-2xl border-zinc-800 bottom-0 w-full h-auto flex flex-row items-center justify-around py-3 border-t md:left-0 md:top-0 md:bottom-0 md:w-20 md:flex-col md:justify-start md:py-10 md:gap-8 md:border-r md:border-t-0">
      <div className={`hidden md:flex w-12 h-12 rounded-2xl items-center justify-center text-black mb-10 transition-all ${isApiKeyActive ? 'bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.4)]' : 'bg-zinc-800 text-zinc-600'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256">
          <path d="M200,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-88,88a12,12,0,1,1,12-12A12,12,0,0,1,112,120Zm48,48H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"></path>
        </svg>
      </div>

      <div className="flex md:flex-col gap-6 items-center">
        <button
          onClick={() => onTabChange(GenerationType.CONTRACT)}
          className={`relative p-3 rounded-xl transition-all group bg-amber-400 text-black shadow-lg shadow-amber-400/20`}
          title="Contratos"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 256 256">
            <path d="M200,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H56V48H200V208ZM184,96H72a8,8,0,0,0,0,16H184a8,8,0,0,0,0-16Zm0,32H72a8,8,0,0,0,0,16H184a8,8,0,0,0,0-16Zm-48,32H72a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Z" />
          </svg>
          <span className="hidden md:block absolute left-full ml-4 px-3 py-1 bg-zinc-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Contratos
          </span>
        </button>

        {installPrompt && (
          <button
            onClick={onInstallClick}
            className="p-3 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20 transition-all group"
            title="Instalar Aplicativo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M208,80H176V48a16,16,0,0,0-16-16H96A16,16,0,0,0,80,48V80H48A16,16,0,0,0,32,96v96a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,48h64V80H96ZM208,192H48V96H208V192Zm-88-64v48a8,8,0,0,0,16,0V128a8,8,0,0,0-16,0Z"></path>
            </svg>
            <span className="hidden md:block absolute left-full ml-4 px-3 py-1 bg-zinc-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Instalar Elite App
            </span>
          </button>
        )}
      </div>

      <button 
        onClick={onOpenKeyModal}
        className={`md:mt-auto p-3 rounded-xl transition-all ${isApiKeyActive ? 'text-green-500 hover:bg-green-500/10' : 'text-zinc-500 hover:text-amber-400 hover:bg-zinc-900'}`}
        title="Configurar Chave API"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
          <path d="M208,80H171.64A84,84,0,1,0,80,171.64V208a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V176h16a16,16,0,0,0,16-16V144h32a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM128,144a16,16,0,1,1,16-16A16,16,0,0,1,128,144Z"></path>
        </svg>
      </button>
    </nav>
  );
}
