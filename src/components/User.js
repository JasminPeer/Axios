import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

function User() {
   const [users, setUsers] = useState([]);
   // to add new data
   const [newName, setNewName] = useState("");
   const [newEmail, setNewEmail] = useState("");
   const [newWebsite, setNewWebsite] = useState("");
   const[editingID,setEditingId]=useState("");
  //  const [newAddress, setNewAddress] = useState(""); // one field for city & street

   useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
         .then((response) => response.json())
         .then((data) => setUsers(data.slice(0, 10)));
   }, []);

   function addUser() {
      const name = newName.trim();
      const email = newEmail.trim();
      const website = newWebsite.trim();
      // const address = newAddress.trim();

      if (name && email && website) {
         // split city and street if user enters "City, Street"
        //  const [city = "", street = ""] = address.split(",").map(s => s.trim());

         fetch('https://jsonplaceholder.typicode.com/users', {
            method: "POST",
            body: JSON.stringify({
               name,
               email,
               website,
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
               setNewEmail("");
               setNewWebsite("");
              //  setNewAddress("");
            });
      }
   }
  //  Fill form values of edit ID
  function startEdit(user){
    setEditingId(user.id);
    setNewName(user.name || "");
    setNewEmail(user.email ||"");
    setNewWebsite(user.website||"");
  }
  // Update(PUT)
  function updateUser(){
    const name=newName.trim();
    const email=newEmail.trim();
    const website=newWebsite.trim();
    if(!editingID||!name||!email||!website)
      return;
    fetch(`https://jsonplaceholder.typicode.com/users/${editingID}`,
      {
        method:"PUT",
        headers:{
           "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({name,email,website})
   } )
   .then((response)=>response.json())
   .then((updated)=>{
    setUsers((prev)=>
    prev.map((u)=>
    u.id===editingID?
  {
    ...u,
    name,
    email,
    website
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
               setNewEmail("");
               setNewWebsite("");
               setEditingId("");

  }
  // Delete function
  function deleteUser(id){
    if(!window.confirm("Do you want to delete??")) return;
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
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
               <th>Email</th>
               <th>Website</th>
               {/* <th>Address</th> */}
               <th>Action</th>
            </tr>
         </thead>
         <tbody>
            {users.map((user) =>
               <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.website}</td>
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
               <td><input type='email' placeholder='Enter Email' value={newEmail} onChange={(e) => setNewEmail(e.target.value)} /></td>
               <td><input type='text' placeholder='Enter Website' value={newWebsite} onChange={(e) => setNewWebsite(e.target.value)} /></td>
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

export default User;
