import { TiArrowUnsorted, TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti"
import { IconContext } from "react-icons";

function sortArrow(props) {
  if (props.direction == null) {
    return <IconContext.Provider value={{ className: "icon" }}><TiArrowUnsorted /></IconContext.Provider>;
  }

  if (props.direction === "desc") {
    return <IconContext.Provider value={{ className: "icon" }}><TiArrowSortedDown /></IconContext.Provider>;
  } else {
    return <IconContext.Provider value={{ className: "icon" }}><TiArrowSortedUp /></IconContext.Provider>;
  }
};

export default sortArrow;
