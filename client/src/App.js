import './App.css';
import { Route, Routes } from "react-router-dom";
import Layout from './Layout';
import IndexPage from './Pages/IndexPage';
import AddAlbum from './Pages/AddAlbum';
import About from './Pages/About';
import Contact from './Pages/Contact';
import AlbumInfo from './Pages/AlbumInfo';
import EditAlbum from './Pages/EditAlbum';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/add" element={<AddAlbum />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/album/:id" element={<AlbumInfo />} />
        <Route path="/edit/:id" element={<EditAlbum />} />
      </Route>
    </Routes>

  );
}

export default App;
