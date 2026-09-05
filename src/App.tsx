import React, { useState } from 'react';
import { LORE, CHARACTERS, NUISANCES } from './data';
import { CharacterCard } from './components/CharacterCard';
import { ImageModal } from './components/ImageModal';
import { Store, Moon, Users, AlertTriangle } from 'lucide-react';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  const handleImageClick = (images: string[]) => {
    setCurrentImages(images);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-900/30 blur-[120px] rounded-full"></div>
        <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Hero Section */}
      <header className="relative z-10 w-full py-32 px-6 flex flex-col items-center text-center">
        
        <Store className="w-12 h-12 text-indigo-400 mb-6" />
        <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight mb-6">
          {LORE.title} <span className="font-semibold text-indigo-400">시뮬레이션</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
          {LORE.description}
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 text-sm">
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
            <Moon className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-300">{LORE.setting}</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
            <Store className="w-4 h-4 text-pink-400" />
            <span className="text-slate-300">{LORE.operation}</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-32 space-y-32">
        
        {/* Characters Section */}
        <section id="characters" className="space-y-12">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-indigo-500/10 rounded-xl">
              <Users className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight">등장인물</h2>
              <p className="text-slate-500 mt-1">CK 강서구점 직원들</p>
            </div>
          </div>
          
          <div className="space-y-8">
            {CHARACTERS.map((char) => (
              <CharacterCard 
                key={char.id} 
                character={char} 
                onImageClick={handleImageClick} 
              />
            ))}
          </div>
        </section>

        {/* Nuisance Section */}
        <section id="nuisances" className="space-y-12 pt-12 border-t border-white/10">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-rose-500/10 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight">진상 목록</h2>
              <p className="text-slate-500 mt-1">편의점 운영에 방해를 주는 인물들</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NUISANCES.map((nuisance) => (
              <div 
                key={nuisance.id}
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-colors flex flex-col gap-4 group"
              >
                <div className="w-full h-48 rounded-2xl bg-black/40 overflow-hidden ring-1 ring-white/5">
                  <img
                    src={nuisance.image}
                    alt={nuisance.name}
                    className="w-full h-full object-cover grayscale-[30%] opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/300x200/1a1a2e/ffffff?text=' + nuisance.name;
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-200 mb-2">{nuisance.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {nuisance.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <ImageModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        images={currentImages} 
      />

    </div>
  );
}
