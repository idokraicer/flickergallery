import './css/App.css';
import Gallery from './components/Gallery';
import FontAwesome from 'react-fontawesome';
import React, {useState, useEffect} from 'react'
import LoadPage from './components/LoadPage'
import SideBar from './components/SideBar';


function App() {
  const [tag, setTag] = useState("sea")
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([])
  const [sidebar, setSidebar] = useState(false)
  const [favImages, setFavImages] = useState([])
  const [infiniteScroll, setInfiniteScroll] = useState(false)
  const handleScroll = () => {
    if(document.documentElement.scrollTop + window.innerHeight == document.documentElement.scrollHeight && infiniteScroll){
        setPage(page +1)
    }
  }

  useEffect(() => {
    infiniteScroll ? document.addEventListener('scroll', handleScroll, {passive: true}) :
    document.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    infiniteScroll ? document.addEventListener('scroll', handleScroll, {passive: true}) :
    document.removeEventListener('scroll', handleScroll)
  }, [page])

  useEffect(() => {
    infiniteScroll ? document.addEventListener('scroll', handleScroll, {passive: true}) :
    document.removeEventListener('scroll', handleScroll)
}, [infiniteScroll])

  return (
    
    <div className="App" >
      <a className="openbtn" onClick={() => setSidebar(!sidebar)}>Open Favorite Images</a>

      <SideBar sidebar={sidebar} setSidebar={setSidebar} favImages={favImages} setFavImages={setFavImages}/>

      <Gallery tag={tag} setTag={setTag} page={page} setPage={setPage} images={images} setImages={setImages} favImages={favImages} setFavImages={setFavImages} infiniteScroll={infiniteScroll} setInfiniteScroll={setInfiniteScroll}/>
      
      <LoadPage page={page} setPage={setPage}/>
    </div>
  );



}

export default App;
