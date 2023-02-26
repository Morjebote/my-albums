import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function EditAlbum() {
    const [albumId, setAlbumId] = useState("");
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [artwork, setArtwork] = useState("");
    const [year, setYear] = useState("");
    const [genre, setGenre] = useState("");
    const [currentTracks, setCurretTracks] = useState([]);
    const tracklist = [];
    const [redirect, setRedirect] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/album/${id}`)
            .then(response => response.json())
            .then(info => {
                setAlbumId(info.id)
                setTitle(info.title);
                setArtist(info.artist);
                setArtwork(info.artwork);
                setYear(info.year);
                setGenre(info.genre);
                setCurretTracks(info.tracklist);
            });
    }, [id]);

    const inputArr = (currentTracks.map((track) => {
        return { type: "text", value: track, placeholder: "Add track" }
    }));

    const [arr, setArr] = useState([]);

    useEffect(() => {
        (async function () {
            try {
                const temp = inputArr;
                setArr(temp);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [albumId]);

    const addInput = (e) => {
        e.preventDefault();
        setArr(s => {
            return [...s, { type: "text", value: "", placeholder: "Add track" }];
        });
    }
    const handleChange = e => {
        e.preventDefault();
        const index = e.target.id;
        setArr(s => {
            const newArr = s.slice();
            newArr[index].value = e.target.value;
            return newArr;
        });
    }

    function submit() {
        fetch("http://localhost:4000/album", {
            method: "PUT",
            body: JSON.stringify({ id, title, artist, artwork, year, genre, tracklist }),
            headers: { "Content-Type": "application/json" }
        })
            .then(setRedirect(true));
    }

    if (redirect) {
        return <Navigate to={`/album/${id}`} replace={true} />
    }

    return (
        <form className="addAlbum">
            <label htmlFor="addTitle">Album title:</label>
            <input
                type="text"
                id="addTitle"
                placeholder="Add album title"
                value={title}
                onChange={e => setTitle(e.target.value)} />
            <label htmlFor="addArtist">Album artist:</label>
            <input
                type="text"
                id="addArtist"
                placeholder="Add artist name"
                value={artist}
                onChange={e => setArtist(e.target.value)} />
            <label htmlFor="addArtwork">Album album cover:</label>
            <input
                type="text"
                id="addArtwork"
                placeholder="Add artwork URL link"
                value={artwork}
                onChange={e => setArtwork(e.target.value)} />
            <label htmlFor="addYear">Year of release:</label>
            <input
                type="text"
                id="addYear"
                placeholder="Add album year"
                value={year}
                onChange={e => setYear(e.target.value)} />
            <label htmlFor="addGenre">Album genre:</label>
            <input
                type="text"
                id="addGenre"
                placeholder="Add album genre"
                value={genre}
                onChange={e => setGenre(e.target.value)} />
            <h3>Tracklist:</h3>
            {arr.map((item, i) => {
                return (
                    <div key={i} id="tracklist" className="tracklist">
                        <p>{i + 1}.</p>
                        <input
                            onChange={handleChange}
                            value={item.value}
                            id={i}
                            type={item.type}
                            placeholder="Add track title"
                        />
                    </div>
                );
            })}
            <button className="addTrack" onClick={addInput}>Add track</button>
            <button className="submit" onClick={(e) => {
                e.preventDefault();
                arr.map(item => {
                    if (item.value.length > 0) {
                        return (tracklist.push(item.value));
                    }
                });
                submit();
            }}>Submit</button>
        </form>
    )
}