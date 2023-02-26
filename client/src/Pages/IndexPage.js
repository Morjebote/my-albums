import { useEffect, useState } from "react";
import Album from "../Album";

export default function IndexPage() {
    const [albums, setAlbums] = useState([]);
    const [selectedAlbums, setSelectedAlbums] = useState([]);
    const genres = [];
    let numberOfAlbums = 0;
    const [sort, setSort] = useState({ key: "title", order: 1, select: [] , filter: false});

    useEffect(() => {
        fetch(`http://localhost:4000/list?${new URLSearchParams(sort).toString()}`).then(response => {
            response.json().then(albums => {
                setAlbums(albums);
            });
        });
    }, [sort]);

    albums.map(album => {
        if (!genres.includes(album.genre)) {
            genres.push(album.genre);
        }
        return genres.sort();
    });

    // setSort(() => {
    //     return {key: "title", order: 1, select: genres}
    // });

    useEffect(() => {
        let params = new URLSearchParams();
        [...new Set(sort.select)].map(genre => {
            return params.append("genres", genre);
        })
        fetch(`http://localhost:4000/filter?${params.toString()}`).then(response => {
            response.json().then(albums => {
                setSelectedAlbums(albums);
            });
        });
    }, [sort]);

    function toggleOrder() {
        sort.order === 1 ? setSort(prev => {
            return { ...prev, order: -1 }
        }) : setSort(prev => {
            return { ...prev, order: 1 }
        })
    }

    function selectSort(selection) {
        setSort(prev => {
            return { ...prev, key: selection }
        });
    }

    function filterGenres(genre, i) {
        const checkBox = document.getElementById(i);
        if (checkBox.checked) {
            setSort(prev => {
                return {...prev, select: [...new Set([...prev.select, genre])], filter: true}
            });
        } else {
            setSort(prev => {
                return {...prev, select: sort.select.filter(item => item !== genre)}
            });
            if (sort.select.length === 1) {
                setSort(prev => {
                    return {...prev, filter: false}
                });
            }
        }
    }

    function showAlbums() {
        if(!sort.filter) {
            return (albums.length > 0 && albums.map((album, i) => (
                <Album key={i} {...album} />
            )));
        } else {
            return (selectedAlbums.length > 0 && selectedAlbums.map((album, i) => (
                <Album key={i} {...album} />
            )));
        }
    }

    function checkNumber(){
        if(!sort.filter) {
            numberOfAlbums = albums.length;
        } else {
            numberOfAlbums = selectedAlbums.length;
        }
        if (numberOfAlbums > 1) {
            return <p>{numberOfAlbums} albums</p>
        } else {
            return <p>{numberOfAlbums} album</p>
        }
}
    return (
        <div className="list">
            <div className="list-buttons">
                <button className="addTrack edit" onClick={() => toggleOrder()}>⬍ Order</button>
                <p>|</p>
                <div className="sort">
                    <button className="addTrack edit">Sort by: {sort.key.toString().charAt(0).toUpperCase() + sort.key.toString().slice(1)} ▾</button>
                    <div className="dropdown-sort">
                        <button className="addTrack edit" onClick={() => { selectSort("title") }}>Title</button>
                        <button className="addTrack edit" onClick={() => { selectSort("artist") }}>Artist</button>
                        <button className="addTrack edit" onClick={() => { selectSort("year") }}>Year</button>
                        <button className="addTrack edit" onClick={() => { selectSort("genre") }}>Genre</button>
                    </div>
                </div>
                <p>|</p>
                <div className="sort">
                    <button className="addTrack edit">Filter by Genre ▾</button>
                    <div className="dropdown-sort">
                        {genres.map((genre, i) => (
                            <label className="container" key={i}>{genre}
                                <input type="checkbox" id={i} value={genre} onClick={() => filterGenres(genre, i)}/>
                                <span className="checkmark"></span>
                            </label>
                        ))}
                    </div>
                </div>
                <p>|</p>
                <div className="number">
                    {checkNumber()}
                </div>
            </div>
            {showAlbums()}
        </div>
    )
}