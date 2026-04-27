import { useEffect, useRef } from 'react'
import styles from './Skills.module.css'

const groups = [
  { title: 'Languages', items: ['Python','Java','C++','SQL','JavaScript','Swift','MATLAB','R','HTML/CSS'] },
  { title: 'Frameworks & Tools', items: ['React','Next.js','Node.js','Firebase','ROS','PyTorch','OpenCV','Jupyter'] },
  { title: 'Systems & Technologies', items: ['Linux','Git','WebRTC','WebTransport','Multithreading','REST APIs','Cloudflare CDN'] },
  { title: 'Cloud & Databases', items: ['AWS','Azure','MongoDB','MySQL','Nginx'] },
  { title: 'Data & ML Libraries', items: ['NumPy','Pandas','Matplotlib','XGBoost','tidyverse','ggplot2'] },
  { title: 'Dev Environments', items: ['VS Code','IntelliJ','PyCharm','Xcode','Android Studio'] },
]

export default function Skills() {
  const refs = groups.map(() => useRef(null))
  const titleRef = useRef(null); const labelRef = useRef(null)
  useEffect(() => {
    [...refs, titleRef, labelRef].forEach(r => {
      const el = r.current; if (!el) return
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible') }, { threshold: 0.1 })
      obs.observe(el)
    })
  }, [])
  return (
    <section id="skills" className={styles.section}>
      <p className="section-label fade-up" ref={labelRef}>Toolkit</p>
      <h2 className="section-title fade-up" ref={titleRef}>Technical Skills</h2>
      <div className={styles.grid}>
        {groups.map((g, i) => (
          <div className={`${styles.group} fade-up`} ref={refs[i]} key={i}>
            <p className={styles.groupTitle}>{g.title}</p>
            <div className={styles.chips}>
              {g.items.map((item, j) => <span className={styles.chip} key={j}>{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
