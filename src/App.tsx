import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Download, Gamepad2, Twitch, Youtube, Instagram, Twitter, MonitorPlay, Zap, Sparkles, Upload, Trash2, Facebook, Github, MessageSquare, Image as ImageIcon } from 'lucide-react';

type Theme = {
  id: string;
  name: string;
  bgClass: string;
  textClass: string;
  accentClass: string;
  pattern: string;
};

const THEMES: Theme[] = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    bgClass: 'bg-zinc-950',
    textClass: 'text-white',
    accentClass: 'text-yellow-400',
    pattern: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-zinc-950 to-zinc-950',
  },
  {
    id: 'toxic',
    name: 'Toxic Green',
    bgClass: 'bg-black',
    textClass: 'text-white',
    accentClass: 'text-green-500',
    pattern: 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-900/30 via-black to-black',
  },
  {
    id: 'blood',
    name: 'Blood Red',
    bgClass: 'bg-zinc-900',
    textClass: 'text-white',
    accentClass: 'text-red-600',
    pattern: 'bg-[linear-gradient(to_right_bottom,_var(--tw-gradient-stops))] from-red-950/50 via-zinc-900 to-zinc-950',
  },
  {
    id: 'ocean',
    name: 'Deep Ocean',
    bgClass: 'bg-slate-950',
    textClass: 'text-white',
    accentClass: 'text-cyan-400',
    pattern: 'bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950',
  },
  {
    id: 'clean',
    name: 'Clean Light',
    bgClass: 'bg-gray-100',
    textClass: 'text-zinc-900',
    accentClass: 'text-indigo-600',
    pattern: 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]',
  }
];

type SocialPlatform = 'twitch' | 'youtube' | 'instagram' | 'twitter' | 'facebook' | 'discord' | 'github';

type Social = {
  id: string;
  platform: SocialPlatform;
  handle: string;
  enabled: boolean;
};

const renderSocialIcon = (platform: string, className: string) => {
  switch (platform) {
    case 'twitch': return <Twitch size={24} className={className} />;
    case 'youtube': return <Youtube size={24} className={className} />;
    case 'instagram': return <Instagram size={24} className={className} />;
    case 'twitter': return <Twitter size={24} className={className} />;
    case 'facebook': return <Facebook size={24} className={className} />;
    case 'discord': return <MessageSquare size={24} className={className} />;
    case 'github': return <Github size={24} className={className} />;
    default: return null;
  }
};

export default function App() {
  const [theme, setTheme] = useState<Theme>(THEMES[0]);
  const [mainName, setMainName] = useState('LEONMONTEIRO');
  const [mainNameHighlight, setMainNameHighlight] = useState('GG');
  const [subtitle, setSubtitle] = useState('LIVES TODOS OS DIAS');
  const [showSocials, setShowSocials] = useState(true);
  const [iconStyle, setIconStyle] = useState<'gamepad' | 'monitor' | 'zap' | 'none'>('gamepad');
  const [bgImage, setBgImage] = useState<string | null>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const [socials, setSocials] = useState<Social[]>([
    { id: '1', platform: 'twitch', handle: '/leonmonteirogg', enabled: true },
    { id: '2', platform: 'youtube', handle: '/leonmonteirogg', enabled: true },
    { id: '3', platform: 'instagram', handle: '@leonmonteirogg', enabled: true },
    { id: '4', platform: 'twitter', handle: '@leonmonteirogg', enabled: false },
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateSocial = (id: string, field: keyof Social, value: any) => {
    setSocials(socials.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleDownload = async () => {
    if (!bannerRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(bannerRef.current, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: null,
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${mainName}${mainNameHighlight}_Banner.png`;
      link.click();
    } catch (err) {
      console.error('Failed to download banner', err);
      alert('Erro ao baixar o banner.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 font-sans p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-7xl space-y-8">
        
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Gerador de Banner & Thumbnail</h1>
          <p className="text-zinc-500">Personalize tudo: textos, fundo, ícones e redes sociais</p>
        </header>

        {/* Banner Preview Area */}
        <div className="w-full overflow-x-auto pb-4 flex justify-center">
          <div 
            className="relative shadow-2xl rounded-lg overflow-hidden shrink-0"
            style={{ width: '1200px', height: '480px' }}
          >
            {/* The actual banner to be captured */}
            <div 
              ref={bannerRef}
              className={`w-full h-full relative flex flex-col items-center justify-center overflow-hidden ${theme.bgClass} ${theme.textClass}`}
            >
              {/* Background Image */}
              {bgImage && (
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40"
                  style={{ backgroundImage: `url(${bgImage})` }}
                ></div>
              )}

              {/* Background Pattern */}
              <div className={`absolute inset-0 ${theme.pattern} ${bgImage ? 'opacity-60 mix-blend-multiply' : 'opacity-80'}`}></div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-current to-transparent opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-current to-transparent opacity-20"></div>
              
              <div className="absolute -left-32 -top-32 w-96 h-96 bg-current opacity-5 rounded-full blur-3xl"></div>
              <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-current opacity-5 rounded-full blur-3xl"></div>

              {/* Main Content */}
              <div className="relative z-10 flex flex-col items-center justify-center space-y-6 w-full px-12">
                
                {/* Icon */}
                {iconStyle !== 'none' && (
                  <div className={`p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl ${theme.accentClass}`}>
                    {iconStyle === 'gamepad' && <Gamepad2 size={64} strokeWidth={1.5} />}
                    {iconStyle === 'monitor' && <MonitorPlay size={64} strokeWidth={1.5} />}
                    {iconStyle === 'zap' && <Zap size={64} strokeWidth={1.5} />}
                  </div>
                )}

                {/* Title */}
                <div className="text-center">
                  <h1 
                    className="font-display text-[120px] leading-none tracking-tight uppercase"
                    style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                  >
                    {mainName}<span className={theme.accentClass}>{mainNameHighlight}</span>
                  </h1>
                  
                  {/* Subtitle */}
                  {subtitle && (
                    <div className="mt-4 flex items-center justify-center space-x-4">
                      <div className={`h-[2px] w-16 ${theme.accentClass} bg-current opacity-50`}></div>
                      <p className="font-oswald text-2xl tracking-[0.2em] uppercase font-medium opacity-90">
                        {subtitle}
                      </p>
                      <div className={`h-[2px] w-16 ${theme.accentClass} bg-current opacity-50`}></div>
                    </div>
                  )}
                </div>

                {/* Socials */}
                {showSocials && (
                  <div className="absolute bottom-12 flex items-center space-x-8 opacity-80 font-mono text-lg">
                    {socials.filter(s => s.enabled).map(social => (
                      <div key={social.id} className="flex items-center space-x-2">
                        {renderSocialIcon(social.platform, theme.accentClass)}
                        <span>{social.handle}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Visuals */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-700 uppercase tracking-wider">Tema de Cores</label>
              <div className="grid grid-cols-1 gap-2">
                {THEMES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium text-left transition-colors ${
                      theme.id === t.id 
                        ? 'bg-zinc-900 text-white' 
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-700 uppercase tracking-wider">Ícone Principal</label>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setIconStyle('gamepad')}
                  className={`p-3 rounded-lg flex justify-center transition-colors ${iconStyle === 'gamepad' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
                >
                  <Gamepad2 size={20} />
                </button>
                <button
                  onClick={() => setIconStyle('monitor')}
                  className={`p-3 rounded-lg flex justify-center transition-colors ${iconStyle === 'monitor' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
                >
                  <MonitorPlay size={20} />
                </button>
                <button
                  onClick={() => setIconStyle('zap')}
                  className={`p-3 rounded-lg flex justify-center transition-colors ${iconStyle === 'zap' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
                >
                  <Zap size={20} />
                </button>
                <button
                  onClick={() => setIconStyle('none')}
                  className={`p-3 rounded-lg flex justify-center transition-colors text-xs font-bold items-center ${iconStyle === 'none' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
                >
                  OFF
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-700 uppercase tracking-wider">Imagem de Fundo</label>
              <div className="flex items-center space-x-2">
                <label className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg cursor-pointer transition-colors text-sm font-medium">
                  <Upload size={16} />
                  <span>{bgImage ? 'Trocar Imagem' : 'Enviar Imagem'}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {bgImage && (
                  <button 
                    onClick={() => setBgImage(null)}
                    className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors"
                    title="Remover imagem"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Texts */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-700 uppercase tracking-wider">Texto Principal</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={mainName}
                  onChange={(e) => setMainName(e.target.value)}
                  className="w-2/3 px-4 py-2 rounded-lg bg-zinc-100 border-transparent focus:border-zinc-300 focus:bg-white focus:ring-0 transition-colors text-sm font-bold"
                  placeholder="Nome"
                />
                <input
                  type="text"
                  value={mainNameHighlight}
                  onChange={(e) => setMainNameHighlight(e.target.value)}
                  className="w-1/3 px-4 py-2 rounded-lg bg-zinc-100 border-transparent focus:border-zinc-300 focus:bg-white focus:ring-0 transition-colors text-sm font-bold text-indigo-600"
                  placeholder="Destaque"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-700 uppercase tracking-wider">Subtítulo</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-zinc-100 border-transparent focus:border-zinc-300 focus:bg-white focus:ring-0 transition-colors text-sm"
                placeholder="Ex: LIVES TODOS OS DIAS"
              />
            </div>

            <div className="pt-4 border-t border-zinc-100">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full py-4 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {isDownloading ? (
                  <Sparkles className="animate-pulse" size={20} />
                ) : (
                  <Download size={20} />
                )}
                <span>{isDownloading ? 'Gerando Imagem...' : 'Baixar Imagem (PNG)'}</span>
              </button>
            </div>
          </div>

          {/* Column 3: Socials */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-zinc-700 uppercase tracking-wider">Redes Sociais</label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showSocials}
                  onChange={(e) => setShowSocials(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-zinc-300 focus:ring-indigo-600"
                />
                <span className="text-xs font-medium text-zinc-500">Mostrar</span>
              </label>
            </div>
            
            <div className={`space-y-3 ${!showSocials ? 'opacity-50 pointer-events-none' : ''}`}>
              {socials.map((social) => (
                <div key={social.id} className="flex items-center space-x-2">
                  <button
                    onClick={() => updateSocial(social.id, 'enabled', !social.enabled)}
                    className={`p-2 rounded-lg transition-colors ${social.enabled ? 'bg-indigo-100 text-indigo-600' : 'bg-zinc-100 text-zinc-400'}`}
                  >
                    {renderSocialIcon(social.platform, 'w-4 h-4')}
                  </button>
                  <select
                    value={social.platform}
                    onChange={(e) => updateSocial(social.id, 'platform', e.target.value)}
                    className="w-28 px-2 py-2 rounded-lg bg-zinc-100 border-transparent focus:border-zinc-300 focus:bg-white focus:ring-0 transition-colors text-xs font-medium"
                  >
                    <option value="twitch">Twitch</option>
                    <option value="youtube">YouTube</option>
                    <option value="instagram">Instagram</option>
                    <option value="twitter">Twitter</option>
                    <option value="facebook">Facebook</option>
                    <option value="discord">Discord</option>
                    <option value="github">GitHub</option>
                  </select>
                  <input
                    type="text"
                    value={social.handle}
                    onChange={(e) => updateSocial(social.id, 'handle', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-zinc-100 border-transparent focus:border-zinc-300 focus:bg-white focus:ring-0 transition-colors text-xs font-mono"
                    placeholder="@usuario"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
