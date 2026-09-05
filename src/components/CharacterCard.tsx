import React from 'react';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  onImageClick: (images: string[]) => void;
}

export function CharacterCard({ character, onImageClick }: CharacterCardProps) {
  return (
    <div className="flex flex-col lg:flex-row bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-xl transition-all hover:bg-white/10">
      
      {/* Image Section */}
      <div 
        className="relative lg:w-1/3 h-80 lg:h-auto cursor-pointer group shrink-0 bg-black/40 flex items-center justify-center overflow-hidden"
        onClick={() => onImageClick(character.images)}
      >
        <img
          src={character.images[0]}
          alt={character.name}
          className="w-full h-full object-cover grayscale-[30%] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/400x600/1a1a2e/ffffff?text=' + character.name;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 w-full justify-center px-4">
          <div className="bg-black/60 backdrop-blur-sm text-xs text-slate-300 py-1.5 px-4 rounded-full border border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            이미지 갤러리 보기
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-8 lg:p-10 flex flex-col justify-center gap-6 w-full">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-3xl font-light text-white tracking-tight">{character.name}</h3>
            <span className="text-indigo-400 font-medium px-3 py-1 bg-indigo-500/10 rounded-full text-sm">
              {character.mbti}
            </span>
            <span className="text-slate-400 text-sm">{character.age}세</span>
          </div>
          <p className="text-indigo-300 font-medium text-sm mb-4">{character.role}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {character.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/10 text-white rounded-md text-xs font-medium tracking-wide border border-white/5">
                #{tag}
              </span>
            ))}
          </div>

          <p className="text-slate-300 leading-relaxed text-sm lg:text-base border-l-2 border-indigo-500/30 pl-4">
            {character.background}
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-white/10">
          <h4 className="text-sm font-semibold text-slate-200 tracking-widest uppercase">감정 자각 행동 원칙</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="text-xs font-medium text-indigo-400 mb-2 uppercase">Before</div>
              <p className="text-slate-400 text-sm leading-relaxed">{character.rules.before}</p>
            </div>
            
            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="text-xs font-medium text-pink-400 mb-2 uppercase">After</div>
              <p className="text-slate-400 text-sm leading-relaxed">{character.rules.after}</p>
            </div>
            
            <div className="bg-rose-500/5 p-4 rounded-xl border border-rose-500/20">
              <div className="text-xs font-medium text-rose-400 mb-2 uppercase">Lover</div>
              <p className="text-slate-300 text-sm leading-relaxed">{character.rules.lover}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
