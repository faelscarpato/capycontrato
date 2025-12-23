
import React, { useState } from 'react';
import { MediaItem } from '../types';

interface MediaGridProps {
  items: MediaItem[];
}

const MediaGrid: React.FC<MediaGridProps> = ({ items }) => {
  const [previewContent, setPreviewContent] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-24 border-2 border-dashed border-zinc-900 rounded-3xl opacity-50">
        <p className="text-zinc-600 font-medium">Nenhum contrato no repositório.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-amber-400/30 transition-all shadow-xl">
            <div className="aspect-[4/3] bg-zinc-950 flex items-center justify-center overflow-hidden relative p-4">
              <div className="h-full w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 overflow-hidden text-[8px] text-zinc-500 font-serif leading-tight relative">
                 <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-zinc-950 to-transparent"></div>
                 {item.url.slice(0, 300)}...
                 <button 
                  onClick={() => setPreviewContent(item.url)}
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="bg-amber-400 text-black px-4 py-2 rounded-lg font-bold text-xs">VISUALIZAR</span>
                </button>
              </div>
            </div>
            
            <div className="p-4 bg-zinc-900/90">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-amber-400/10 text-amber-400">
                  Contrato
                </span>
                <span className="text-[10px] text-zinc-600">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-zinc-400 text-xs line-clamp-2 font-medium">{item.prompt}</p>
              
              <div className="mt-4 flex gap-2">
                 <button 
                   onClick={() => setPreviewContent(item.url)}
                   className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold transition-colors"
                 >
                   Abrir
                 </button>
                 <button 
                   onClick={() => { navigator.clipboard.writeText(item.url); alert('Texto copiado!'); }} 
                   className="p-2 bg-zinc-800 text-zinc-400 rounded-lg hover:text-white"
                   title="Copiar texto"
                 >
                   📋
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {previewContent && (
        <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl flex flex-col p-4 md:p-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
               Preview do Instrumento
            </h3>
            <button onClick={() => setPreviewContent(null)} className="p-2 bg-zinc-800 text-white rounded-full hover:bg-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
            </button>
          </div>
          <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl overflow-y-auto p-8 md:p-12 text-zinc-300 font-serif leading-relaxed text-lg whitespace-pre-wrap select-text">
            {previewContent}
          </div>
        </div>
      )}
    </>
  );
};

export default MediaGrid;
