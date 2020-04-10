import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, onClickUpdate }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }
  const [viewBlog, setViewBlog] = useState(false)

  async function removeBlog(){
    try{
      const isDel = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
      if(isDel){
        console.log('Deleting')
        await blogService.deleteBlog(blog.id)
      }
    }catch(err){
      console.log(err)
    }
  }

  const blogDetailView = () => {
    return(
      <div id= "detailedView">
        <p id="title">{blog.title} <button id="hide-Btn" onClick={() => setViewBlog(false)}>hide</button></p>
        <p id="url">{blog.url}</p>
        <p id="like">likes {blog.likes} <button id="like-btn" onClick={onClickUpdate}>likes</button></p>
        <p id="author">{blog.author}</p>
        <button id="delete-btn" onClick={removeBlog}>remove</button>
      </div>
    )
  }

  const blogNormalView = () => {
    return(
      <div id="normalView">
        {blog.title} {blog.author} <button id="view-btn" onClick={() => setViewBlog(true)}> view </button>
      </div>
    )
  }
  return (
    <div style={blogStyle} className={'blog'}>
      {viewBlog ? blogDetailView(): blogNormalView()}
    </div>
  )

}
export default Blog
