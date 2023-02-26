import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <Link to="/" className="logo">My Favourite Albums</Link>
            <div className="dropdown">
                <button className="dropbtn">☰</button>
                <div className="dropdown-content">
                    <Link to="/add">Add an album</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            </div>
        </header>
    )
}