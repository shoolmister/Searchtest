document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("skuInput");
  const searchButton = document.getElementById("searchButton");
  const resultContainer = document.getElementById("resultContainer");

  searchButton.addEventListener("click", searchProduct);

  function searchProduct() {
    const searchTerm = searchInput.value.toUpperCase();

    fetch("database.json")
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
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
        <p>ETA: ${result.ETA || "N/A"}</p>
        <p>Order#: ${result.Order !== undefined ? result.Order : "N/A"}</p>
        <p>Amount: ${result.Amount !== undefined ? result.Amount : "N/A"}</p>
        <p>Document#: <a href="https://priis.cms1.co.il/priority/openmail.htm?priority:priform@DOCUMENTS_P:${result["Document#"]}:cms:tabula.ini:1">${result["Document#"]}</a></p>
      `;
      resultContainer.appendChild(resultItem);
    });
  }
}