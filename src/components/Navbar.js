import { Link } from 'react-router-dom';
import me from '../assets/me.jpg'
import '../Navbar.css'

export default function Navbar() {

    let body = document.body;

    let openNav = () => {
        document.getElementById("navMenu").classList.toggle('open');

        // Optional: Close the menu when a link is clicked
        document.querySelectorAll('.feature a').forEach(link =>
            link.addEventListener('click', () => {
                document.getElementById("navMenu").classList.remove('open');
            })
        );
    }

    let changeTheme = () =>{
        body.classList.toggle("light");
        if(body.classList.contains("light")){
            document.querySelector(".theme").classList.add("fa-moon");
            document.querySelector(".theme").classList.remove("fa-sun");
        }
        else{
            document.querySelector(".theme").classList.add("fa-sun");
            document.querySelector(".theme").classList.remove("fa-moon");
        }
    }

    return (
        <div>
            <header>
                <nav className="navbar nav" id="navbar">
                    <div className="nav-top">
                        <div className="image">
                            <img src={me} alt="harsh" />
                        </div>
                        <div className="hamburger" onClick={openNav}>
                            <i className="fa-solid fa-bars fa-2x"></i>
                        </div>
                    </div>
                    <div className="feature" id="navMenu">
                        <ul>
                            <li><Link to={'/'} >Home</Link></li>
                            <li><Link to={'/about-me'}>About</Link></li>
                            <li><Link to={'/projects'}>Projects</Link></li>
                            <li><Link to={'/contact-me'}>Contact</Link></li>
                            <li><i className='fa-solid fa-sun fa-2x theme' onClick={changeTheme}/></li>
                        </ul>
                    </div>
                </nav>

            </header>
        </div>
    )
}
