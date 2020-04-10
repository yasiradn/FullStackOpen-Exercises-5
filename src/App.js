import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import AddNewBlog from './components/AddBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthour] = useState('')
  const [url, setUrl] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [showMsg, setMsg] = useState('')
  const [shouldShow, setShouldShow] = useState(true)

  useEffect(() => {
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
      console.log(blogs)
      setUsername('')
      setPassword('')
    } catch (err) {
      setErrMsg('Wrong username or password')
      setTimeout(() => {setErrMsg('')},2000)
      console.log(err)
    }
  }

  const handleBlogCreate = async(e) => {
    e.preventDefault()
    console.log(`Passing Data ${title} ${author} ${url}`)
    try {
      const newObj = { title,author,url }
      await blogService.postAll(newObj)
      setBlogs([...blogs,newObj])
      setMsg(`A new blog ${title} by ${author} added`)
      setTimeout(() => {setMsg('')},2000)
      setTitle('')
      setAuthour('')
      setUrl('')
    } catch (error) {
      console.log('error: Adding a blog',error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('BlogAppUser')
    window.localStorage.clear()
  }

  async function handleBtn(blog){
    let likes = blog.likes + 1
    console.log(likes)
    const updateObj = {
      likes: likes,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      id:blog.id
    }
    await blogService.updateAll(updateObj)
  }


  const showBlogs = () => {

    return(
      <div>
        <ShowMessage message={showMsg}/>
        <p>{user.name} logged in <button id="logout" onClick={handleLogout}> logout </button></p>
        {isShowBlog}
        <h2>blogs</h2>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} onClickUpdate={() => handleBtn(blog)}/>)}
      </div>
    )
  }

  const addNewBlog = () => {
    return(
      <div>
        <AddNewBlog
          handleBlogCreate={handleBlogCreate}
          title={title}
          author={author}
          url={url}
          handlesetTitle={({ target }) => setTitle(target.value)}
          handlesetAuthor={({ target }) => setAuthour(target.value)}
          handlesetUrl={({ target }) => setUrl(target.value)}
        />
        <button onClick={() => setShouldShow(true)}>cancel</button>
      </div>
    )
  }

  const isShowBlog = shouldShow ? <button id="createBlog-btn" onClick={() => setShouldShow(false)}> new blog </button> : <div>{addNewBlog()}</div>

  async function getAllBlogs(){
    const result = await blogService.getAll()
    result.sort((a, b) => b.likes - a.likes)
    setBlogs(result)
  }

  useEffect(() => {
    console.log('useffect')
    getAllBlogs()
  }, [blogs])

  const ShowMessage = ({ message }) => {
    return (message === '') ? '': <div className="showMessage">{message}</div>
  }
  const ErrorMessage = ({ message }) => {
    return (message === '') ? '': <div className="errorMessage">{message}</div>
  }

  const showLoginForm = () => {
    return (
      <div>
        <ErrorMessage message={errMsg}/>
        <LoginForm
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
          username={username}
          password={password} />
      </div>
    )
  }

  return (
    <div>
      {user === null ? showLoginForm() : showBlogs()}
    </div>
  )
}

export default App