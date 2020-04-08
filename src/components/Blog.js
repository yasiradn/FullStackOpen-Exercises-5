import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }
  const [viewBlog, setViewBlog] = useState(false)
  const [countLike, setCountLike] = useState(0)
  const handleUpdate = async() => {
    //no auth in backend as now
    console.log(`update like`)
    setCountLike(countLike+1)
    const updateObj = {
      likes: countLike,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      id:blog.id
    }
    await blogService.updateAll(updateObj)
  }
  const blogDetailView = () => {
    return(
      <div>
        {blog.title} <button onClick={()=>setViewBlog(false)}>hide</button>
        <br/> 
        {blog.url}
        <br/>
        likes {blog.likes} <button onClick={handleUpdate}>likes</button>
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
