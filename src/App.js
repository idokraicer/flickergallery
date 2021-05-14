import './css/App.css';
import Gallery from './components/Gallery';
import FontAwesome from 'react-fontawesome';
import React, {useState, useEffect} from 'react'
import LoadPage from './components/LoadPage'
import SideBar from './components/SideBar';
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';



function App() {
  const [tag, setTag] = useState("sea")
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([])
  const [sidebar, setSidebar] = useState(false)
  const [favImages, setFavImages] = useState([])
  const [infiniteScroll, setInfiniteScroll] = useState(localStorage.getItem('InfScrollToggle')?.includes('true'))

  const [loadingNext, setLoadingNext] = useState(false)

  const handleScroll = () => {
    if(infiniteScroll && !loadingNext && false) {//Disabled, to enable remove '&& false'
        if(document.documentElement.scrollTop + window.innerHeight === document.documentElement.scrollHeight ){
          setLoadingNext(true)
          console.log(typeof infiniteScroll, infiniteScroll, 'handleScroll End')
        } 
        
      }
      
    }
    
  

  const getImages = (tag) => {
        
    let getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=${4*4}&page=${page}&format=json&safe_search=1&nojsoncallback=1`;
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
    if(localStorage.getItem('favImages') !== null) setFavImages(JSON.parse(localStorage.getItem('favImages')))
    //window.addEventListener('scroll', handleScroll);
  }, [])

  useEffect(() => {
    getImages(tag)
  }, [page])

  useEffect(() => {
    localStorage.setItem('InfScrollToggle', infiniteScroll)

}, [infiniteScroll])

  return (
    
    <div className="App" onScroll={handleScroll} >
      <a className={sidebar ? 'openbtn open' : "openbtn"} onClick={() => setSidebar(!sidebar)}>{!sidebar ? 'Open' : "Close"} Favorite Images</a>

      <SideBar key={'sidebar'} sidebar={sidebar} setSidebar={setSidebar} favImages={favImages} setFavImages={setFavImages}/>
      <InfiniteScroll
        dataLength={images.length} //This is important field to render the next data
        next={() => {setPage(page +1) 
                  console.log('Loading page',page, ', total of', images?.length, 'images.')}}
        hasMore={infiniteScroll}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={() => {
          setPage(1)
        }}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      >
        <Gallery key={'gallery'} loadingNext={loadingNext} setLoadingNext={setLoadingNext} tag={tag} setTag={setTag} page={page} setPage={setPage} images={images} setImages={setImages} favImages={favImages} setFavImages={setFavImages} infiniteScroll={infiniteScroll} setInfiniteScroll={setInfiniteScroll}/>
      </InfiniteScroll>
      <LoadPage key={'loadmore'} page={page} setPage={setPage}/>
    </div>
  );



}

export default App;
