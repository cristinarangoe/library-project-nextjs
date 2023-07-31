"use client";
import { useState } from "react";
import bookLogo from "../../public/bookLogo.svg";
import styles from "./Navbar.module.scss";
import SearchBar from "./SearchBar";
import SubjectsList from "./SubjectsList";
import XMarkIcon from "../UI/XMarkIcon";
import BarsIcon from "../UI/BarsIcon";
import ChevronIconDown from "../UI/ChevronIconDown";
import Image from "next/image";
import { montserrat } from "@/styles/fonts";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ButtonLogIn from "./ButtonLogIn";

function Navbar() {
  const [mobileMenuClicked, setMobileMenuClicked] = useState<boolean>(false);
  const [dropdownClicked, setDropdownClicked] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const changeMobileMenuClickHandler = () => {
    setMobileMenuClicked((prevState) => !prevState);
  };

  const closeDropdownHandler = () => {
    setDropdownClicked(false);
  };

  const openDropdownHandler = () => {
    setDropdownClicked(true);
  };

  return (
    <header className="">
      <nav
        className={`${
          mobileMenuClicked ? styles["nav-active"] : styles["nav"]
        }`}
      >
        <div className={styles["nav-ppal"]}>
          <button
            onClick={changeMobileMenuClickHandler}
            className={styles["nav-ppal-mobile-button"]}
          >
            {mobileMenuClicked ? <XMarkIcon /> : <BarsIcon />}
          </button>
          <Image src={bookLogo} className="" alt="Vite logo" height={40} />
          <div
            onMouseLeave={closeDropdownHandler}
            onMouseEnter={openDropdownHandler}
            className={styles["nav-ppal-dropdown"]}
          >
            <div
              className={`${styles["nav-ppal-dropdown-subject"]} ${montserrat.className}`}
            >
              <h2 className="">Categoria</h2>
              <ChevronIconDown />
            </div>
            {dropdownClicked && (
              <SubjectsList
                isMobile={false}
                setDropdownClicked={setDropdownClicked}
                setMobileClicked={setMobileMenuClicked}
              />
            )}
          </div>
          <div
            className={`${styles["nav-ppal-favorites"]} ${montserrat.className}`}
          >
            <Link href="/favoritos">Favoritos</Link>
          </div>
        </div>
        <div className={styles["nav-searchbar"]}>
          <SearchBar />
        </div>
        <div className={`${styles["nav-auth"]}  ${montserrat.className}`}>
          <ButtonLogIn />
        </div>
        {mobileMenuClicked && (
          <div className={styles["side-nav-mobile"]}>
            <div className={styles["side-nav-primary-buttons"]}>
              <div className={styles["side-nav-mobile-login-button"]}>
                <ButtonLogIn />
              </div>
              <div className={styles["side-nav-mobile-favorite-button"]}>
                <Link href="/favoritos">Favoritos</Link>
              </div>
            </div>
            <SubjectsList
              isMobile={true}
              setMobileClicked={setMobileMenuClicked}
              setDropdownClicked={setDropdownClicked}
            />
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
