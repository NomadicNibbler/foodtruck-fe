describe('The Nomadic Nibbler landing page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/', {
            onBeforeLoad (win) {
              delete win.navigator.__proto__.serviceWorker
            }
          })
    })
    
    it('Should have a title', () => {
        cy.get('[data-cy=title]').contains('The Nomadic Nibbler')
    })

    it('Should be able to login with your username', () => {
        cy.get('[data-cy=login-prompt]').contains('Please enter your username')
        cy.get('[data-cy=username-input]').type('jackpot').should('have.value', 'jackpot').get('[data-cy=login-button]').click()
        cy.url().should('eq', 'http://localhost:3000/map')
    })

    it('Should redirect user to login page if username is incorrect', () => {
        cy.get('[data-cy=login-prompt]').contains('Please enter your username')
        cy.get('[data-cy=username-input]').type('jackpot').should('have.value', 'jackpot').get('[data-cy=login-button]').click()
        cy.get('[data-cy=logout-button]').click()
        cy.get('[data-cy=login-prompt]').contains('Please enter your username')
        cy.get('[data-cy=username-input]').type('zaptoot').should('have.value', 'zaptoot').get('[data-cy=login-button]').click()
        cy.url().should('eq', 'http://localhost:3000/login')
        cy.get('[data-cy=username-error]').contains('Please Try A Different Username.')
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
        cy.visit('http://localhost:3000/newuser', {
            onBeforeLoad (win) {
                delete win.navigator.__proto__.serviceWorker
            }
            });
    })

    it('Should allow a user to go back to the login page', () => {
        cy.get('[data-cy=back-to-login]').click().url().should('eq', 'http://localhost:3000/login')
    })

    it('Should not allow a user to click the let\'s eat button without entering all of the fields', () => {
        cy.get('[data-cy=title]').contains('The Nomadic Nibbler')
        cy.get('[data-cy=newuser-prompt]').contains('Please enter your user information')
        cy.get('[data-cy=create-account]').click().url().should('eq', 'http://localhost:3000/newuser')
        cy.get('[data-cy=input-error]').contains('Please Complete The Form Below.')
    })

    it('Should allow a new user to enter their information and click the let\'s eat button', () => {
        cy.get('[data-cy=newuser-prompt]').contains('Please enter your user information')
        cy.get('[data-cy=username-input]').type('teddybare').should('have.value', 'teddybare')
        cy.get('[data-cy=first-name-input]').type('tedd').should('have.value', 'tedd')
        cy.get('[data-cy=last-name-input]').type('barely').should('have.value', 'barely')
        cy.get('[data-cy=address-input]').type('123 fake street').should('have.value', '123 fake street')
        cy.get('[data-cy=city-input]').type('nowhere').should('have.value', 'nowhere')
        cy.get('[data-cy=zip-input]').type('12345').should('have.value', '12345')
        cy.get('[data-cy=create-account]').click().url().should('eq', 'http://localhost:3000/login')
    })

    it('Should only allow a us or canadian format for zip code', () => {
        cy.get('[data-cy=newuser-prompt]').contains('Please enter your user information')
        cy.get('[data-cy=username-input]').type('teddybare').should('have.value', 'teddybare')
        cy.get('[data-cy=first-name-input]').type('tedd').should('have.value', 'tedd')
        cy.get('[data-cy=last-name-input]').type('barely').should('have.value', 'barely')
        cy.get('[data-cy=address-input]').type('123 fake street').should('have.value', '123 fake street')
        cy.get('[data-cy=city-input]').type('nowhere').should('have.value', 'nowhere')
        cy.get('[data-cy=zip-input]').type('1234').should('have.value', '1234')
        cy.get('[data-cy=create-account]').click().url().should('eq', 'http://localhost:3000/newuser')
        cy.get('[data-cy=input-error]').contains('Please Complete The Form Below.')
    })

    it('Should redirect to new user page if username already exists', () => {
        cy.get('[data-cy=newuser-prompt]').contains('Please enter your user information')
        cy.get('[data-cy=username-input]').type('jackpot').should('have.value', 'jackpot')
        cy.get('[data-cy=first-name-input]').type('jack').should('have.value', 'jack')
        cy.get('[data-cy=last-name-input]').type('pot').should('have.value', 'pot')
        cy.get('[data-cy=address-input]').type('345 Robson St').should('have.value', '345 Robson St')
        cy.get('[data-cy=city-input]').type('Vancouver').should('have.value', 'Vancouver')
        cy.get('[data-cy=zip-input]').type('v6b6b3').should('have.value', 'v6b6b3')
        cy.get('[data-cy=create-account]').click().url().should('eq', 'http://localhost:3000/newuser')
        cy.get('[data-cy=username-error]').contains('Please Try A Different Username')
    })
    
})

describe('Map view', () => {
    beforeEach(() => {
        cy.intercept("https://warm-scrubland-95764.herokuapp.com/api/v1/sessions", {fixture: 'user.json'})
        cy.intercept("https://warm-scrubland-95764.herokuapp.com/api/v1/trucks?id=1", {fixture: 'trucks.json'}).as("truck-markers")
        cy.visit('http://localhost:3000/login', {
            onBeforeLoad (win) {
                delete win.navigator.__proto__.serviceWorker
            }
            });
        cy.get('[data-cy=username-input]').type('test').get('[data-cy=login-button]').click();
        
    });

    it('Should allow the user to navigate to the truck list and new location', () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
          })
        cy.wait('@truck-markers');
        cy.get('[data-cy=truck-list-button').click().url().should('eq', 'http://localhost:3000/trucklist')
    });

    it('Should allow a user to logout by clicking the logout button', () => {
        cy.get('[data-cy=logout-button]').click().url().should('eq', 'http://localhost:3000/login')
    })

    it('Should allow the user to navigate to the change location form', () => {
        cy.wait('@truck-markers');
        cy.get('[data-cy=change-location-button]').click().url().should('eq', 'http://localhost:3000/newlocation')
    });

    it('should allow the user to change the radius', () => {
        cy.get('[data-cy=set-radius]').select('10').should('have.value', '10');
    });

    it('should allow the user to set the radius back to default', () => {
        cy.get('[data-cy=set-radius]').select('10').should('have.value', '10');
        cy.get('[data-cy=set-radius]').select('All Trucks').should('have.value', '40');
    });
});

describe('New location view', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/newlocation', {
            onBeforeLoad (win) {
                delete win.navigator.__proto__.serviceWorker
            }
            });
    })

    it('Should allow the user to go back to the map when they click the back to map button', () => {
        cy.get('[data-cy=back-to-map]').click().url().should('eq', 'http://localhost:3000/map')
    })

    it('Should allow the user to enter a new location and navigate back to the map page', () => {
        cy.get('[data-cy=location-prompt]').contains('Please enter your desired location')
        cy.get('[data-cy=address-input').type('555 Jimmy Street').should('have.value', '555 Jimmy Street')
        cy.get('[data-cy=city-input]').type('Barcelona').should('have.value', 'Barcelona')
        cy.get('[data-cy=zip-input]').type('54321').should('have.value', '54321')
        cy.get('[data-cy=lets-eat-button').click().url().should('eq', 'http://localhost:3000/map')
    })

    it('Should not allow a user to submit their information without entering all fields, and meeting the zip requirement', () => {
        cy.get('[data-cy=location-prompt]').contains('Please enter your desired location')
        cy.get('[data-cy=address-input').type('555 Jimmy Street').should('have.value', '555 Jimmy Street')
        cy.get('[data-cy=city-input]').type('Barcelona').should('have.value', 'Barcelona')
        cy.get('[data-cy=zip-input]').type('5432').should('have.value', '5432')
        cy.get('[data-cy=lets-eat-button').click().url().should('eq', 'http://localhost:3000/newlocation')
        cy.get('[data-cy=input-error]').contains('Please Complete The Form Below.')
    })
})

describe('truck details', () => {
    beforeEach(() => {
        cy.intercept("https://warm-scrubland-95764.herokuapp.com/api/v1/sessions", {fixture: 'user.json'})
        cy.intercept("https://warm-scrubland-95764.herokuapp.com/api/v1/trucks?id=1", {fixture: 'trucks.json'}).as("truck-markers");
        cy.visit('http://localhost:3000/login', {
            onBeforeLoad (win) {
                delete win.navigator.__proto__.serviceWorker
            }
            });
        cy.get('[data-cy=username-input]').type('test').get('[data-cy=login-button]').click();
    });

    it("should display a picture, title, links, and description of the truck", () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
          })
        cy.wait('@truck-markers')
        cy.get('[data-cy=truck-list-button]');
        cy.get('[data-cy=truck-list-button]').click();
        cy.get('[data-cy=truck-card]').first().click();
        cy.get('[data-cy=truck-info]').should('contain', 'arturos')
        .and('contain', 'arturos2go.com');
        cy.get('[data-cy=truck-details-logo]').should('exist');
        cy.get('[data-cy=social-link]').first().invoke('attr', 'href').then(href => {
            cy.request(href).its('status').should('eq', 200)
        })
        cy.get('[data-cy=social-link]').eq(1).invoke('attr', 'href').then(href => {
            cy.request(href).its('status').should('eq', 200)
        })
        cy.get('[data-cy=social-link]').eq(2).invoke('attr', 'href').then(href => {
            cy.request(href).its('status').should('eq', 200)
        })
        cy.get('[data-cy=truck-description]').contains("Arturo's unique recipes are a fusion of Spanish and traditional Mexican. Clean, simple and healthy Mexican food. Only 3 people prepare the food we serve to our clients, from the local produce and local butcher, there is not third parties when it comes to prepare our dishes. We closely follow Health Authority guidances and protocols to operate our business. We have been serving take out food at open spaces since 2010, and we will continue doing it, safety is our priority.");
        const payments = ['cash', 'credit card', 'debit card', 'apple pay']
        cy.get('[data-cy=payment-methods]').children().each(($payment, i) => {
           cy.wrap($payment).should('contain', payments[i])
        })
    });

    it('should display a default logo if there is no logo provided', () => {
        cy.wait('@truck-markers')
        cy.get('[data-cy=truck-list-button]').click();
        cy.get('[data-cy=truck-card]').eq(1).click();
        cy.get('[data-cy=truck-details-logo]').should('have.attr', 'src').should('include', 'food-truck' );
    });

    it('should take a user back to their previouly viewed page', () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
          });
        cy.get('[data-cy=truck-list-button]');
        cy.get('[data-cy=truck-list-button]').click();
        cy.get('[data-cy=truck-card]').first().click();
        cy.get('[data-cy=truck-details-back-btn]').click();
        cy.url().should('eq', 'http://localhost:3000/trucklist');
    })
});