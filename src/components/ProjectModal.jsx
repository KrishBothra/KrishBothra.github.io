import { useEffect, useState } from 'react'
import styles from './ProjectModal.module.css'

export default function ProjectModal({ project, onClose }) {
  const images = project.images ?? []
  const videos = project.videos ?? (project.video ? [project.video] : [])

  // Unified media list: videos first, then images
  const allMedia = [
    ...videos.map(src => ({ type: 'video', src })),
    ...images.map(src => ({ type: 'image', src })),
  ]
  const total = allMedia.length
  const [idx, setIdx] = useState(0)
  const current = allMedia[idx]

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && total > 1) setIdx(i => (i + 1) % total)
      if (e.key === 'ArrowLeft' && total > 1) setIdx(i => (i - 1 + total) % total)
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, total])

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close">×</button>

        {/* Media area */}
        {total > 0 && (
          <div className={styles.mediaWrap}>
            {current.type === 'video' ? (
              <video key={current.src} src={current.src} controls autoPlay muted playsInline className={styles.media} />
            ) : (
              <img src={current.src} alt={`${project.name} ${idx + 1}`} className={styles.media} />
            )}

            {total > 1 && (
              <>
                <button className={`${styles.navBtn} ${styles.navLeft}`} onClick={() => setIdx(i => (i - 1 + total) % total)}>‹</button>
                <button className={`${styles.navBtn} ${styles.navRight}`} onClick={() => setIdx(i => (i + 1) % total)}>›</button>
                <div className={styles.dots}>
                  {allMedia.map((m, i) => (
                    <button
                      key={i}
                      className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`}
                      onClick={() => setIdx(i)}
                      aria-label={m.type === 'video' ? 'Video' : `Image ${i - videos.length + 1}`}
                    >
                      {m.type === 'video' && i === idx ? '▶' : ''}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div className={styles.body}>
          <div className={styles.bodyHeader}>
            <p className={styles.name}>{project.name}</p>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.githubBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View on GitHub
              </a>
            )}
          </div>
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
