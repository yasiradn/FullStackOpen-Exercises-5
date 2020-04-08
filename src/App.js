import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthour] = useState('')
  const [url, setUrl] = useState('')

  useEffect(()=>{
    const getLoggedUser = window.localStorage.getItem('BlogAppUser')
    if(getLoggedUser){
      const user = JSON.parse(getLoggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async(e) => {
    e.preventDefault()
    console.log(`Loggin using ${username} ${password}`)
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('BlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(err)
    }
  }

  const handleBlogCreate = async(e) => {
    e.preventDefault()
    console.log(`Passing Data ${title} ${author} ${url}`)
    try {
      const newObj = {title,author,url}
      await blogService.postAll(newObj)
      setTitle('')
      setAuthour('')
      setUrl('')
      setBlogs([...blogs,newObj])
    } catch (error) {
      console.log('error: Adding a blog',error)
    }
  }

  const loginForm = () => {
      return(
        <div>
          <h2>log in to application</h2>
          <form onSubmit={handleLogin}>
        <div>
          username <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
        </div>
      )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    window.localStorage.clear()
  }

  const showBlogs = () => {
    return(
      <div>
        <p>{user.name} logged in <button onClick={handleLogout}> logout </button></p> 
        {addNewBlog()}
        <h2>blogs</h2>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    )
  }

  const addNewBlog = () => {
    return(
      <div>
        <h2>create new</h2>
        <form onSubmit={handleBlogCreate}>
        <div>
          <div>
          title <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)}/>
          </div>
          <div>
          author <input type="text" value={author} name="Title" onChange={({ target }) => setAuthour(target.value)}/>
          </div>
          <div>
          url <input type="text" value={url} name="Title" onChange={({ target }) => setUrl(target.value)}/>
          </div>
        </div>
        <button type="submit">create</button>
        </form>
      </div>
    )
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

  return (
    <div>
     {user === null ? loginForm() : showBlogs()}
    </div>
  )
}

export default App