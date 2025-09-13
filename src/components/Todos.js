import React from 'react'
import { useEffect, useState } from 'react';


function Todos() {
   const[todos,setTodos]=useState([]);
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response)=>response.json())
    .then((data)=>setTodos(data.slice(0,10)))
  },[])
  return (
   <table className='responsive table'>
    <thead>
      <tr>
        <th>ID</th>
        
          <th>Title</th>
           <th>Completed</th>
           
         
           
      </tr>
    </thead>
    <tbody>
      {todos.map((todo)=>
 <tr key={todo.id}>
        <td>{todo.id}</td>
        
          <td>{todo.title}</td> 
          <td>{String(todo.completed)}</td>
          
           
      </tr>
      )}
     
    </tbody>
   </table>
  
  );
}

export default Todos
