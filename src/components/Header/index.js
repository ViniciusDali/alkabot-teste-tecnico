import { HiUserCircle, HiHome } from "react-icons/hi";
import styles from "@/styles/Header.module.css";
import { Quicksand } from "next/font/google";
import Link from "next/link";

const quicksand = Quicksand({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export function Header() {
  return (
    <nav className={quicksand.className} id={styles.headerContainer}>
      <div className={styles.headerContent}>
        <h1 className={styles.headerLogo}>Alkabot</h1>
        <div className={styles.headerConfig}>
          <Link href="/">
            <HiHome size={20} />
          </Link>
          <Link href="/users">
            <HiUserCircle size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
