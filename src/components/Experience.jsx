import { useEffect, useRef } from 'react'
import styles from './Experience.module.css'

const jobs = [
  {
    role: 'AI & Data Engineering Intern',
    company: 'Pheydrus',
    date: 'Mar 2026\nPresent',
    bullets: [
      'Architected AI-powered automation agents using Claude (Team API), ManyChat, and Zapier for marketing and sales workflows.',
      'Designed a cross-platform insights dashboard aggregating funnel metrics from Meta Ads, SamCart, WebinarJam, and Flodesk.',
      'Surfaced KPIs including cost-per-click, email open rates, and webinar show-up rates across the full funnel.',
    ],
  },
  {
    role: 'Perceptions Team Member',
    company: 'Wisconsin Autonomous — UW-Madison',
    date: 'Aug 2025\nPresent',
    bullets: [
      'Engineered a real-time HMI visualization system for autonomous driving, rendering dynamic BEV perception data on NVIDIA Jetson hardware.',
      'Built a multithreaded Python backend with WebRTC/WebTransport for low-latency bidirectional streaming.',
      'Automated perception validation using L2 norm error analysis with Linux-based system testing and debugging.',
    ],
  },
  {
    role: 'Computer Science Researcher / Intern',
    company: 'UC Santa Cruz',
    date: 'Jun 2024\nAug 2024',
    bullets: [
      'Researched Visible Light Communication as a Wi-Fi complement, focusing on MAC/PHY protocol design for improved bandwidth efficiency.',
      'Implemented a custom VLC packet structure using On-Off Keying modulation in Python and MATLAB.',
      'Analyzed bitrate performance and modeled BER vs. achievable bit rate relationships.',
    ],
  },
  {
    role: 'Web Development Intern',
    company: 'Boston Innovations',
    date: 'Mar 2024\nMay 2024',
    bullets: [
      'Built and deployed a production-ready company homepage using React, Next.js, and Cloudflare.',
      'Contributed to team workflow via GitHub pull requests, code reviews, and structured version control.',
    ],
  },
]

function ExpItem({ job }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible') }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div className={`${styles.item} fade-up`} ref={ref}>
      <div>
        <p className={styles.role}>{job.role}</p>
        <p className={styles.company}>{job.company}</p>
        <ul className={styles.bullets}>
          {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>
      <div className={styles.date}>{job.date.split('\n').map((d, i) => <span key={i}>{d}<br /></span>)}</div>
    </div>
  )
}

export default function Experience() {
  const titleRef = useRef(null)
  const labelRef = useRef(null)
  useEffect(() => {
    [titleRef, labelRef].forEach(r => {
      const el = r.current; if (!el) return
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible') }, { threshold: 0.1 })
      obs.observe(el); return () => obs.disconnect()
    })
  }, [])
  return (
    <section id="experience" className={styles.section}>
      <p className="section-label fade-up" ref={labelRef}>Work</p>
      <h2 className="section-title fade-up" ref={titleRef}>Experience</h2>
      <div className={styles.grid}>
        {jobs.map((j, i) => <ExpItem job={j} key={i} />)}
      </div>
    </section>
  )
}
