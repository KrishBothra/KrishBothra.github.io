import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <p className={styles.tag}>// currently @ pheydrus & uw-madison</p>
        <h1 className={styles.name}>Krish<br /><em>Bothra</em></h1>
        <p className={styles.sub}>
          Computer Science & Data Science student building AI agents, autonomous systems,
          and data-driven products. 4.0 GPA. U.S. Citizen.
        </p>
        <div className={styles.cta}>
          <a href="mailto:kbothra@wisc.edu" className={styles.btnPrimary}>Get in touch</a>
          <a href="#projects" className={styles.btnGhost}>See my work</a>
        </div>
      </div>

      <div className={styles.visual}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>live profile</div>
          {[
            { k: 'STATUS',   v: 'Open to internships', accent: true },
            { k: 'LOCATION', v: 'Madison, WI' },
            { k: 'GPA',      v: '4.0 / 4.0', accent: true },
            { k: 'GRAD',     v: 'May 2028' },
            { k: 'FOCUS',    v: 'AI · Autonomous Systems', blue: true },
            { k: 'GITHUB',   v: '@krishbothra', mono: true },
          ].map(({ k, v, accent, blue, mono }) => (
            <div className={styles.cardLine} key={k}>
              <span className={styles.cardKey}>{k}</span>
              <span className={`${styles.cardVal} ${accent ? styles.green : ''} ${blue ? styles.blue : ''} ${mono ? styles.mono : ''}`}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
