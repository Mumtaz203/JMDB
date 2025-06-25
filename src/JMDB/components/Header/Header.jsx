import React from 'react';
import styles from './Header.module.css';
import { FiMenu, FiSearch, FiFilter, FiBookmark } from 'react-icons/fi';


const Header = () => {


    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <div className={styles.menuIcon}>
                    <FiMenu size={20} />
                </div>
                <div className={styles.searchBox}>
                    <input type="text" placeholder="Search in JMDB" />
                    <FiSearch className={styles.icon} />
                    <FiFilter className={styles.icon} />
                </div>
            </div>

            <div className={styles.center}>
                <button className={styles.signInBtn} disabled>
                    Sign In
                </button>
                <FiBookmark className={styles.watchlistIcon} />
            </div>

            <div className={styles.right}>
                <h1 className={styles.logo}>JMDB</h1>
            </div>
        </header>
    );
};

export default Header;
