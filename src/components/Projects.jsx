import { useEffect, useRef, useState } from 'react'
import styles from './Projects.module.css'
import ProjectModal from './ProjectModal'

const projects = [
  {
    name: 'March Madness Bracket Predictor',
    tags: ['R', 'XGBoost', 'tidyverse', 'KenPom', 'caret'],
    desc: 'Ensemble model combining XGBoost and stacked logistic regression to predict NCAA tournament outcomes across 10 years of historical matchups. Engineered 40+ differential features from advanced analytics.',
    stat: 'Predicted 49 games correctly — T-3rd in UW-Madison sports analytics club March Madness challenge',
    images: [],
    video: null,
    github: 'https://github.com/KrishBothra/March-Madness-Pred-Model',
  },
  {
    name: 'NFL Analytics Suite',
    tags: ['R', 'ggplot2', 'XGBoost', 'tidymodels', 'nflreadr'],
    desc: 'Logistic and linear regression models predicting 4th-down go decisions and quantifying Air/Rush Yards Over Expected across 4 NFL seasons. Ranked 80+ NFL backs by rush yards over expectation.',
    stat: '4 seasons of NFL data analyzed',
    images: [
      '/media/NFL/4th-Down-Linear-Regression-Model-21-25.png',
      '/media/NFL/Air-Yards-Over-Expected-Linear-Regression-Model-21-25.png',
      '/media/NFL/Bears-run-pass-rate-by-player-2025.png',
      '/media/NFL/bar-epa-22-25.png',
      '/media/NFL/epaPlay-passRate-22-25.png',
      '/media/NFL/fg_oe_rf_gt.png',
      '/media/NFL/pass-rush-epa-25.png',
      '/media/NFL/qb_gt.png',
      '/media/NFL/ryoe_xgBoost.png',
    ],
    video: null,
    github: 'https://github.com/KrishBothra/SAC_NFL',
  },
  {
    name: 'Ego-Motion Estimation & BEV Mapping',
    tags: ['Python', 'NumPy', 'OpenCV', 'Computer Vision'],
    desc: 'Estimated 3D ego-vehicle trajectory by tracking a traffic light as a world reference across stereo video. Processed RGB-D point clouds to generate ground-frame BEV mappings with depth filtering.',
    stat: 'Stereo video 3D reconstruction',
    videos: ['/media/trajectory/wa-challenge.mp4', '/media/trajectory/trajectory.mp4'],
    images: ['/media/trajectory/trajectory.png'],
    video: null,
    github: 'https://github.com/KrishBothra/Perception-Coding-Challenge',
  },
  {
    name: 'Court IQ',
    tags: ['Swift', 'Firebase', 'iOS', 'REST APIs'],
    desc: 'Native iOS app enabling coaches to design drills, track player statistics, and analyze performance trends. Integrated Firebase for real-time data storage and external APIs for analytics.',
    stat: 'Full-stack iOS application',
    images: [],
    video: '/media/CourtIQ/courtiq-demo.mp4',
    github: 'https://github.com/KrishBothra/CourtIQ',
  },
]

function ProjCard({ p, onClick }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible') }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  const videoCount = p.videos ? p.videos.length : (p.video ? 1 : 0)
  const hasMedia = videoCount > 0 || p.images.length > 0
  return (
    <div className={`${styles.card} fade-up`} ref={ref} onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <div className={styles.cardTop}>
        <p className={styles.name}>{p.name}</p>
        {p.github && (
          <a
            className={styles.githubLink}
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label="GitHub"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        )}
      </div>
      <div className={styles.tags}>
        {p.tags.map((t, i) => <span className={styles.tag} key={i}>{t}</span>)}
      </div>
      <p className={styles.desc}>{p.desc}</p>
      <p className={styles.stat}>{p.stat}</p>
      {hasMedia && (
        <span className={styles.viewHint}>
          {videoCount > 0 && p.images.length > 0
            ? `${videoCount} video${videoCount > 1 ? 's' : ''} + ${p.images.length} image${p.images.length > 1 ? 's' : ''} →`
            : videoCount > 0 ? `Watch demo${videoCount > 1 ? 's' : ''} →`
            : `View ${p.images.length} image${p.images.length > 1 ? 's' : ''} →`}
        </span>
      )}
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
