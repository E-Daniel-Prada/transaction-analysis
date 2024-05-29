import Link from "next/link"
import styles from './PayLayout.module.sass'
export default async function Layout({ children }: { children: React.ReactNode }) {


  return (
    <main className={styles.payLayout}>
      <h1>Consulte sus pagos</h1>
      {children}
    </main>
  )
}