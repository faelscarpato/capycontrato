
import React, { useState, useEffect, useRef } from 'react';

interface ContractPreviewProps {
  initialContent: string;
  onClose: () => void;
}

const ContractPreview: React.FC<ContractPreviewProps> = ({ initialContent, onClose }) => {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>CapyContrato Elite - Impressão</title>
          <style>
            body { font-family: 'Times New Roman', serif; line-height: 1.6; padding: 40px; color: black; background: white; }
            h1, h2, h3 { text-align: center; text-transform: uppercase; }
            p { margin-bottom: 15px; text-align: justify; }
            .content { white-space: pre-wrap; font-size: 12pt; }
            @media print {
              @page { margin: 2cm; }
            }
          </style>
        </head>
        <body>
          <div class="content">${content}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const downloadTxt = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `capycontrato-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl flex flex-col animate-fade-in overflow-hidden">
      {/* Header / Toolbar */}
      <header className="flex items-center justify-between p-4 md:p-6 border-b border-zinc-800 bg-zinc-950/50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-black shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.32,96A16,16,0,0,0,227.32,73.37ZM192,108.69,147.31,64l24-24L216,84.69Z"></path></svg>
          </div>
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-xs md:text-sm">Canva de Edição Elite</h3>
            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-tighter">Modo: {isEditing ? 'Edição Ativa' : 'Visualização Prévia'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            <button 
              onClick={() => setIsEditing(true)}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${isEditing ? 'bg-amber-400 text-black shadow-sm' : 'text-zinc-500 hover:text-white'}`}
            >
              Editor
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${!isEditing ? 'bg-amber-400 text-black shadow-sm' : 'text-zinc-500 hover:text-white'}`}
            >
              Preview
            </button>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={handlePrint}
              className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-[10px] font-black transition-all flex items-center gap-2 border border-zinc-700"
              title="Imprimir ou Salvar como PDF"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M224,96h-8V48a16,16,0,0,0-16-16H56A16,16,0,0,0,40,48V96H32a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h8v32a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V192h8a16,16,0,0,0,16-16V112A16,16,0,0,0,224,96ZM56,48H200V96H56Zm144,160H56V160H200v48Zm32-48a8,8,0,0,1-8,8h-8V152a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v16h-8a8,8,0,0,1-8-8V112a8,8,0,0,1,8-8H224a8,8,0,0,1,8,8Z"></path></svg>
              PDF/PRINT
            </button>
            <button 
              onClick={downloadTxt}
              className="px-3 py-2 bg-amber-400 hover:bg-amber-300 text-black rounded-xl text-[10px] font-black transition-all"
            >
              TXT
            </button>
          </div>

          <button 
            onClick={onClose} 
            className="p-2 bg-zinc-800 text-white rounded-full hover:bg-red-500 transition-colors border border-zinc-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
          </button>
        </div>
      </header>

      {/* Editor / Preview Area */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 p-4 md:p-10 bg-[#02020a] overflow-hidden">
        {/* Main Canvas */}
        <div className={`flex-1 h-full bg-white rounded-[2rem] shadow-2xl relative transition-all duration-500 flex flex-col overflow-hidden ${isEditing ? 'ring-4 ring-amber-400/20' : ''}`}>
          <div className="absolute top-0 inset-x-0 h-12 bg-zinc-50 border-b border-zinc-200 flex items-center px-8 justify-between">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            </div>
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Digital Instrument</span>
          </div>
          
          <div className="flex-1 mt-12 overflow-y-auto custom-scrollbar">
            {isEditing ? (
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-full p-8 md:p-16 text-zinc-800 font-serif text-lg leading-relaxed focus:outline-none resize-none bg-transparent"
                spellCheck={false}
              />
            ) : (
              <div className="p-8 md:p-16 text-zinc-800 font-serif text-lg leading-relaxed whitespace-pre-wrap select-text animate-fade-in">
                {content}
              </div>
            )}
          </div>
        </div>

        {/* Action Panel (Desktop Only) */}
        <div className="hidden lg:flex w-72 flex-col gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Propriedades</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Caracteres</span>
                <span className="text-white font-bold">{content.length}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Palavras</span>
                <span className="text-white font-bold">{content.split(/\s+/).filter(x => x).length}</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-400/5 border border-amber-400/20 rounded-3xl p-6">
            <h4 className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-3 italic">Dica Elite</h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
              Utilize o modo <strong className="text-white">PDF/PRINT</strong> para gerar um documento formatado pronto para assinatura física ou digital.
            </p>
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d4d4d8; }
      `}</style>
    </div>
  );
};

export default ContractPreview;
