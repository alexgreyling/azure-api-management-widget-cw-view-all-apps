import {getValues, Secrets} from "@azure/api-management-custom-widgets-tools"
import {valuesDefault} from "./values"

interface ApiResponse {
  name: string;
  description: string;
  apiKey: string;
  status: string;
}

class App {
  public readonly values
  public request: ((url: string) => Promise<Response>)
  public ApiURL = '';
  
  constructor(
    public readonly secrets: Secrets,
  ) {
    this.request = url =>
      fetch(
        `${secrets.managementApiUrl}${url}?api-version=${secrets.apiVersion}`,
        secrets.token ? {headers: {Authorization: secrets.token}} : undefined,
      )

    this.values = getValues(valuesDefault)

    Object.entries(this.values).forEach(([key, value]) => {
      const element = document.getElementById(`values.${key}`)
      if (element) element.innerText = value
    })
    document.getElementById("message")?.setAttribute("placeholder", this.values.placeholder)
    document.getElementById("form")?.setAttribute("action", this.values.actionUrl)
    this.ApiURL = this.values.actionUrl;
  }
}

fetch('https://localhost:44336/api/app', {
  method: 'GET', 
  headers: {
    'Content-Type': 'application/json',
  },
})
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
})
.then(data => {
  const row = document.querySelector('.container .row'); // Targeting the row for cards

  if (row) {
    row.innerHTML = ''; // Clear existing content
  }

  data.forEach((appData: { name: any; description: any; apiKey: any; status: any; }) => {
    const cardHtml = `
      <div class="col-md-4"> <!-- Column containing the card -->
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${appData.name}</h5>
            <p class="card-text">${appData.description}</p>
            <p class="card-text">API Key: ${appData.apiKey}</p>
            <p class="card-text">Status: ${appData.status}</p>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Add Extension
          </button>
          </div>
        </div>
      </div>
    `;
    if (row) {
    row.innerHTML += cardHtml;
    }
  });
})
.catch(error => console.error('Error:', error));

declare global {
  interface JQuery {
    modal(action: string): void;
  }
}

document.addEventListener('click', function (e) {
  if (e.target && (e.target as Element).classList.contains('open-modal-btn')) {
    $('#exampleModalCenter').modal('show');
  }
});



export default App
