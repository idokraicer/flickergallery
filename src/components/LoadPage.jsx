import React from 'react'
import FontAwesome from 'react-fontawesome';

export default function LoadPage({setLoadingNext}) {
    
    return (
        <div>
            <a onClick={(e) => {setLoadingNext(true)}}>
                <FontAwesome name="fas fa-arrow-circle-right"/>
            </a>
        </div>
    )
}
