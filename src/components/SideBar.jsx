import React from 'react'
import FavImages from './FavImages'

export default function SideBar({sidebar, setSidebar, favImages, setFavImages, images, setImages}) {
    return (
        <div className="sideBar" style={{width: sidebar ? '20vw' : ''}}>
            <a href="#" className="closebtn" onClick={() => setSidebar(!sidebar)}>X</a>
            <header>Your favorite images</header>
            <FavImages favImages={favImages} setFavImages={setFavImages} images={images} setImages={setImages} />
        </div>
    )
}
