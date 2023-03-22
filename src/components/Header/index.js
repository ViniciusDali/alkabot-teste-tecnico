import { HiSearch, HiUserCircle } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi2";
import styles from "@/styles/Header.module.css";
import { Quicksand } from "next/font/google";

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
          <HiSearch size={20} />

          <HiUserCircle size={20} />

          <HiOutlineHeart size={20} />
        </div>
      </div>
    </nav>
  );
}
