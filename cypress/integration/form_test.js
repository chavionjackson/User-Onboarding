describe('Onboard Testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    // it represents the test itself
   it('sanity check', () => {
    // expect is an assertion
    // we can have many assertions in a test
    expect(2 + 2).to.equal(4)
    expect(2 + 2).not.to.equal(5)
   }) 

    const textInput = () => cy.get('[name="name"]')
    const emailInput = () => cy.get('[name="email"]')
    const passwordInput = () => cy.get('[name="password"]')
    const termsBox = () => cy.get('input[name="terms"]')
    const submitBtn = () => cy.get('button')

    it('Allows submission after completion', () => {
        const quote = 'Satoru gojo'
        textInput().type(quote).should('have.value', 'Satoru gojo');
        
        const emailquote = 'chavionjackson@yahoo.com'
        emailInput().type(emailquote)
    
        const passwordquote = 'topsecret'
        passwordInput().type(passwordquote)
    
        termsBox().check()
    
        submitBtn().should('not.be.disabled')
        submitBtn().click()
  
})
it("will show errors for invalid inputs", () => {
    textInput().type("p");
    submitBtn().should("be.disabled");

    const emailquote = 'Sator'
    emailInput().type(emailquote)

})
})