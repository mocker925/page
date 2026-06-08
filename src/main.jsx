import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const navItems = ['首页', '经历', '精选项目', '作品', '联系'];

const contacts = [
  { label: 'Email', value: 'mocker925@outlook.com' },
  { label: 'Bilibili', value: '阿历克斯AMO' },
  { label: '抖音', value: '阿历克斯AMO' },
];

const experienceProjects = [
  '多人射击玩法拆解',
  '关卡节奏与动线设计',
  '游戏评测与长文专栏',
  '独立原型与系统设计',
];

const preferences = [
  {
    title: 'BATTLEFIELD',
    tag: '全面战争',
    desc: '海陆空全方位立体协同作战',
    image: 'https://drop-assets.ea.com/images/tI8uztWe1sJU1DLuMCBM3/a5ec348e3d10bb48f42d1199ace1400a/BF6-January-Update-Article-03.png?im=AspectCrop=%2816,9%29,xPosition=0.5942708333333333,yPosition=0.37777777777777777',
  },
  {
    title: 'FINAL FANTASY XIV',
    tag: '大型多人在线',
    desc: '一段只属于玩家的冒险传奇',
    image: 'https://static.web.sdo.com/jijiamobile/pic/ff14/wallpaper/20260423patch75/ffxiv_7.5patch_01_2560x1440.jpg',
  },
  {
    title: 'unknow',
    tag: 'null',
    desc: 'text',
  },
];

const works = [
  {
    type: '文章',
    title: '江山留胜迹，我辈复登临',
    meta: '小黑盒',
    image: 'https://shared.st.dl.eccdnx.com/store_item_assets/steam/apps/3527290/31bac6b2eccf09b368f5e95ce510bae2baf3cfcd/header.jpg?t=1775581133',
    href: 'https://api.xiaoheihe.cn/v3/bbs/app/api/web/share?h_camp=link&h_src=YXBwX3NoYXJl&link_id=8a3071fcff45',
  },
  {
    type: '文章',
    title: 'null',
    meta: 'unknow',
  },
  {
    type: '作品',
    title: 'strike',
    meta: '开发中',
  },
  {
    type: '作品',
    title: 'city',
    meta: '开发中',
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
        <img
          className="brand-mark"
          src="https://github.com/mocker925.png"
          alt="mocker925 GitHub 头像"
        />
        <span>mocker925</span>
      </a>
      <nav aria-label="主导航">
        {navItems.map((item) => (
          <a key={item} href={`#${item === '首页' ? 'home' : item}`}>
            {item}
          </a>
        ))}
      </nav>
      <a className="header-contact" href="mailto:mocker925@outlook.com">联系我</a>
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
          <span>UPLOADER</span>
          <span>GAME DESIGNER</span>
          <span>ONLINE</span>
        </div>
        <h1>ENJOY GAMES<br />DESIGN FUN<br />LOVE THE WORLD</h1>
        <p>
          一名游戏玩家、游戏博主与游戏设计师。
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#作品">查看作品</a>
          <a className="ghost-button" href="#联系">建立联系</a>
        </div>
      </div>
      <div className="hero-metrics shell" aria-label="频道数据">
        <span>FIELD NOTES / null</span>
        <span>PROTOTYPES / 02</span>
        <span>MAP STUDIES / null</span>
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
            <span>PLAYER</span>
            <strong>mocker925</strong>
          </div>
        </div>
        <div className="profile-copy">
          <p className="eyebrow">PERSONAL FILE</p>
          <h2>玩家视角，设计思维</h2>
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
            <article
              className={`preference-card${item.image ? ' has-image' : ''}`}
              key={item.title}
              style={item.image ? { '--preference-image': `url("${item.image}")` } : undefined}
            >
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
          {works.map((work) => {
            const CardTag = work.href ? 'a' : 'article';

            return (
              <CardTag
                className={`work-card${work.image ? ' has-image' : ''}`}
                href={work.href}
                key={work.title}
                rel={work.href ? 'noreferrer' : undefined}
                target={work.href ? '_blank' : undefined}
                style={work.image ? { '--work-image': `url("${work.image}")` } : undefined}
              >
                <span>{work.type}</span>
                <h3>{work.title}</h3>
                <p>{work.meta}</p>
              </CardTag>
            );
          })}
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
        <a className="primary-button" href="mailto:mocker925@outlook.com">mocker925@outlook.com</a>
        <div className="finale-links">
          <span>BILIBILI / 阿历克斯AMO</span>
          <span>抖音 / 阿历克斯AMO</span>
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
