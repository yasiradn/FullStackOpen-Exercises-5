import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const handleLogin = async(e) => {
    e.preventDefault()
    console.log(`Loggin using ${username} ${password}`)
    try {
      const user = await loginService.login({
        username, password
      })
      console.log('user data', user)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(err)
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

  const showBlogs = () => {
    return(
      <div>
        <p>{user.name} logged in</p>
        <h2>blogs</h2>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    )
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
     {user === null ? loginForm() : showBlogs()}
    </div>
  )
}

export default App