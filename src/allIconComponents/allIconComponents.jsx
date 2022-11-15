import { CgPill } from "react-icons/cg";
import {
  MdFastfood,
  MdCarRental,
  MdSportsBaseball,
  MdHotel,
} from "react-icons/md";
import { BiBeer } from "react-icons/bi";
import { FaTicketAlt, FaShoppingCart } from "react-icons/fa";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { BsFillCheckCircleFill } from "react-icons/bs";

// this object holds all jsx icon components in the app
export const allIconComponents = {
  health: <CgPill />,
  food: <MdFastfood />,
  drinks: <BiBeer />,
  sports: <MdSportsBaseball />,
  entertainment: <FaTicketAlt />,
  lodging: <MdHotel />,
  shopping: <FaShoppingCart />,
  rental: <MdCarRental />,
  misc: <RiCheckboxBlankCircleLine />,
  checkmark: <BsFillCheckCircleFill />,
};