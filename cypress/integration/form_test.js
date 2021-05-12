describe('Onboard Testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    // it represents the test itself
   it('assertion', () => {
    // expect is an assertion
    // we can have many assertions in a test
    expect(2 + 2).to.equal(4)
    expect(2 + 2).not.to.equal(5)
   }) 
    //GRABBED ALL INPUTS
    const textInput = () => cy.get('[name="name"]')
    const emailInput = () => cy.get('[name="email"]')
    const passwordInput = () => cy.get('[name="password"]')
    const termsBox = () => cy.get('input[name="terms"]')
    const submitBtn = () => cy.get('button')

    it('Allows submission after completion', () => {
        //Get the Name input and type a name in it.
        //Use an assertion to check if the text inputted contains the name you provided
        const quote = 'CJ'
        textInput().type(quote).should('have.value', 'CJ');
        // Get the Email input and type an email address in it
        const emailquote = 'chavionjackson@yahoo.com'
        emailInput().type(emailquote)
        // Get the password input and type a password in it
        const passwordquote = 'topsecret'
        passwordInput().type(passwordquote)
        // Set up a test that will check to see if a user can check the terms of service box
        termsBox().check()
        // Check to see if a user can submit the form data
        submitBtn().should('not.be.disabled')
        submitBtn().click()
  
})
it("will show errors for invalid inputs", () => {
    // Check for form validation if an input is left empty
    textInput().type("Incorrect");
    submitBtn().should("be.disabled");

    const emailquote = 'Must be an email'
    emailInput().type(emailquote)

})
})