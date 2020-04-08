import React, {useState} from 'react'
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }
  const [viewBlog, setViewBlog] = useState(false)
  const blogDetailView = () => {
    return(
      <div>
        {blog.title} <button onClick={()=>setViewBlog(false)}>hide</button>
        <br/> 
        {blog.url}
        <br/>
        likes {blog.likes} <button>likes</button>
        <br/>
        {blog.author}
      </div>
    )
  }

  const blogNormalView = () => {
    return(
      <div>
        {blog.title} {blog.author} <button onClick={()=>setViewBlog(true)}> view </button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
       {viewBlog ? blogDetailView(): blogNormalView()}
  </div>
  )

}
export default Blog
