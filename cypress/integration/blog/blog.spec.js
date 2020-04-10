describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3005/api/testing/reset')
    const user = {
      name: 'Jhon Doe',
      username: 'jhondoe',
      password: 'doe911112'
    }
    cy.request('POST', 'http://localhost:3005/api/users/', user)
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

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('jhondoe')
      cy.get('#password').type('doe911112')
      cy.get('#login-btn').click()
    })
    it('A blog can be created', function() {
      cy.get('#createBlog-btn').click()
      cy.get('#title').type('Please Fund More Science')
      cy.get('#author').type('Sam Altman')
      cy.get('#url').type('https://blog.samaltman.com/please-fund-more-science')
      cy.get('#submit-btn').click()
      cy.get('.showMessage').contains('A new blog Please Fund More Science by Sam Altman added')
    })
  })
})