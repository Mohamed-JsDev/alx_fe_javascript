document.addEventListener("DOMContentLoaded", function () {
  const newQuoteText = document.getElementById("newQuoteText");
  const newQuoteCategory = document.getElementById("newQuoteCategory"); // Updated ID
  const btnAddQuote = document.getElementById("btnAddQuote");
  const showNewQuote = document.getElementById("newQuote");
  const quoteDisplay = document.getElementById("quoteDisplay");
  const categoryFilter = document.getElementById("categoryFilter");
  const exportButton = document.getElementById("exportQuotes");

  const categories = [
    "age",
    "alone",
    "amazing",
    "anger",
    "architecture",
    "art",
    "attitude",
    "beauty",
    "best",
    "birthday",
    "business",
    "car",
    "change",
    "communication",
    "computers",
    "cool",
  ];
  // عاوزين زرار يطلب منه هوا عاوز الداتا منين لوكل ولا api دا في الزرار اللي بيطلب اقتباس  تلقائيا هيكون فاضل هنبعت الاقتباس فين
  //عاوزين زرار نحدد منه مين اللي يشتغل
  //
  // fetch data if user want

  // const fetchQuotesFromServer = async (category) => {
  //   const response = await fetch(
  //     `   https://api.api-ninjas.com/v1/quotes?category=${category}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "X-Api-Key": "XpH4g8XwTYkt6WKrSa/XUQ==a8dULt795FW2FO9P",
  //       },
  //     }
  //   );
  //   return await response.json();
  // };

  // function populateCategories() {
  //   categories.map((opt) => {
  //     const option = document.createElement("option");
  //     option.textContent = opt;
  //     categoryFilter.appendChild(option);
  //   });
  // }
  // populateCategories();
  // localStorage.setItem("value", categoryFilter.value);

  // categoryFilter.onchange = function filterQuotes() {
  //   localStorage.setItem("value", categoryFilter.value);
  //   if (localStorage.getItem("value") === "all") {
  //     fetchQuotesFromServer("life");
  //   } else {
  //     fetchQuotesFromServer(localStorage.getItem("value"));
  //   }
  // };
  // if (localStorage.getItem("value") === "all") {
  //   fetchQuotesFromServer("life");
  // } else {
  //   fetchQuotesFromServer(localStorage.getItem("value"));
  // }
  // check first value
  localStorage.setItem("value", categoryFilter.value);
  categoryFilter.onchange = function filterQuotes() {
    localStorage.setItem("value", categoryFilter.value);
  };
  // turn Buttons & function
  btnAddQuote.addEventListener("click", createAddQuoteForm);
  showNewQuote.addEventListener("click", displayRandomQuote);
  exportButton.addEventListener("click", exportQuotesToJson);
  // add category option in html documents
  function populateCategories() {
    localStorage.setItem("value", categoryFilter.value);
    categories.map((opt) => {
      const option = document.createElement("option");
      option.textContent = opt;
      categoryFilter.appendChild(option);
    });
  }
  populateCategories();

  btnAddQuote.addEventListener("click", createAddQuoteForm);

  showNewQuote.addEventListener("click", displayRandomQuote);

  // fetch data if user want

  const fetchQuotesFromServer = async (category) => {
    const response = await fetch(
      `   https://api.api-ninjas.com/v1/quotes?category=${category}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": "XpH4g8XwTYkt6WKrSa/XUQ==a8dULt795FW2FO9P",
        },
      }
    );
    const quote = await response.json();
    return quote[0].quote;
  };
  // create Quote from form
  function createAddQuoteForm() {
    const text = newQuoteText.value;
    const category = newQuoteCategory.value.trim();
    let message = [];

    const AddNewQuote = document.createElement("div");
    const textQuote = document.createElement("p");
    textQuote.innerHTML = `${message} is added done`;
    AddNewQuote.appendChild(textQuote);
    document.body.appendChild(AddNewQuote);
  }
  // change category to random quote
  categoryFilter.onchange = function filterQuotes() {
    localStorage.removeItem("value");
    localStorage.setItem("value", categoryFilter.value);
  };

  // show random Quote
  async function displayRandomQuote() {
    //check localStorage & edit category
    if (
      localStorage.getItem("value") &&
      localStorage.getItem("value") === "all"
    ) {
      const value = await fetchQuotesFromServer("life");
      quoteDisplay.innerHTML = value;
    } else {
      const value = await fetchQuotesFromServer(localStorage.getItem("value"));
      quoteDisplay.innerHTML = value;
    }
  }

  //
  //
  //
  //
  //////////////////////////////////////////////////////////
  ///
  ///
  //
  //
  // add json file
  let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

  // Function to save quotes to local storage
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  // Function to export quotes to JSON
  function exportQuotesToJson() {
    const jsonQuotes = JSON.stringify(quotes, null, 2); // Pretty print with 2 spaces
    const blob = new Blob([jsonQuotes], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Free up memory
  }

  // Function to import quotes from JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      try {
        const importedQuotes = JSON.parse(event.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes.push(...importedQuotes);
          saveQuotes();
          alert("Quotes imported successfully!");
        } else {
          alert("Invalid JSON format. Please upload a valid quotes JSON file.");
        }
      } catch (error) {
        alert("Error reading JSON file: " + error.message);
      }
    };

    fileReader.readAsText(event.target.files[0]);
  }

  // Add event listener to the export button
});

// if (value === "") {
//   const work = localStorage.getItem("work");
//   quoteDisplay.innerHTML = data.work[num2];
//   console.log(work[num2]);
// } else if (num === 1) {
//   const live = localStorage.getItem("live");
//   quoteDisplay.innerHTML = data.live[num2];
//   console.log(live[num2]);
// } else if (num === 2) {
//   const sleep = localStorage.getItem("sleep");
//   quoteDisplay.innerHTML = data.sleep[num2];
//   console.log(sleep[num2]);
// } else if (num === 3) {
//   const wife = localStorage.getItem(wife);
//   quoteDisplay.innerHTML = data.wife[num2];
//   console.log(wife[num2]);
// } else {
//   quoteDisplay.innerHTML = "try again";
// }
