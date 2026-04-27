import { useEffect, useRef } from 'react'
import styles from './Contact.module.css'

const links = [
  { label: 'Email', val: 'kbothra@wisc.edu', href: 'mailto:kbothra@wisc.edu' },
  { label: 'Phone', val: '847-969-0364', href: 'tel:8479690364' },
  { label: 'LinkedIn', val: 'linkedin.com/in/krishbothra', href: 'https://linkedin.com/in/krishbothra' },
  { label: 'GitHub', val: 'github.com/krishbothra', href: 'https://github.com/krishbothra' },
]

export default function Contact() {
  const leftRef = useRef(null); const rightRef = useRef(null)
  useEffect(() => {
    [leftRef, rightRef].forEach(r => {
      const el = r.current; if (!el) return
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible') }, { threshold: 0.1 })
      obs.observe(el)
    })
  }, [])
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.wrap}>
        <div className={`fade-up`} ref={leftRef}>
          <p className="section-label">Let's connect</p>
          <p className={styles.big}>Let's build<br />something<br /><em>great.</em></p>
        </div>
        <div className={`${styles.linkList} fade-up`} ref={rightRef}>
          {links.map((l, i) => (
            <a className={styles.link} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" key={i}>
              <div>
                <p className={styles.linkLabel}>{l.label}</p>
                <p className={styles.linkVal}>{l.val}</p>
              </div>
              <span className={styles.arrow}>→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
