"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
// Fetch quotes from example.com
function fetchQuotes() {
    return __awaiter(this, void 0, void 0, function* () {
        const quotes = [];
        try {
            for (let i = 0; i < 5; i++) {
                const response = yield axios_1.default.get("https://favqs.com/api/qotd");
                const q = response.data.quote.body;
                const author = response.data.quote.author;
                quotes.push({ author, quote: q });
            }
            const jsonData = JSON.stringify(Object.assign({}, quotes), null, 2);
            // Write the JSON data to a file
            fs_1.default.writeFile("quotes.json", jsonData, (err) => {
                if (err) {
                    console.error("Error writing to file:", err);
                }
                else {
                    console.log("Quotes have been written to quotes.json");
                }
            });
        }
        catch (error) {
            console.error("Error fetching quotes:", error);
        }
    });
}
fetchQuotes();
