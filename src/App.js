

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import User from './components/User';
import Post from './components/Post';
import Photos from './components/Photos';
import Comments from './components/Comments';
import Todos from './components/Todos';

function App() {
 return(
  <>
  <h2>Users List</h2>
<User/>
  <hr/>
  <h2>Posts List</h2>
  <Post/>
  <hr/>
  <h2>Comments List</h2>
  <Comments/>
   <hr/>
  <h2>Photos List</h2>
  <Photos/>
   <hr/>
  <h2>Todos List</h2>
  <Todos/>

  </>
 )
}

export default App;
