import Image from "next/image";
import Link from "next/link";
import styles from 'app/sass/not-found.module.sass'

export default function NotFound() {
  return (
    <main className={styles.NotFound}>
      <h1 className={styles.NotFound__title}>404</h1>
      <Image
        src="/images/404.avif"
        alt="404"
        width={300}
        height={400}
        
      />
      <h2 className={styles.NotFound__subtitle}>
        ¡Uy, parece que el enlace se escondió!
      </h2>
      <p className={styles.NotFound__description}>Pero siempre podras consultar nuestros pagos</p>
      <Link className={styles.NotFound__link} href="/">
        Volver a home
      </Link>
    </main>
  );
}