import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Image from './Image'


export default function Gallery({tag, setTag, page, setPage, images, setImages, favImages, setFavImages, infiniteScroll, setInfiniteScroll}) {

    

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
    useEffect(() => {
        getImages(tag)
    }, [])

    

    useEffect(() => {
        getImages(tag)
        
    }, [tag, page])
    return (
        <div >
            <input type="text" className="app-input" onChange={(e) => {
                setTag(e.target.value)
                setPage(0)
                setImages([])
                }} value={tag}/>
            <br></br>
            <span>Infinite scrolling?</span>
            <label className="switch">

                <input type="checkbox" defaultChecked={infiniteScroll} onChange={() => {
                    setInfiniteScroll(!infiniteScroll)
                    localStorage.setItem('InfScrollToggle', JSON.stringify(infiniteScroll));
                }} />
                <span className="slider round"></span>
            </label>
            <div className="gallery-root" style={{marginTop: '15px'}}>
            {images.map(element => {
                return <Image image={element} images={images} setImages={setImages} favImages={favImages} setFavImages={setFavImages}/>
            })}
            </div>
        </div>
        
    )
}