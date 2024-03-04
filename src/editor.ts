import {buildOnChange, getEditorValues} from "@azure/api-management-custom-widgets-tools"
import {Values, valuesDefault} from "./values"

export const onChange = buildOnChange<Values>()

function initialize() {
  const values = getEditorValues<Values>()

  Object.entries(valuesDefault).forEach(([key, valueDefault]) => {
    const element = document.getElementById(key) as HTMLElement | HTMLInputElement | null
    if (element && "value" in element) {
      element.placeholder = valueDefault
      const value = values[key as keyof Values]
      if (value) element.value = value
    }
  })
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
            <a href="#" class="btn btn-primary">Add Extension</a>
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

export default initialize
