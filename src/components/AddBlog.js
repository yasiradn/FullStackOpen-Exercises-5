import React from 'react'
const AddNewBlog = ({ handleBlogCreate,title,author,url,handlesetTitle,handlesetAuthor,handlesetUrl }) => {
  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreate}>
        <div>
          <div>
          title <input type="text" value={title} name="Title" onChange={handlesetTitle}/>
          </div>
          <div>
          author <input type="text" value={author} name="Author" onChange={handlesetAuthor}/>
          </div>
          <div>
          url <input type="text" value={url} name="URL" onChange={handlesetUrl}/>
          </div>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AddNewBlog