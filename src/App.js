import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [is_published, setIsPublished]= useState();
  const [title, setTitle]= useState();
  const [content_section_one, setContent_section_one]= useState();
  const [postedBlog, setPostedBlog] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [responseMessage, setResponseMessage] = useState();

  function postBlog(e) {
    e.preventDefault();

    const token = 'dfsdfsdfd';

    // fetch("/api/v1/blog", {
    //   method: "POST",
    //   mode: "no-cors",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: {//JSON.stringify(
    //     is_published,
    //     title,
    //     content_section_one,
    //     image_url: "image",
    //     image_public_id: "image id"
    //   }//)
    // }).then(data => {data.json(); console.log(data)}).
    // then( data => {console.log(data); })
    //   //setPostedBlog(data.data); setResponseMessage(data.message)})
    // .catch(error => setErrorMessage(error.message));

    axios.get("/api/v1/user")
    .then(({data}) => {
      if(data.status === 'ERROR'){
        setErrorMessage(data.message)
      }

      setPostedBlog(data.data.user);
      setResponseMessage(data.message)
      
    }).catch(err => {setErrorMessage(err.message); console.log(err)});

  }


  return (
    <div className="App">
      Blog Post
      <form>
        {responseMessage? <div style={{backgroundColor: "green", color: "black"}}>{responseMessage}</div> : null}
        {errorMessage? <div style={{backgroundColor: "red", color: "white"}}>{errorMessage}</div> : null}


        <label>Title</label>
        <input  name='title' type='text' onChange={e => setTitle(e.target.value)} placeholder='Blog Title'/>
        <label>Content</label>
        <input name='content_section_one'
         onChange={e => setContent_section_one(e.target.value)} placeholder='Blog Content' type='text' />
<label htmlFor='draft'>save as draft</label>
         <input type='radio' onClick={() => setIsPublished(false)} id='draft' name='a' />
<label htmlFor='save'>save</label>
         <input type='radio' id='save' onClick={() => setIsPublished(true)} name='a'/>

{/* {console.log(postedBlog)} */}
      <button onClick={(e)=>{postBlog(e)}}>Submit</button>

      </form>

      <div>
        {postedBlog ? <h1>{postedBlog.name}</h1> : null}
      </div>
    </div>
  );
}

export default App;
