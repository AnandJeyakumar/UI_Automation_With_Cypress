export function registerUser(formKey, user) {
    const registrationPayload = {
        form_key: formKey,
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        password: user.password,
        password_confirmation: user.password,
        success_url: '',
        error_url: ''
    };

    cy.request({
        method: 'POST',
        url: 'https://magento.softwaretestingboard.com/customer/account/createpost/',  // Correct URL for registration
        body: registrationPayload,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    }).then((response) => {
        // Check the response to make sure it's successful
        expect(response.status).to.eq(200);
        cy.log('User registration response:', response.body);
    });
}
