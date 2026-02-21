import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  Star, 
  ShieldCheck, 
  Scale, 
  Clock, 
  ChevronRight, 
  Play,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  ArrowDown
} from 'lucide-react';

// CONFIGURAÇÃO DO WHATSAPP
const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_MESSAGE = "Olá! Vim pelo site e gostaria de uma consulta jurídica.";

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const TitleReveal = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={`augen-title-reveal ${className}`}
  >
    {children}
  </motion.div>
);

const Pill = ({ children, filled = false, className = "" }: { children: React.ReactNode, filled?: boolean, className?: string }) => (
  <div className={`augen-pill ${filled ? 'augen-pill-filled' : 'text-blue'} ${className}`}>
    {children}
  </div>
);

const ArrowLink = ({ href, children, className = "" }: { href: string, children: React.ReactNode, className?: string }) => (
  <a href={href} className={`inline-flex items-center gap-4 text-[1.6rem] font-light tracking-tight text-blue group ${className}`}>
    <div className="w-10 h-6 border border-current rounded-full flex items-center justify-center overflow-hidden relative">
      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
    </div>
    <span>{children}</span>
  </a>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-off-white selection:bg-blue selection:text-white">
      {/* WHATSAPP FLUTUANTE (AUGEN STYLE) */}
      <motion.a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-10 right-10 z-50 bg-whatsapp text-white w-20 h-20 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
      >
        <div className="absolute -top-4 -left-12 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full animate-pulse shadow-lg">
          RESPOSTA RÁPIDA
        </div>
        <MessageCircle size={32} fill="currentColor" />
      </motion.a>

      {/* MENU / HEADER */}
      <header className="fixed top-0 w-full z-[100] flex justify-between items-center px-[5.1282vw] py-8 md:py-12">
        <a href="/" className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-black/5 hover:bg-white/20 transition-all">
          <Scale size={24} className="text-off-black" />
        </a>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-xl flex flex-col items-center justify-center gap-2 border border-black/5 hover:bg-white/20 transition-all"
        >
          <span className={`w-8 h-[1px] bg-off-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
          <span className={`w-8 h-[1px] bg-off-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-off-white z-[90] flex flex-col justify-center px-[5.1282vw]"
            >
              <div className="space-y-8">
                <p className="text-xs font-bold uppercase tracking-widest opacity-30">Navegação</p>
                <div className="flex flex-col gap-6">
                  {['Problemas', 'Quem Somos', 'Avaliações', 'Contato'].map((item, i) => (
                    <a 
                      key={item} 
                      href={`#${item.toLowerCase().replace(' ', '-')}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-5xl md:text-7xl font-light tracking-tighter hover:text-blue transition-colors flex items-center gap-8"
                    >
                      <span className="text-xs font-mono opacity-30">0{i+1}</span>
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-end pb-20 px-[5.1282vw] relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://picsum.photos/seed/law-hero/1920/1080?blur=2" 
              className="w-full h-full object-cover opacity-10"
              alt="Background"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-off-white via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl space-y-12">
            <Scale size={60} className="text-blue opacity-20" />
            <TitleReveal className="text-6xl md:text-9xl font-light tracking-tighter text-off-black">
              Justiça Além do <br /> <span className="text-blue italic">Convencional.</span>
            </TitleReveal>

            <div className="flex flex-wrap gap-4">
              <span className="text-xs font-bold uppercase tracking-widest opacity-50 self-center mr-4 text-off-black">Explorar</span>
              <a href={whatsappUrl}><Pill>Divórcio</Pill></a>
              <a href={whatsappUrl}><Pill>Dívidas Bancárias</Pill></a>
              <a href={whatsappUrl}><Pill>Direito do Trabalho</Pill></a>
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:right-[5.1282vw] md:translate-x-0"
          >
            <div className="w-10 h-16 border border-black/10 rounded-full flex items-center justify-center">
              <ArrowDown size={14} className="text-off-black opacity-30" />
            </div>
          </motion.div>
        </section>

        {/* INTRO SECTION */}
        <section id="problemas" className="py-32 bg-grey-light">
          <div className="augen-container">
            <div className="col-span-full md:col-span-1">
              <TitleReveal className="text-xs font-bold uppercase tracking-widest space-y-1">
                <span className="opacity-30 block">Visão Geral</span>
                <span className="block text-off-black">Inovação Jurídica</span>
              </TitleReveal>
            </div>

            <div className="col-span-full md:col-start-3 md:col-span-2 mt-12 md:mt-0 space-y-12">
              <p className="text-3xl md:text-5xl font-light tracking-tight leading-tight text-off-black">
                Somos o primeiro escritório a aplicar <span className="text-blue">Estratégia de Dados</span> e IA para acelerar a resolução de conflitos e garantir seus direitos.
              </p>
              <ArrowLink href={whatsappUrl}>Análise de Caso Gratuita</ArrowLink>
            </div>
          </div>
        </section>

        {/* COMPANY DETAILS (SERVICES BENTO) */}
        <section className="bg-off-black text-off-white py-32">
          <div className="augen-container">
            <div className="col-span-full md:col-start-3 md:col-span-2 mb-24">
              <TitleReveal className="text-xs font-bold uppercase tracking-widest space-y-1">
                <span className="opacity-30 block text-white">Nosso Escritório</span>
                <span className="block text-blue">Excelência em Resultados</span>
              </TitleReveal>
            </div>

            <div className="col-span-full md:col-start-2 md:col-span-4 grid gap-16">
              {[
                { num: "0.1", title: "Nossa Missão", desc: "Justiça rápida através de tecnologia e humanização." },
                { num: "0.2", title: "Nossa Visão", desc: "Liderar a transformação digital do direito brasileiro." },
                { num: "0.3", title: "Nossa Ambição", desc: "Simplificar o acesso jurídico para todos os cidadãos." }
              ].map((item, i) => (
                <div key={i} className="grid md:grid-cols-4 gap-8 border-b border-white/10 pb-12 last:border-0">
                  <div className="text-xs font-mono opacity-30">{item.num}</div>
                  <div className="md:col-span-3 space-y-4">
                    <h3 className="text-4xl font-light tracking-tight">{item.title}</h3>
                    <p className="text-lg opacity-50 max-w-md">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS (PROBLEM SHOWCASE) */}
        <section id="quem-somos" className="py-32 bg-off-white overflow-hidden">
          <div className="augen-container relative">
            <div className="col-span-full text-center space-y-12">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-off-black rounded-sm flex items-center justify-center">
                  <Scale size={20} className="text-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-50">Conheça Nossa</span>
              </div>

              <TitleReveal className="text-7xl md:text-[10vw] font-light tracking-tighter text-blue leading-none">
                Abordagem <br /> Resolutiva.
              </TitleReveal>

              <div className="relative h-[400px] md:h-[600px] w-full max-w-4xl mx-auto mt-20">
                <motion.div 
                  initial={{ rotate: -5, scale: 0.9 }}
                  whileInView={{ rotate: 0, scale: 1 }}
                  className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl z-10"
                >
                  <img 
                    src="https://picsum.photos/seed/legal-tech/1200/800" 
                    className="w-full h-full object-cover"
                    alt="Legal Tech"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-blue/10 mix-blend-multiply" />
                </motion.div>
                <motion.div 
                  initial={{ x: 50, y: 50 }}
                  whileInView={{ x: 0, y: 0 }}
                  className="absolute -bottom-10 -right-10 w-64 h-64 bg-white p-8 rounded-[2rem] shadow-xl z-20 hidden md:block"
                >
                  <p className="text-sm font-bold text-off-black uppercase tracking-widest mb-4">Estatísticas</p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-black/5 pb-2">
                      <span className="text-xs opacity-40">Sucesso</span>
                      <span className="text-2xl font-light text-blue">94%</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-black/5 pb-2">
                      <span className="text-xs opacity-40">Agilidade</span>
                      <span className="text-2xl font-light text-blue">2x+</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="max-w-xl mx-auto space-y-12 mt-20">
                <p className="text-xl md:text-2xl font-light tracking-tight opacity-60">
                  Estamos em uma nova fase do direito, onde a tecnologia serve ao humano para garantir resoluções em tempo recorde.
                </p>
                <div className="flex justify-center gap-4">
                  <a href={whatsappUrl}><Pill filled>Falar no WhatsApp</Pill></a>
                  <a href={whatsappUrl}><Pill>Ver Casos de Sucesso</Pill></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION (PROGRESS/AIM) */}
        <section id="avaliacoes" className="py-32 bg-off-black text-off-white">
          <div className="augen-container">
            {/* ITEM 1 */}
            <div className="col-span-full md:col-start-2 md:col-span-4 grid md:grid-cols-4 gap-12 border-b border-white/10 pb-32 mb-32">
              <div className="md:col-span-1">
                <h2 className="text-xs font-bold uppercase tracking-widest opacity-30">Nosso Progresso</h2>
              </div>
              <div className="md:col-span-1 space-y-8">
                <TitleReveal className="text-4xl font-light tracking-tight leading-tight">O Novo Método Jurídico</TitleReveal>
                <ArrowLink href={whatsappUrl} className="text-white">Ver Atualizações</ArrowLink>
              </div>
              <div className="md:col-span-2 space-y-8 text-lg opacity-50 font-light">
                <h3 className="text-white opacity-100 font-medium">Onde o futuro é digital</h3>
                <p>Na intersecção entre inovação e estratégia, redefinimos a experiência jurídica com tecnologias de ponta. Desbloqueamos novas dimensões de agilidade para o seu caso.</p>
                <p>Através de avanços em análise preditiva e automação inteligente, elevamos suas chances de sucesso. Transformamos dados em força jurídica, simplificando processos complexos.</p>
                <div className="pt-8 flex items-start gap-4">
                  <span className="text-blue text-2xl">*</span>
                  <p className="text-sm italic">Comprometidos com a defesa dos seus direitos na era da inteligência.</p>
                </div>
              </div>
            </div>

            {/* ITEM 2 */}
            <div className="col-span-full md:col-start-2 md:col-span-4 grid md:grid-cols-4 gap-12">
              <div className="md:col-span-1">
                <h2 className="text-xs font-bold uppercase tracking-widest opacity-30">Nosso Objetivo</h2>
              </div>
              <div className="md:col-span-1 space-y-8">
                <TitleReveal className="text-4xl font-light tracking-tight leading-tight">Impacto Radical na sua Vida</TitleReveal>
                <ArrowLink href={whatsappUrl} className="text-white">Nossos Programas</ArrowLink>
              </div>
              <div className="md:col-span-2 space-y-8 text-lg opacity-50 font-light">
                <h3 className="text-white opacity-100 font-medium">O futuro está em nossas mãos</h3>
                <p>Nosso objetivo é criar soluções jurídicas avançadas que se integrem perfeitamente às necessidades reais das pessoas, garantindo estabilidade e segurança.</p>
                <p>Sempre mantemos nossos clientes no centro de tudo, priorizando a segurança, acessibilidade e confiabilidade em todo o nosso processo estratégico.</p>
                <div className="pt-8 flex items-start gap-4">
                  <span className="text-blue text-2xl">*</span>
                  <p className="text-sm italic">Visualizando o futuro com uma abordagem pró-humana.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA (MASTER PLAN STYLE) */}
        <section className="py-48 bg-blue text-white text-center">
          <div className="augen-container">
            <div className="col-span-full md:col-start-2 md:col-span-3 space-y-12">
              <div className="text-xs font-mono opacity-50">1.0</div>
              <TitleReveal className="text-6xl md:text-8xl font-light tracking-tighter">Evidência Jurídica</TitleReveal>
              <p className="text-xl md:text-2xl opacity-70 font-light max-w-md mx-auto">Estratégias e resultados, movidos por dados.</p>
              <div className="pt-12">
                <a 
                  href={whatsappUrl}
                  className="inline-flex flex-col items-center gap-8 group"
                >
                  <div className="w-16 h-24 border border-white/30 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-blue transition-all">
                    <ArrowDown size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">Falar com Especialista</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-off-black text-off-white py-32">
        <div className="augen-container">
          <div className="col-span-full md:col-span-1 mb-20 md:mb-0">
            <Scale size={40} className="text-white" />
          </div>

          <div className="col-span-full md:col-start-4 md:col-span-2 space-y-24">
            <div className="flex gap-12">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest opacity-30">1.0 Páginas</p>
                <div className="flex flex-col gap-4 text-2xl font-light">
                  <a href="#problemas" className="hover:text-blue transition-colors">Problemas</a>
                  <a href="#quem-somos" className="hover:text-blue transition-colors">Quem Somos</a>
                  <a href="#avaliacoes" className="hover:text-blue transition-colors">Avaliações</a>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest opacity-30">2.0 Siga</p>
                <div className="flex flex-col gap-4 text-2xl font-light">
                  <a href="#" className="hover:text-blue transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-blue transition-colors">Instagram</a>
                </div>
              </div>
            </div>

            <div className="pt-24 border-t border-white/10 flex flex-col md:flex-row justify-between gap-8 text-xs font-light opacity-30">
              <div className="flex gap-8">
                <a href="#">Privacidade</a>
                <a href="#">Termos</a>
                <a href="#">Cookies</a>
              </div>
              <p>Brasil • OAB/SP 000.000</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
