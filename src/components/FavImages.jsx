import React from 'react'
import Image from './Image'

export default function FavImages({favImages, setFavImages}) {
    return (
        <div>
            <div className="gallery-root">
            {favImages.map(element => {
                console.log(element)
                return <Image image={element}  />

            })}
            </div>
        </div>
    )
}
