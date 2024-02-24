// Function to search for a product by SKU
function searchProduct() {
  const skuInput = document.getElementById("skuInput").value.toUpperCase();

  // Fetch data from database.json
  fetch("database.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      const excelData = data.Sheet1;

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

      // Sort results by the closest ETA
      matchingResults.sort((a, b) => {
        const aETA = new Date(a.ETA);
        const bETA = new Date(b.ETA);
        const currentDate = new Date();

        const diffA = Math.abs(aETA - currentDate);
        const diffB = Math.abs(bETA - currentDate);

        return diffA - diffB;
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
      const documentLink = `https://priis.cms1.co.il/priority/openmail.htm?priority:priform@DOCUMENTS_P:${result["Document#"]}:cms:tabula.ini:1`;
      resultItem.innerHTML = `<p>SKU: ${result.SKU}</p>
                              <p>Description: ${result.Description}</p>
                              <p>ETA: ${result.ETA}</p>
                              <p>Document#: <a href="${documentLink}" target="_blank">${result["Document#"]}</a></p>`;
      resultContainer.appendChild(resultItem);
    });
  }
}
