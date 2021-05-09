import React, {useEffect, useState} from 'react'
import FontAwesome from 'react-fontawesome';
import './Image.scss';


export default function Image({image, images, setImages, favImages, setFavImages}) {
    const [flip, setflip] = useState(false)
    const [expand, setexpand] = useState(0)
    const [isInFavs, setIsInFavs] = useState(false)
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
    return (
        <div
            className='image-root'
            key={image.id.toString()} 
            style={{
            backgroundImage: `url(${urlFromDto(image)})`,
            width: (20+expand)+'vw',
            height: (20+expand)+'vw',
            padding: '10vw',
            transform: flip ? '' : 'scaleX(-1)'
            }}
        >
            <div style={{transform: flip ? '' : 'scaleX(-1)'}}>
                <FontAwesome className='image-icon' name="fas arrows-alt-h" title="flip" onClick={() => setflip(!flip)}/>
                <FontAwesome className='image-icon' name="fa fa-clone" title="clone" onClick={() => setImages(insert(images,images.indexOf(image),image))}/>
                <FontAwesome className='image-icon' name="expand" title="expand" onClick={() => setexpand(expand+2)}/>
                <FontAwesome className='image-icon' name='fas fa-check'  title='favorite' onClick={() => {
                    console.log(favImages.indexOf(image))
                    if(!isInFavs) setFavImages(insert(favImages, 0, image)) 
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