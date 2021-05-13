import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Image from './Image'

export default function Gallery({tag, setTag, page, setPage, images, setImages, favImages, setFavImages, infiniteScroll, setInfiniteScroll, loadingNext, setLoadingNext}) {
    
    const [dragged, setdragged] = useState()
    const [target, settarget] = useState()
    const [scrolling, setscrolling] = useState(false)

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
    const insert = (arr, index, newItem) => [
        // part of the array before the specified index
        ...arr.slice(0, index),
        // inserted item
        newItem,
        // part of the array after the specified index
        ...arr.slice(index)
    ]

    const arrayUnique = (array) => {
        let a = array.concat();
        for(let i=0; i<a.length; ++i) {
          for(let j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
              a.splice(j--, 1);
          }
        }
    
        return a;
    }
    const handleDragStart = (e, index) => {
        setdragged(index)
        e.dataTransfer.setData("text/html", index);
        e.dataTransfer.setDragImage(e.target, 20, 20);
    }

    const handleDragOver = (index, e) => {
        e.preventDefault()
        settarget(index)
        
    }

    const handleDrop = (e) => {
        e.preventDefault()
        if(dragged === target) {
            return;
        }
        let newImagesArr = images.filter((img) => img.id !== images[dragged].id)
        setImages(insert(newImagesArr, target, images[dragged]))
    }
    
    useEffect(() => {
        if(loadingNext){
            console.log(`Loading page ${page}, total of ${images.length} photos.`)
            setPage(page +1)
            getImages(tag)
            setLoadingNext(false)
        }
        
        
    }, [loadingNext])

    

    useEffect(() => {
        
            getImages(tag)
        
    }, [tag])

    useEffect(() => {
        
        document.addEventListener('scroll' , () => {document.documentElement.scrollHeight > 400 ? setscrolling(true) : setscrolling(false)} )
    
    }, [])


    return (
        <div className='galleryContainer'>
            <div className={scrolling ? 'sticky' : ''}>
                <h1>Ido's Flicker Gallery</h1>
                <input type="text" className="app-input" onChange={(e) => {
                    setTag(e.target.value)
                    setPage(1)
                    setImages([])
                    }}
                    value={tag}/>
                <br></br>
                <span>Infinite scrolling?</span>
                    
                <label className="switch">
                    <input type="checkbox" defaultChecked={infiniteScroll} onChange={() => {
                        setInfiniteScroll(!infiniteScroll)
                    }} />
                    <span className="slider round"></span>
                </label>
            </div>        
            <div className="gallery-root">
                        
                {images.map((element, index) => {
                    return <Image index={index} key={index} image={element} images={images} setImages={setImages} favImages={favImages} setFavImages={setFavImages} 
                    handleDragStart={handleDragStart} handleDragOver={handleDragOver} handleDrop={handleDrop}/>
                })}
            </div>  
        </div>
        
    )
}