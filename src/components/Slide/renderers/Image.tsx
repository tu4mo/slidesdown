import styles from './Image.module.css'

export function Image({ src }: { src?: string | undefined }) {
  return (
    <span className={styles.imageContainer}>
      <img
        alt=""
        src={src}
      />
    </span>
  )
}
