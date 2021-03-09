import { useState, useEffect } from "react";
import styles from "./Tabs.module.css";
import { slugify } from "../../utils/slugify";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export const Tabs = ({ children, initialTab }) => {
  const [activeTab, setActiveTab] = useState(slugify(children[0].props.label));
  const router = useRouter();
  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(slugify(newActiveTab));
  };
  useEffect(() => {
    if (initialTab.tab) {
      setActiveTab(initialTab.tab);
    }
  }, []);
  useEffect(() => {
    router.push(`${router.pathname}?tab=${slugify(activeTab)}`, undefined, {
      shallow: true,
    });
  }, [activeTab]);
  return (
    <div>
      <ul className={styles.tabs}>
        {children.map((tab, i) => {
          const label = tab.props.label;
          return (
            <li
              data-testid={slugify(label)}
              className={slugify(label) === activeTab ? styles.current : ""}
              key={i}
            >
              <a href="#" onClick={(e) => handleClick(e, label)}>
                {label}
              </a>
            </li>
          );
        })}
      </ul>
      {children.map((child, i) => {
        if (slugify(child.props.label) === activeTab) {
          return (
            <div data-testid="content" key={i} className={styles.content}>
              {child.props.children}
            </div>
          );
        }
      })}
    </div>
  );
};

Tabs.propTypes = {
  initialTab: PropTypes.object,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      children: PropTypes.any,
    })
  ).isRequired,
};
Tabs.defaultProps = {
  initialTab: {},
};
