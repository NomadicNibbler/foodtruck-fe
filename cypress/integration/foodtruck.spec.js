describe('The Nomadic Nibbler landing page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('Should have a title', () => {
        cy.get('[data-cy=title]').contains('The Nomadic Nibbler')
    })

    it('Should be able to login with your username', () => {
        cy.get('[data-cy=login-prompt]').contains('Please enter your username')
        cy.get('[data-cy=username-input]').type('Bungalo').should('have.value', 'Bungalo').get('[data-cy=login-button]').click()
        cy.url().should('eq', 'http://localhost:3000/map')
    })

    it('Should allow user to go to the the new user page', () => {
        cy.get('[data-cy=new-user-button]').click().url().should('eq', 'http://localhost:3000/newuser')
    })
})