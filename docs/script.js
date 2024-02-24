// script.js

document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", searchProduct);
});

function searchProduct() {
  const skuInput = document.getElementById("skuInput").value.toUpperCase();
  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = ""; // Clear previous results

  const data = getDatabase(); // Assuming you have a function named getDatabase to retrieve the database
  const sheetData = data?.Sheet1 || [];

  const foundProducts = sheetData.filter(product => product.SKU === skuInput);

  if (foundProducts.length > 0) {
    const productDetails = foundProducts.map(product => {
      return `
        <div>
          <p>SKU: ${product.SKU}</p>
          <p>Description: ${product.Description}</p>
          <p>ETA: ${product.ETA}</p>
          <p>ATA: ${product.ATA || "Not Available"}</p>
          <p>Document#: ${product["Document#"]}</p>
        </div>
      `;
    }).join("");

    resultContainer.innerHTML = productDetails;

    // Display shipment progress
    const eta = foundProducts[0].ETA; // Assuming the first product in the list
    displayShipmentProgress(eta);
  } else {
    resultContainer.innerHTML = "<p>No matching product found</p>";
  }
}

function getDatabase() {
  // Replace this with your actual logic to fetch the database
  // For now, let's assume you have a variable named 'database' that holds your JSON data
  const database = /* your JSON data */;
  return database;
}

function displayShipmentProgress(eta) {
  // Assuming you have a function to calculate the progress based on ETA
  // Update this function as per your requirement
  // For now, let's assume you have a function named 'calculateShipmentProgress'
  const progress = calculateShipmentProgress(eta);

  // Display progress in your HTML, you can use this as a placeholder
  const progressContainer = document.getElementById("progressContainer");
  progressContainer.innerHTML = `<p>Shipment Progress: ${progress}%</p>`;
}

function calculateShipmentProgress(eta) {
  // Implement your logic to calculate the shipment progress based on ETA
  // For example, you can calculate the difference between ETA and current date
  // and show the progress based on that difference
  const etaDate = new Date(eta);
  const currentDate = new Date();

  const timeDiff = etaDate.getTime() - currentDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // For simplicity, let's assume the progress is linear, and you have 30 days for shipment
  const totalDaysForShipment = 30;
  const progress = Math.max(0, 100 - (daysDiff / totalDaysForShipment) * 100);

  return progress.toFixed(2);
}
