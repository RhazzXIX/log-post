import styles from './page.module.css'

export default function Home() {
  console.log(process.env.TEST_ENV);
  return (
    <main className={styles.main}>
      <p>Hello Up-skilling World!</p>
    </main>
  )
}
