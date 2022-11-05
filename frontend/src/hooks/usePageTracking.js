/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// eslint-disable-next-line import/no-unresolved
import ReactGA from "react-ga4";

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize("G-0SY16D1F7C");
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);
};

export default usePageTracking;
