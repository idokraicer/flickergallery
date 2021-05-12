import React from 'react'
import Image from './Image'

export default function FavImages({favImages, setFavImages, images, setImages}) {
    return (
        <div>
            <div className="gallery-root">
            {favImages.map(element => {
                console.log(element)
                return <Image key={Math.random()} image={element}  images={images} setImages={setImages} favImages={favImages} setFavImages={setFavImages}/> 

            })}
            </div>
        </div>
    )
}
