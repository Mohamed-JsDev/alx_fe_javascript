let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").innerText = "No quotes available.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById(
    "quoteDisplay"
  ).innerText = `${quotes[randomIndex].text} - ${quotes[randomIndex].category}`;
}

// Function to add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value;
  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    showRandomQuote();
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("exportQuotes").addEventListener("click", exportQuotes);

// Function to export quotes as JSON
function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
    showRandomQuote();
  };
  fileReader.readAsText(event.target.files[0]);
}

// Load a random quote on initial load
showRandomQuote();
const serverUrl = "https://jsonplaceholder.typicode.com/posts";

// Function to fetch quotes from the simulated server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(serverUrl);
    const fetchedQuotes = await response.json();
    // Update local quotes with fetched data
    updateLocalQuotes(fetchedQuotes);
  } catch (error) {
    console.error("Error fetching quotes from server:", error);
  }
}

// Function to update local quotes with server quotes
function updateLocalQuotes(fetchedQuotes) {
  fetchedQuotes.forEach((fetchedQuote) => {
    const existingQuoteIndex = quotes.findIndex(
      (q) => q.id === fetchedQuote.id
    );
    if (existingQuoteIndex === -1) {
      quotes.push(fetchedQuote);
    } else {
      // Resolve conflict: server data takes precedence
      quotes[existingQuoteIndex] = fetchedQuote;
    }
  });
  saveQuotes();
}

// Periodically fetch quotes from the server
setInterval(fetchQuotesFromServer, 30000); // Fetch every 30 seconds
