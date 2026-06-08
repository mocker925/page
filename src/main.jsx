import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const navItems = ['首页', '经历', '精选项目', '作品', '联系'];

const contacts = [
  { label: 'Email', value: 'contact@gamertag.dev' },
  { label: 'Bilibili', value: '@战术频道' },
  { label: 'Discord', value: 'callsign#2042' },
];

const experienceProjects = [
  '多人射击玩法拆解',
  '关卡节奏与动线设计',
  '游戏评测与长文专栏',
  '独立原型与系统设计',
];

const preferences = [
  {
    title: 'TACTICAL FPS',
    tag: '高压对抗',
    desc: '偏爱强反馈枪感、载具协同、职业分工与信息差博弈，关注每一轮交火前后的选择成本。',
  },
  {
    title: 'SYSTEMIC WARFARE',
    tag: '大战场系统',
    desc: '喜欢可被玩家扰动的沙盒战场：压制、破坏、烟雾、声音与地形共同影响局势。',
  },
  {
    title: 'LEVEL FLOW',
    tag: '地图节奏',
    desc: '长期研究出生点、掩体密度、视线长度、夺点路径与队伍回流带来的体验曲线。',
  },
];

const works = [
  {
    type: '文章',
    title: '为什么一张好地图会让失败也很爽',
    meta: 'Level Design / 12 min read',
  },
  {
    type: '文章',
    title: '从压制感到可读性：大战场射击的声音设计',
    meta: 'Game Audio / 9 min read',
  },
  {
    type: '作品',
    title: '代号 RALLY POINT：小队夺点原型',
    meta: 'Prototype / Unreal blockout',
  },
  {
    type: '作品',
    title: 'HUD 指挥层：战术信息界面练习',
    meta: 'UI Design / Interaction mockup',
  },
];

function CanvasVideoBackground() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    let animationFrame = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const draw = (time) => {
      if (!running) return;

      const width = canvas.width;
      const height = canvas.height;
      const t = time * 0.001;

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#07111c');
      gradient.addColorStop(0.35, '#0c1a24');
      gradient.addColorStop(0.7, '#151211');
      gradient.addColorStop(1, '#311506');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < 34; i += 1) {
        const y = ((i * 97 + t * 54) % (height + 180)) - 90;
        const alpha = 0.04 + (i % 5) * 0.012;
        ctx.strokeStyle = i % 3 === 0 ? `rgba(255,111,31,${alpha})` : `rgba(77,211,255,${alpha})`;
        ctx.lineWidth = (i % 4 === 0 ? 2 : 1) * dpr;
        ctx.beginPath();
        ctx.moveTo(-80 * dpr, y);
        ctx.lineTo(width * 0.42 + Math.sin(t + i) * 80 * dpr, y - 130 * dpr);
        ctx.lineTo(width + 120 * dpr, y - 70 * dpr);
        ctx.stroke();
      }

      for (let i = 0; i < 70; i += 1) {
        const x = (Math.sin(i * 31.7) * 0.5 + 0.5) * width;
        const y = ((Math.cos(i * 13.2) * 0.5 + 0.5) * height + t * (18 + (i % 9))) % height;
        ctx.fillStyle = i % 6 === 0 ? 'rgba(255,121,44,.22)' : 'rgba(119,225,255,.16)';
        ctx.fillRect(x, y, (2 + (i % 4)) * dpr, (2 + (i % 3)) * dpr);
      }

      const sweep = (Math.sin(t * 0.45) * 0.5 + 0.5) * width;
      const sweepGradient = ctx.createLinearGradient(sweep - 280 * dpr, 0, sweep + 280 * dpr, 0);
      sweepGradient.addColorStop(0, 'rgba(28,193,255,0)');
      sweepGradient.addColorStop(0.5, 'rgba(28,193,255,.13)');
      sweepGradient.addColorStop(1, 'rgba(255,115,28,0)');
      ctx.fillStyle = sweepGradient;
      ctx.fillRect(sweep - 280 * dpr, 0, 560 * dpr, height);
      ctx.restore();

      ctx.fillStyle = 'rgba(0,0,0,.18)';
      for (let y = 0; y < height; y += 5 * dpr) {
        ctx.fillRect(0, y, width, 1 * dpr);
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    animationFrame = requestAnimationFrame(draw);

    try {
      const stream = canvas.captureStream(30);
      video.srcObject = stream;
      video.muted = true;
      video.playsInline = true;
      video.play().catch(() => {});
    } catch {
      video.classList.add('is-hidden');
    }

    return () => {
      running = false;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      if (video.srcObject) {
        video.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <>
      <canvas className="video-canvas" ref={canvasRef} aria-hidden="true" />
      <video className="hero-video" ref={videoRef} autoPlay muted playsInline aria-hidden="true" />
    </>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="返回首页">
        <span className="brand-mark">03</span>
        <span>TACTICAL FEED</span>
      </a>
      <nav aria-label="主导航">
        {navItems.map((item) => (
          <a key={item} href={`#${item === '首页' ? 'home' : item}`}>
            {item}
          </a>
        ))}
      </nav>
      <a className="header-contact" href="mailto:contact@gamertag.dev">联系我</a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <CanvasVideoBackground />
      <div className="hero-noise" />
      <Header />
      <div className="hero-inner shell">
        <div className="status-line">
          <span>PLAYER</span>
          <span>BLOGGER</span>
          <span>GAME DESIGNER</span>
          <span>ONLINE</span>
        </div>
        <h1>BUILDING GAMES FROM THE FRONTLINE</h1>
        <p>
          我是一名游戏玩家、游戏博主与游戏设计师。记录战场，拆解系统，把每一次对局里的判断、压力和爽感，转译成可复盘的设计语言。
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#作品">查看作品</a>
          <a className="ghost-button" href="#联系">建立联系</a>
        </div>
      </div>
      <div className="hero-metrics shell" aria-label="频道数据">
        <span>FIELD NOTES / 128</span>
        <span>PROTOTYPES / 06</span>
        <span>MAP STUDIES / 24</span>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section profile-section" id="经历">
      <div className="shell profile-grid">
        <div className="portrait-panel">
          <div className="portrait">
            <div className="portrait-glow" />
            <span>CALLSIGN</span>
            <strong>GHOST<br />VECTOR</strong>
          </div>
        </div>
        <div className="profile-copy">
          <p className="eyebrow">PERSONAL FILE</p>
          <h2>从玩家视角出发，用设计师方法复盘游戏。</h2>
          <p>
            我关注战术射击、多人协作、地图节奏与玩家心理。平时会做游戏文章、视频脚本、关卡 blockout、玩法原型和系统拆解，把主观体验整理成可讨论、可验证、可落地的设计判断。
          </p>
          <div className="contact-grid">
            {contacts.map((contact) => (
              <div key={contact.label}>
                <span>{contact.label}</span>
                <strong>{contact.value}</strong>
              </div>
            ))}
          </div>
          <div className="mini-projects">
            {experienceProjects.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  return (
    <section className="section" id="精选项目">
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">SELECTED PREFERENCES</p>
          <h2>我的游戏偏好</h2>
        </div>
        <div className="preference-grid">
          {preferences.map((item, index) => (
            <article className="preference-card" key={item.title}>
              <span className="card-index">0{index + 1}</span>
              <div>
                <p>{item.tag}</p>
                <h3>{item.title}</h3>
              </div>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Works() {
  return (
    <section className="section works-section" id="作品">
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">ARCHIVE</p>
          <h2>文章与游戏作品</h2>
        </div>
        <div className="works-grid">
          {works.map((work) => (
            <article className="work-card" key={work.title}>
              <span>{work.type}</span>
              <h3>{work.title}</h3>
              <p>{work.meta}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactFinale() {
  return (
    <section className="contact-finale" id="联系">
      <div className="shell finale-inner">
        <p className="eyebrow">READY FOR DEPLOYMENT</p>
        <h2>一起聊游戏、地图、系统，或者下一次原型实验。</h2>
        <a className="primary-button" href="mailto:contact@gamertag.dev">contact@gamertag.dev</a>
        <div className="finale-links">
          <span>BILIBILI / @战术频道</span>
          <span>DISCORD / callsign#2042</span>
          <span>LOCATION / ONLINE</span>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <main>
      <Hero />
      <Experience />
      <FeaturedProjects />
      <Works />
      <ContactFinale />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
