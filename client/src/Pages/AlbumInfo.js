import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function AlbumInfo() {
    const [info, setInfo] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await fetch(`http://localhost:4000/album/${id}`)
                .then(response => {
                    response.json().then(albumInfo => {
                        setInfo(albumInfo);
                    });
                })
        }
        fetchData();
    });

    function deleteAlbum() {
        confirmAlert({
            title: "Confirm to delete",
            message: "Are you sure you want to delete this album?",
            buttons: [{
                label: "Cancel",
                onClick: () => console.log("Cancel delete")
            }, {
                label: "Delete",
                onClick: () => {
                    fetch("http://localhost:4000/album", {
                        method: "DELETE",
                        body: JSON.stringify({ id }),
                        headers: { "Content-Type": "application/json" }
                    })
                        .then(setRedirect(true));
                }
            }]
        });
    }

    if (redirect) {
        return <Navigate to={"/"} />
    }

    if (!info) return "";

    return (
        <div className="album-page">
            <div className="cover">
                <img className="album-art" src={info.artwork} alt="album-art" />
                <div className="album-buttons">
                    <button className="edit addTrack" onClick={() => {
                        navigate(`/edit/${info._id}`);
                    }}>Edit album</button>
                    <p>|</p>
                    <button className="edit addTrack" onClick={e => {
                        deleteAlbum();
                    }}>Delete album</button>
                </div>
            </div>
            <div className="album-info">
                <h2 className="album-title">{info.title}</h2>
                <h3 className="artist">{info.artist}</h3>
                <div className="year-genre">
                    <p className="year">{info.year}</p>
                    <p className="genre">{info.genre}</p>
                </div>
                <ol className="tracklist">
                    {info.tracklist.length > 0 && info.tracklist.map((track, i) => (
                        <li key={i}>{track}</li>
                    ))}
                </ol>
            </div>
        </div>
    )
}