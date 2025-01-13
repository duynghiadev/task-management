import clsx from "clsx";

import styles from "./index.module.css";

export const LayoutHeader = () => {
  return (
    <header className={clsx(styles["site-header"])}>
      <div className={clsx(styles["site-header__wrapper"])}>
        <a href="#" className={clsx(styles["brand"])}>
          Duy Nghia Todo List
        </a>
      </div>
    </header>
  );
};
