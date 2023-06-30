import axios, { AxiosResponse } from "axios";
import fs from "fs";

// Fetch quotes from "https://favqs.com/api/qotd"
async function fetchQuotes() {
  const quotes = [];
  
  try {
    for (let i = 0; i < 5; i++) {
      const response: AxiosResponse<any, any> = await axios.get(
        "https://favqs.com/api/qotd"
      );
      const q: string = response.data.quote.body;
      const author: string = response.data.quote.author;
      quotes.push({ author, quote: q });
    }

    const data = JSON.stringify({ ...quotes }, null, 2);

    // Write the JSON data to a file
    fs.writeFile("quotes.json", data, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("Quotes have been written to quotes.json");
      }
    });
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
}

fetchQuotes();
