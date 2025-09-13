import React from 'react'
import { useEffect, useState } from 'react';


function Comments() {
   const[comments,setComments]=useState([]);
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/comments')
    .then((response)=>response.json())
    .then((data)=>setComments(data.slice(0,10)))
  },[])
  return (
   <table className='responsive table'>
    <thead>
      <tr>
        <th>ID</th>
         <th>PostID</th>
          <th>Name</th>
           <th>Email</th>
           <th>Body</th>
           
         
           
      </tr>
    </thead>
    <tbody>
      {comments.map((components)=>
 <tr key={components.id}>
        <td>{components.id}</td>
         <td>{components.postId}</td>
          <td>{components.name}</td> 
          <td>{components.email}</td>
          <td>{components.body}</td>
          
           
      </tr>
      )}
     
    </tbody>
   </table>
  
  );
}

export default Comments
