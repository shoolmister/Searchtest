// Function to search for a product by SKU
function searchProduct() {
  const skuInput = document.getElementById("skuInput").value.toUpperCase();

  // Fetch the data from the database.json file
  fetch('./database.json')
    .then(response => response.json())
    .then(jsonData => {
      // Extract the array from the parsed JSON
      const excelData = jsonData.Sheet1;

      // Check if SKU and skuInput are defined
      if (!skuInput || typeof skuInput !== 'string') {
        console.error("Invalid SKU input");
        return;
      }

      // Search for the SKU
      const matchingResults = excelData.filter(row => {
        const rowSKU = row.SKU && typeof row.SKU === 'string' ? row.SKU.replace(/\//g, '') : '';
        return rowSKU === skuInput.replace(/\//g, '');
      });

      // Display the results
      displayResults(matchingResults);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}

// Function to display search results
function displayResults(results) {
  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = ""; // Clear previous results

  if (results.length === 0) {
    resultContainer.innerHTML = "<p>No results found.</p>";
  } else {
    results.forEach(result => {
      const resultItem = document.createElement("div");
      resultItem.innerHTML = `<p>SKU: ${result.SKU}</p>
                              <p>Description: ${result.Description}</p>
                              <p>ETA: ${result.ETA}</p>
                              <p>Document#: ${result["Document#"]}</p>`;
      resultContainer.appendChild(resultItem);
    });
  }
}
