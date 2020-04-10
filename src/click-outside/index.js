import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const ClickOutside = ({
  as,
  children,
  onClickInside,
  onClickOutside,
  ...props
}) => {
  useEffect(() => {
    document.addEventListener("click", handle);
    document.addEventListener("touchend", handle);
    return () => {
      document.removeEventListener("click", handle);
      document.removeEventListener("touchend", handle);
    };
  }, []);

  const Tag = as;
  const el = useRef(null);

  const handle = (e) => {
    const isTouch = e.type === "touchend";
    if (e.type === "click" && isTouch) return;

    const index = e.path.findIndex((item) => item === el.current);

    if (index < 0) onClickOutside();
    else onClickInside();
  };

  return (
    <Tag ref={el} {...props}>
      {children}
    </Tag>
  );
};

ClickOutside.propTypes = {
  as: PropTypes.string,
  onClickInside: PropTypes.func,
  onClickOutside: PropTypes.func,
};

ClickOutside.defaultProps = {
  as: "div",
  onClickInside: () => {},
  onClickOutside: () => {},
};

export default ClickOutside;
