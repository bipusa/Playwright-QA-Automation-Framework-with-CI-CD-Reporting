class APIUtils {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
async gettoken() {
    const loginResponse = await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login", 
            {
            data: this.loginPayload
             }); // receive status 200, 201
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);
    return token;
    }

}

module.exports = {APIUtils};

