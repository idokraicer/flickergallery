import './css/App.css';
import Gallery from './components/Gallery';
import FontAwesome from 'react-fontawesome';
import React, {useState, useEffect} from 'react'
import LoadPage from './components/LoadPage'
import SideBar from './components/SideBar';
import axios from 'axios'



function App() {
  const [tag, setTag] = useState("sea")
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([])
  const [sidebar, setSidebar] = useState(false)
  const [favImages, setFavImages] = useState([])
  const [infiniteScroll, setInfiniteScroll] = useState(localStorage.getItem('InfScrollToggle') === 'true')

  const [loadingNext, setLoadingNext] = useState(false)

  const handleScroll = async () => {
    if(infiniteScroll === true && !loadingNext) {
        if((document.documentElement.scrollTop + window.innerHeight) === document.documentElement.scrollHeight ){
          setLoadingNext(true)
        } 
        
      }
      
    }
    
  

  const getImages = (tag) => {
        
    let getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=${4*10}&page=${page}&format=json&safe_search=1&nojsoncallback=1`;
    const baseUrl = 'https://api.flickr.com/';
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: 'GET'
    })
      .then(res => res.data)
      .then(res => {
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {
            setImages(images.concat(res.photos.photo))
        }
      });
}

  useEffect(() => {
    
  }, [])

  useEffect(() => {
  }, [page])

  useEffect(() => {
    infiniteScroll ?  document.addEventListener('scroll', handleScroll, {passive: true}) :
    document.removeEventListener('scroll', handleScroll)
    localStorage.setItem('InfScrollToggle', infiniteScroll === true)

}, [infiniteScroll])

  return (
    
    <div className="App" >
      <a className="openbtn" onClick={() => setSidebar(!sidebar)}>Open Favorite Images</a>

      <SideBar key={'sidebar'} sidebar={sidebar} setSidebar={setSidebar} favImages={favImages} setFavImages={setFavImages}/>
      <Gallery key={'gallery'} loadingNext={loadingNext} setLoadingNext={setLoadingNext} tag={tag} setTag={setTag} page={page} setPage={setPage} images={images} setImages={setImages} favImages={favImages} setFavImages={setFavImages} infiniteScroll={infiniteScroll} setInfiniteScroll={setInfiniteScroll}/>
      <LoadPage key={'loadmore'} page={page} setPage={setPage}/>
    </div>
  );



}

export default App;
