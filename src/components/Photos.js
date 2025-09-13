import React from 'react'
import { useEffect, useState } from 'react';


function Photos() {
   const[photos,setPhotos]=useState([]);
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/photos')
    .then((response)=>response.json())
    .then((data)=>setPhotos(data.slice(0,10)))
  },[])
  return (
   <table className=' table'>
    <thead>
      <tr>
        <th>ID</th>
         <th>AlbumID</th>
          <th>Title</th>
           <th>Url</th>
           <th>ThumbnaiUrl</th>
         
           
      </tr>
    </thead>
    <tbody>
      {photos.map((photos)=>
 <tr key={photos.id}>
        <td>{photos.id}</td>
         <td>{photos.albumId}</td>
          <td>{photos.title}</td> 
          <td>{photos.url}</td>
          <td>{photos.thumbnailUrl}</td>
          
           
      </tr>
      )}
     
    </tbody>
   </table>
  
  );
}

export default Photos
