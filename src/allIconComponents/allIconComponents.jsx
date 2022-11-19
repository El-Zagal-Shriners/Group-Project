import { CgPill } from "react-icons/cg";
import {
  MdFastfood,
  MdSportsBaseball,
  MdHotel,
} from "react-icons/md";
import { GiPlainCircle } from "react-icons/gi";
import { FaTicketAlt, FaShoppingCart, FaBeer, FaCar, FaWrench, FaHome } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { AiFillPlusCircle } from "react-icons/ai";

// this object holds all jsx icon components in the app
export const allIconComponents = {
  // category icons
  health: <CgPill />,
  food: <MdFastfood />,
  drinks: <FaBeer />,
  sports: <MdSportsBaseball />,
  entertainment: <FaTicketAlt />,
  lodging: <MdHotel />,
  shopping: <FaShoppingCart />,
  rental: <FaCar />,
  home: <FaHome/>,
  services: <FaWrench/>,
  other: <GiPlainCircle />,

  // other
  checkmark: <BsFillCheckCircleFill />,
  exit: <AiFillCloseCircle />,
  editUser: <FaUserEdit />,
  delete: <MdDelete />,
  logout: <GrLogout />,
  add: <AiFillPlusCircle />
};
