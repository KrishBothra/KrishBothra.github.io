import { useEffect, useRef } from 'react'
import styles from './Education.module.css'

export default function Education() {
  const refs = [useRef(null), useRef(null), useRef(null)]
  useEffect(() => {
    refs.forEach(r => {
      const el = r.current; if (!el) return
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible') }, { threshold: 0.1 })
      obs.observe(el)
    })
  }, [])
  return (
    <section id="education" className={styles.section}>
      <p className="section-label fade-up" ref={refs[0]}>Background</p>
      <h2 className="section-title fade-up" ref={refs[1]}>Education</h2>
      <div className={`${styles.block} fade-up`} ref={refs[2]}>
        <p className={styles.school}>University of Wisconsin–Madison</p>
        <p className={styles.degree}>B.S. Computer Science & Data Science · May 2028</p>
        <p className={styles.gpa}>GPA: 4.0 / 4.0</p>
        <p className={styles.courses}>
          Object-Oriented Programming · Data Structures · Algorithm Analysis · Computer Organization & Low-Level Systems · Statistical Data Modeling · Linear Algebra & Matrix Methods
        </p>
      </div>
    </section>
  )
}
