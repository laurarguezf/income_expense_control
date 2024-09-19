import { Link } from 'react-router-dom';
import imgMoney from '../images/money.png';
import Footer from './pages/Footer';
import Header from './pages/Header';

function Landing() {
  return (
    <>
      <Header />
      <section className='landing'>
        <p className='landing_title'>Track smarter,</p>
        <p className='landing_title'>spend better</p>
      </section>
      <Link to='/expenseslog' className='landing_button'>Log In</Link>
      <Footer />
    </>
  );
}

export default Landing;