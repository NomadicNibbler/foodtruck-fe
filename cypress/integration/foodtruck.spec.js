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

    it('Should not allow a user to login without entering information in the username field', () => {
        cy.get('[data-cy=login-button]').click().url().should('eq', 'http://localhost:3000/login')
    })
})

describe('New user page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/newuser')
    })

    it('Should not allow a user to click the let\'s eat button without entering all of the fields', () => {
        cy.get('[data-cy=title]').contains('The Nomadic Nibbler')
        cy.get('[data-cy=newuser-prompt]').contains('Please enter your user information')
        cy.get('[data-cy=lets-eat-button]').click().url().should('eq', 'http://localhost:3000/newuser')
    })

    it('Should allow a new user to enter their information and click the let\'s eat button', () => {
        cy.get('[data-cy=newuser-prompt]').contains('Please enter your user information')
        cy.get('[data-cy=username-input]').type('teddybare').should('have.value', 'teddybare')
        cy.get('[data-cy=first-name-input]').type('tedd').should('have.value', 'tedd')
        cy.get('[data-cy=last-name-input]').type('barely').should('have.value', 'barely')
        cy.get('[data-cy=address-input]').type('123 fake street').should('have.value', '123 fake street')
        cy.get('[data-cy=city-input]').type('nowhere').should('have.value', 'nowhere')
        cy.get('[data-cy=zip-input]').type('12345').should('have.value', '12345')
        cy.get('[data-cy=lets-eat-button]').click().url().should('eq', 'http://localhost:3000/map')
    })

    it('Should only allow a 5 digit input for zip code', () => {
        cy.get('[data-cy=newuser-prompt]').contains('Please enter your user information')
        cy.get('[data-cy=username-input]').type('teddybare').should('have.value', 'teddybare')
        cy.get('[data-cy=first-name-input]').type('tedd').should('have.value', 'tedd')
        cy.get('[data-cy=last-name-input]').type('barely').should('have.value', 'barely')
        cy.get('[data-cy=address-input]').type('123 fake street').should('have.value', '123 fake street')
        cy.get('[data-cy=city-input]').type('nowhere').should('have.value', 'nowhere')
        cy.get('[data-cy=zip-input]').type('1234').should('have.value', '1234')
        cy.get('[data-cy=lets-eat-button]').click().url().should('eq', 'http://localhost:3000/newuser')
    })
})

describe('Map view', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/map')
    })

    it('Should allow the user to navigate to the truck list', () => {
        cy.get('[data-cy=truck-list-button').click().url().should('eq', 'http://localhost:3000/trucklist')
    })

    it('Should allow the user to navigate to the new location page', () => {
        cy.get('[data-cy=change-location-button]').click().url().should('eq', 'http://localhost:3000/newlocation')
    })
})