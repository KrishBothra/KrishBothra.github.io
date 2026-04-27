import { useEffect } from 'react'
import styles from './ProjectModal.module.css'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close">×</button>
        <div className={styles.imgWrap}>
          {project.image ? (
            <img src={project.image} alt={project.name} />
          ) : (
            <div className={styles.placeholder}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              <span>No screenshot yet</span>
            </div>
          )}
        </div>
        <div className={styles.body}>
          <p className={styles.name}>{project.name}</p>
          <div className={styles.tags}>
            {project.tags.map((t, i) => <span className={styles.tag} key={i}>{t}</span>)}
          </div>
          <p className={styles.desc}>{project.desc}</p>
          <p className={styles.stat}>{project.stat}</p>
        </div>
      </div>
    </div>
  )
}
