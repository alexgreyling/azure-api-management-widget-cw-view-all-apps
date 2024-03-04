const {deployNodeJS} = require("@azure/api-management-custom-widgets-tools")

const serviceInformation = {
	"resourceId": "subscriptions/4d24c5c4-e644-4927-9bd5-f27a65bb4f93/resourceGroups/rg-pinnies-dev/providers/Microsoft.ApiManagement/service/apim-pinnies-dev",
	"managementApiEndpoint": "https://management.azure.com"
}
const name = "cw-view-all-apps"
const fallbackConfigPath = "./static/config.msapim.json"
const config = {
	"interactiveBrowserCredentialOptions": {
		"redirectUri": "http://localhost:1337"
	}
}

deployNodeJS(serviceInformation, name, fallbackConfigPath, config)
