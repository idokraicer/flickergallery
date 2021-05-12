import React, {useEffect, useState} from 'react'
import FontAwesome from 'react-fontawesome';
import './Image.scss';
import Swal from 'sweetalert2'



export default function Image({image, images, setImages, favImages, setFavImages, index, handleDragStart, handleDragOver, handleDrop}) {
    const [flip, setflip] = useState(false)
    const [isInFavs, setIsInFavs] = useState(false)
   
    
    useEffect(() => {
        //document.addEventListener("dragend", (e) => doSomething(e))
        /*document.addEventListener("dragStart", (e) => handleDragStart(e))
        document.addEventListener("dragOver", (e) => handleDragOver(e))*/
    }, [])
    useEffect(() => {
        if(favImages !== null && favImages !== undefined && favImages.indexOf(image) < 0){
            
            setIsInFavs(false)
        } else setIsInFavs(true)
    },[favImages])
    const urlFromDto = (dto) => {
        // console.log(dto);
        return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
        
    }
    const insert = (arr, index, newItem) => [
        // part of the array before the specified index
        ...arr.slice(0, index),
        // inserted item
        newItem,
        // part of the array after the specified index
        ...arr.slice(index)
    ]
    const doSomething = (e) => {
        console.log("hey")
    }
    
    return (
        <div
            className='image-root'
            key={image.id} 
            draggable='true' 
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(index, e)}
            onDrop={(e) => handleDrop(e)}
            image={image}
            style={{
            backgroundImage: `url(${urlFromDto(image)})`,
            
            width: '20vw',
            height: '20vw',
            padding: '10%',
            transform: flip ? 'scaleY(-1)' : ''
            }}
        >
            <div style={{transform: flip ? 'scaleY(-1)' : ''}}>
                <FontAwesome className='image-icon' name="fas fa-snowboarding fa-rotate-180" title="Flip image" onClick={() => setflip(!flip)}/>
                <FontAwesome className='image-icon' name="far fa-clone" title="Clone" onClick={() => setImages(insert(images,images.indexOf(image),image))}/>
                <FontAwesome className='image-icon' name="expand" title="Expand" onClick={() => Swal.fire({
                    imageUrl: `${urlFromDto(image)}`,
                    imageHeight: '80vh',
                    width: 'auto',
                    imageAlt: 'A tall image',
                    text: image.title
                })}/>
                <FontAwesome className='image-icon' name={ !isInFavs ? 'far fa-thumbs-up' : 'fas fa-check' }  title={!isInFavs ? 'Add to favorites': 'Remove from favorites'} onClick={() => {
                    !isInFavs ? setFavImages(insert(favImages, 0, image)) : setFavImages(favImages.filter(img => img.id !== image.id))
                    }} />
            </div> 
        </div>
    )
}
/* 

<div>
        <FontAwesome className='image-icon'  name="arrows-alt-h" title="flip"
        />
        <FontAwesome className="image-icon" 
        name="clone" title="clone"
        />
        <FontAwesome className="image-icon" name="expand" title="expand"/>
        <FontAwesome /*name={this.state.liked ? 'fas fa-check' : 'far fa-thumbs-up'} className='image-icon' title='favorite' 
        />

*/