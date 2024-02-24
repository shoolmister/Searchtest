document.addEventListener('DOMContentLoaded', function () {
  // Load the database.json file
  fetch('database.json')
    .then(response => response.json())
    .then(data => {
      const searchInput = document.getElementById('searchInput');
      const searchButton = document.getElementById('searchButton');
      const resultsContainer = document.getElementById('resultsContainer');

      searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.trim().toUpperCase();

        // Filter data based on SKU
        const results = data.Sheet1.filter(item => item.SKU === searchTerm);

        // Display results
        displayResults(results);
      });

      function displayResults(results) {
        resultsContainer.innerHTML = '';

        if (results.length === 0) {
          resultsContainer.innerHTML = '<p>No results found.</p>';
        } else {
          const resultList = document.createElement('ul');

          results.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `SKU: ${item.SKU}, Description: ${item.Description}, ETA: ${item.ETA}, ATA: ${item.ATA}, Document#: ${item['Document#']}`;
            resultList.appendChild(listItem);
          });

          resultsContainer.appendChild(resultList);
        }
      }
    })
    .catch(error => console.error('Error loading database.json:', error));
});
