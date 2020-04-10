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
        await blogService.deleteBlog(blog.id)
      }
    }catch(err){
      console.log(err)
    }
  }

  const blogDetailView = () => {
    return(
      <div>
        {blog.title} <button onClick={() => setViewBlog(false)}>hide</button>
        <br/>
        {blog.url}
        <br/>
        likes {blog.likes} <button onClick={onClickUpdate}>likes</button>
        <br/>
        {blog.author}
        <br/>
        <button onClick={removeBlog}>remove</button>
      </div>
    )
  }

  const blogNormalView = () => {
    return(
      <div>
        {blog.title} {blog.author} <button onClick={() => setViewBlog(true)}> view </button>
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
