import styles from './Ticker.module.css'

const skills = ['Python','PyTorch','React','R / XGBoost','ROS','OpenCV','WebRTC','Node.js','Swift','AWS','Linux','SQL','NumPy / Pandas','Java','C++','MATLAB']

export default function Ticker() {
  const items = [...skills, ...skills]
  return (
    <div className={styles.wrap}>
      <div className={styles.ticker}>
        {items.map((s, i) => (
          <span className={styles.item} key={i}>{s}</span>
        ))}
      </div>
    </div>
  )
}
