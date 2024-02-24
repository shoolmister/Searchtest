document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("skuInput");
  const searchButton = document.getElementById("searchButton");

  searchButton.addEventListener("click", searchProduct);

  function searchProduct() {
    const searchTerm = searchInput.value.toUpperCase();

    fetch("database.json")
      .then(response => response.json())
      .then(data => {
        const products = data.Sheet1;
        const results = products.filter(product => product.SKU.toUpperCase() === searchTerm);
        
        displayResults(results);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }

  function displayResults(results) {
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = ""; // Clear previous results

    if (results.length === 0) {
      resultContainer.innerHTML = "<p>No results found.</p>";
    } else {
      results.forEach(result => {
        const resultItem = document.createElement("div");
        resultItem.innerHTML = `
          <p>SKU: ${result.SKU}</p>
          <p>Description: ${result.Description}</p>
          <p>ETA: ${result.ETA}</p>
          <p>Order#: ${result.Order || "N/A"}</p>
          <p>Amount: ${result.Amount || "N/A"}</p>
          <p>Document#: ${result["Document#"]}</p>
          <a href="https://priis.cms1.co.il/priority/openmail.htm?priority:priform@DOCUMENTS_P:${result["Document#"]}:cms:tabula.ini:1">Open Document</a>
        `;
        resultContainer.appendChild(resultItem);
      });
    }
  }
});
