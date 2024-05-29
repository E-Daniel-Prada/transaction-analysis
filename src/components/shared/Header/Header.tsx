import Link from "next/link";
import { validateAccessToken } from "app/utils/auth/validateAccessToken";
import styles from "./Header.module.sass";
import dynamic from "next/dynamic";
import { LogOutForm } from "app/components/logout";

export const Header = async () => {
  const customer = await validateAccessToken();

  return (
    <header className={styles.Header}>
      <nav>
        <ul className={styles.Header__list}>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          {customer && (
            <>
              <li>
                <Link href="/payment">Pagos</Link>
              </li>
              <li>
                <Link href="/aggregation">Agregaciones</Link>
              </li>
              <li>
                <Link href="/failedTransactions">Transacciones fallidas</Link>
              </li>
              <li>
                <Link href="/inconsistency">Inconsistencia en pagos</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className={styles.Header__user}>
        {customer?.firstName ? (
          <>
            <Link href="/my-account">Hola! {customer.firstName}</Link>{" "}
            <LogOutForm />
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </header>
  );
};
