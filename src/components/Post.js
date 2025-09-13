import React from 'react'
import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
function Post() {
   const[posts,setPost]=useState([]);
   
   const[newTitle,setNewTitle]=useState("");
   const[newBody,setNewContent]=useState("");
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response)=>response.json())
    .then((data)=>setPost(data.slice(0,10)))
  },[])
function addPost(){
   
    const title =newTitle.trim();
    const body=newBody.trim();
    if(title&&body){
        fetch('https://jsonplaceholder.typicode.com/posts',
            {
                method:"POST",
                body:JSON.stringify(
                    {
                      
                        title,
                        body

                    }
                ),
                headers:{
                    "Content-Type":"application/json; charset=utf-8"
                }
            }
        )
        .then((response)=>response.json())
        .then((data)=>{
            setPost([...posts,data]);
            alert("User Added Succssfully")
        }
    )
    }
}
  return (
   <table className='responsive table'>
    <thead>
      <tr>
        <th>ID</th>
          <th>Title</th>
           <th>Body</th>
           
         
           
      </tr>
    </thead>
    <tbody>
      {posts.map((post)=>
 <tr key={post.id}>
        <td>{post.id}</td>
          <td>{post.title}</td> 
          <td>{post.body}</td>
          
           
      </tr>
      )}
     
    </tbody>
    <tfoot>
      <tr>
        <td></td>
       
         <td><input type='text' placeholder='Enter Title' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}/></td>
          <td><input type='text' placeholder='Enter Content' value={newBody} onChange={(e)=>setNewContent(e.target.value)}/></td>
           <td><Button variant='success' onClick={addPost}>Add User</Button></td>
      </tr>
    </tfoot>
   </table>
  
  );
}

export default Post
