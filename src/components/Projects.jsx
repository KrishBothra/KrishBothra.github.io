import { useEffect, useRef, useState } from 'react'
import styles from './Projects.module.css'
import ProjectModal from './ProjectModal'

const projects = [
  {
    name: 'March Madness Bracket Predictor',
    tags: ['R', 'XGBoost', 'tidyverse', 'KenPom', 'caret'],
    desc: 'Ensemble model combining XGBoost and stacked logistic regression to predict NCAA tournament outcomes across 10 years of historical matchups. Engineered 40+ differential features from advanced analytics.',
    stat: '78% prediction accuracy',
    image: '',
  },
  {
    name: 'NFL Analytics Suite',
    tags: ['R', 'ggplot2', 'XGBoost', 'tidymodels', 'nflreadr'],
    desc: 'Logistic and linear regression models predicting 4th-down go decisions and quantifying Air/Rush Yards Over Expected across 4 NFL seasons. Ranked 80+ NFL backs by rush yards over expectation.',
    stat: '4 seasons of NFL data analyzed',
    image: '',
  },
  {
    name: 'Ego-Motion Estimation & BEV Mapping',
    tags: ['Python', 'NumPy', 'OpenCV', 'Computer Vision'],
    desc: 'Estimated 3D ego-vehicle trajectory by tracking a traffic light as a world reference across stereo video. Processed RGB-D point clouds to generate ground-frame BEV mappings with depth filtering.',
    stat: 'Stereo video 3D reconstruction',
    image: '',
  },
  {
    name: 'Court IQ',
    tags: ['Swift', 'Firebase', 'iOS', 'REST APIs'],
    desc: 'Native iOS app enabling coaches to design drills, track player statistics, and analyze performance trends. Integrated Firebase for real-time data storage and external APIs for analytics.',
    stat: 'Full-stack iOS application',
    image: '',
  },
]

function ProjCard({ p, onClick }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible') }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return (
    <div className={`${styles.card} fade-up`} ref={ref} onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <p className={styles.name}>{p.name}</p>
      <div className={styles.tags}>
        {p.tags.map((t, i) => <span className={styles.tag} key={i}>{t}</span>)}
      </div>
      <p className={styles.desc}>{p.desc}</p>
      <p className={styles.stat}>{p.stat}</p>
      <span className={styles.viewHint}>Click to view →</span>
    </div>
  )
}

export default function Projects() {
  const titleRef = useRef(null)
  const labelRef = useRef(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    [titleRef, labelRef].forEach(r => {
      const el = r.current; if (!el) return
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible') }, { threshold: 0.1 })
      obs.observe(el)
    })
  }, [])

  return (
    <section id="projects" className={styles.section}>
      <p className="section-label fade-up" ref={labelRef}>Work</p>
      <h2 className="section-title fade-up" ref={titleRef}>Projects</h2>
      <div className={styles.grid}>
        {projects.map((p, i) => <ProjCard p={p} key={i} onClick={() => setSelected(p)} />)}
      </div>
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
