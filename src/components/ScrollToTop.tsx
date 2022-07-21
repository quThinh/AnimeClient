import { useLocation } from "react-router";
import React from "react";
//Hoa
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
