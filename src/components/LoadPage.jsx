import React from 'react'
import FontAwesome from 'react-fontawesome';

export default function LoadPage({images, setImages, page, setPage}) {
    
    return (
        <div>
            <a onClick={(e) => setPage(page +1)}>
                <FontAwesome name="fas fa-arrow-circle-right"/>
            </a>
        </div>
    )
}
