describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3005/api/testing/reset')
    const user = {
      name: 'Jhon Doe',
      username: 'jhondoe',
      password: 'doe911112'
    }
    cy.request('POST', 'http://localhost:3005/api/users/', user)
    const user2 = {
      name: 'Another User',
      username: 'user2',
      password: 'doe911112'
    }
    cy.request('POST', 'http://localhost:3005/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login').click()
  })

  it('succeeds with correct credentials', function() {
    // ...
    cy.get('#username').type('jhondoe')
    cy.get('#password').type('doe911112')
    cy.get('#login-btn').click()
    cy.get('#logout').click()
  })

  it('fails with wrong credentials', function() {
    // ...
    cy.get('#username').type('jhondoe')
    cy.get('#password').type('lol!jhondoe')
    cy.get('#login-btn').click()
    cy.get('.errorMessage').contains('Wrong username or password')
    cy.get('.errorMessage').should('have.css', 'color','rgb(255, 0, 0)')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jhondoe', password: 'doe911112' })
    })
    it('A blog can be created', function() {
      cy.get('#createBlog-btn').click()
      cy.get('#title').type('Please Fund More Science')
      cy.get('#author').type('Sam Altman')
      cy.get('#url').type('https://blog.samaltman.com/please-fund-more-science')
      cy.get('#submit-btn').click()
      cy.get('.showMessage').contains('A new blog Please Fund More Science by Sam Altman added')
    })
    it('user can like blog', function() {
      cy.get('#createBlog-btn').click()
      cy.get('#title').type('Please Fund More Science')
      cy.get('#author').type('Sam Altman')
      cy.get('#url').type('https://blog.samaltman.com/please-fund-more-science')
      cy.get('#submit-btn').click()
      cy.get('.showMessage').contains('A new blog Please Fund More Science by Sam Altman added')
      cy.get('#view-btn').click()
      cy.get('#like-btn').click()
      cy.contains('1')
    })
    it('user can delete blog', function() {
      cy.get('#createBlog-btn').click()
      cy.get('#title').type('Please Fund More Science')
      cy.get('#author').type('Sam Altman')
      cy.get('#url').type('https://blog.samaltman.com/please-fund-more-science')
      cy.get('#submit-btn').click()
      cy.get('.showMessage').contains('A new blog Please Fund More Science by Sam Altman added')
      cy.get('#view-btn').click()
      cy.get('#delete-btn').click()
    })
    it('user can only delete his blog', function() {
      cy.get('#createBlog-btn').click()
      cy.get('#title').type('Please Fund More Science')
      cy.get('#author').type('Sam Altman')
      cy.get('#url').type('https://blog.samaltman.com/please-fund-more-science')
      cy.get('#submit-btn').click()
      cy.get('.showMessage').contains('A new blog Please Fund More Science by Sam Altman added')
      cy.get('#logout').click()
      cy.visit('http://localhost:3000')
      cy.get('#username').type('user2')
      cy.get('#password').type('doe911112')
      cy.get('#login-btn').click()
      cy.get('#view-btn').click()
      cy.get('#delete-btn').click()
      cy.contains('Please Fund More Science')
    })
    it('Blogs are orderd to likes - Most likes is the first one', function() {
      cy.createBlog({ title:'A Little More Clojure ',author:'Robert C. Martin',url:'https://blog.cleancoder.com/uncle-bob/2020/04/09/ALittleMoreClojure.html',likes:10 })
      cy.createBlog({ title:'Please Fund More Science',author:'Sam Altman',url:'https://blog.samaltman.com/please-fund-more-science',likes:12 })
      cy.get('div#normalView').first().contains('Please Fund More Science')
    })
  })
})