import imgMoney from '../../images/money.png'
import { FaHandHoldingUsd } from "react-icons/fa";

function Header() {
  return (
    <header className="header">
      <FaHandHoldingUsd className='header_img'/>
      <h1>Master Your Money</h1>
    </header>
  );
}

export default Header;