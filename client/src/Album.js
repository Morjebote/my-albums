import { Link } from "react-router-dom";

export default function Album({ _id, artist, artwork, genre, title, tracklist, year }) {
    return (
        <Link to={`/album/${_id}`}>
            <div className="album">
                <div className="image">
                    <img src={artwork} alt="album-art" />
                </div>
                <div className="description">
                    <div>
                        <h2>{title}</h2>
                        <h3>{artist}</h3>
                    </div>
                    <div className="info">
                        <span>{year}</span>
                        <span>{genre}</span>
                        <span>{(tracklist.length).toString()} tracks</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}