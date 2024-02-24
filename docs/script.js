document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const resultContainer = document.getElementById("resultContainer");

    searchButton.addEventListener("click", searchProduct);

    function searchProduct() {
        const searchTerm = searchInput.value.toUpperCase();

        fetch("https://raw.githubusercontent.com/shoolmister/Searchtest/main/database.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Data fetched successfully:", data);
                const products = data.Sheet1;
                const results = products.filter(product => product.SKU.toUpperCase() === searchTerm);

                displayResults(results);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }

    function displayResults(results) {
        resultContainer.innerHTML = "";

        if (results.length === 0) {
            resultContainer.innerHTML = "Product not found";
            return;
        }

        const resultHTML = results.map(result => {
            return `
                <div>
                    <p>SKU: ${result.SKU}</p>
                    <p>Description: ${result.Description}</p>
                    <p>ETA: ${result.ETA}</p>
                    <p>ATA: ${result.ATA || "N/A"}</p>
                    <p>Document#: ${result["Document#"]}</p>
                </div>
            `;
        }).join("");

        resultContainer.innerHTML = resultHTML;
    }
});
