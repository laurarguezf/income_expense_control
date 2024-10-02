import imgMoney from '../../images/money.png'

function Header() {
  return (
    <header className="header">
      <img src={imgMoney} />
      <h1>Master Your Money</h1>
    </header>
  );
}

export default Header;