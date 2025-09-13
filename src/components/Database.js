import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

function Database() {
   const [users, setUsers] = useState([]);
   // to add new data
   const [newName, setNewName] = useState("");
   const [newAge, setNewAge] = useState("");
   const [newCity, setNewCity] = useState("");
   const[editingID,setEditingId]=useState("");
  //  const [newAddress, setNewAddress] = useState(""); // one field for city & street

   useEffect(() => {
      fetch('http://localhost:3001/users')
         .then((response) => response.json())
         .then((data) => setUsers(data));
   }, []);

   function addUser() {
      const name = newName.trim();
      const age = newAge.trim();
      const city = newCity.trim();
      // const address = newAddress.trim();

      if (name && age && city) {
         // split city and street if user enters "City, Street"
        //  const [city = "", street = ""] = address.split(",").map(s => s.trim());

         fetch('http://localhost:3001/users', {
            method: "POST",
            body: JSON.stringify({
               name,
               age,
               city,
              //  address: { city, street }
            }),
            headers: {
               "Content-Type": "application/json; charset=utf-8"
            }
         })
            .then((response) => response.json())
            .then((data) => {
               setUsers([...users, data]);
               alert("User Added Successfully");
               setNewName("");
               setNewAge("");
               setNewCity("");
              //  setNewAddress("");
            });
      }
   }
  //  Fill form values of edit ID
  function startEdit(user){
    setEditingId(user.id);
    setNewName(user.name || "");
    setNewAge(user.age ||"");
    setNewCity(user.city||"");
  }
  // Update(PUT)
  function updateUser(){
    const name=newName.trim();
    const age=newAge;
    const city=newCity.trim();
    if(!editingID||!name||!age||!city)
      return;
    fetch(`http://localhost:3001/users/${editingID}`,
      {
        method:"PUT",
        headers:{
           "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({name,age,city})
   } )
   .then((response)=>response.json())
   .then((updated)=>{
    setUsers((prev)=>
    prev.map((u)=>
    u.id===editingID?
  {
    ...u,
    name,
    age,
    city
  }:u
));
alert("User Updated Successfull!!");
CancelEdit();
   })
   .catch(()=>alert("Updated Failed!!"))
  }
  // cancel edit mode
  function CancelEdit(){
        setNewName("");
               setNewAge("");
               setNewCity("");
               setEditingId("");

  }
  // Delete function
  function deleteUser(id){
    if(!window.confirm("Do you want to delete??")) return;
    fetch(`http://localhost:3001/users/${id}`,
      {
        method:"DELETE"
      }
    )
    .then(()=>{
      setUsers((prev)=>prev.filter((u)=>u.id!==id))
      alert("User Deleted  Successfully!! ")
    })
    .catch(()=>alert("USer Delete Failed!"))
  }

   return (
      <table className='table'>
         <thead>
            <tr>
               <th>ID</th>
               <th>Name</th>
               <th>Age</th>
               <th>City</th>
               {/* <th>Address</th> */}
               <th>Action</th>
            </tr>
         </thead>
         <tbody>
            {users.map((user) =>
               <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.city}</td>
                  {/* <td>{user.address?.city}, {user.address?.street}</td> */}
                  <td>
                     <Button variant='primary' onClick={()=>startEdit(user)}>Edit</Button>
                     <Button variant='danger' onClick={()=>deleteUser(user.id)}>Delete</Button>
                  </td>
               </tr>
            )}
         </tbody>
         <tfoot>
            <tr>
               <td></td>
               <td><input type='text' placeholder='Enter Name' value={newName} onChange={(e) => setNewName(e.target.value)} /></td>
               <td><input type='num' placeholder='Enter Age' value={newAge} onChange={(e) => setNewAge(e.target.value)} /></td>
               <td><input type='text' placeholder='Enter City' value={newCity} onChange={(e) => setNewCity(e.target.value)} /></td>
               {/* <td>
                  <input
                     type='text'
                     placeholder='Enter City, Street'
                     value={newAddress}
                     onChange={(e) => setNewAddress(e.target.value)}
                  />
               </td> */}
              
               <td>
                {editingID?
                (<><Button variant='warning' onClick={updateUser}>Update</Button>
                <Button variant='dark' onClick={CancelEdit}>CancelEdit</Button></>)
                :
                (<Button variant='success' onClick={addUser}>Add User</Button>)}
               </td>
            </tr>
         </tfoot>
      </table>
   );
}

export default Database;
