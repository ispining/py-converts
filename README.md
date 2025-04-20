# Python Code Converters (REST & cURL to Requests)

This is a static web tool designed to convert raw HTTP REST requests or cURL commands into Python code snippets using the popular `requests` library. The conversion is handled by the Google Gemini API directly in the browser.

## Features

- **Two Conversion Modes:**
    - REST Request → Python `requests`
    - cURL Command → Python `requests`
- **Simple Input:** Paste the entire raw request or command into a single text area. No need to manually separate URL, headers, method, or body.
- **Client-Side Conversion:** All processing, including the API call to Gemini, happens directly in the user's browser. No server-side backend is required.
- **Gemini Powered:** Utilizes the Google Gemini API (specifically `gemini-1.5-flash` by default) for intelligent conversion.
- **Syntax Highlighting:** Generated Python code is displayed with syntax highlighting using `highlight.js`.
- **Easy Output Handling:**
    - Copy the generated code to the clipboard with one click.
    - Download the code as a `.py` file.
- **Multilingual Interface:** Supports English (en), Russian (ru), and Hebrew (he) with automatic language detection based on browser settings and manual switching. Includes full RTL support for Hebrew.
- **Modern & Responsive Design:** Dark, futuristic theme built with Bootstrap 5 and custom CSS, designed to be responsive across devices.
- **Error Handling:** Provides user-friendly error messages for common issues (e.g., empty input, API errors, CORS problems).

## Technologies Used

- **HTML5**
- **CSS3** (Bootstrap 5 via CDN, Custom Styles)
- **JavaScript (ES6+)**
- **Google Gemini API**
- **highlight.js** (via CDN)

## Project Structure

```
python-converters/
├── index.html          # Main HTML file
├── assets/
│   ├── main.js         # Core JavaScript logic (API calls, translations, DOM manipulation)
│   └── style.css       # Custom CSS for styling and theme
└── README.md           # This file
```

## Setup & Usage

1.  **API Key Configuration:**
    *   The Gemini API key is currently hardcoded in `assets/main.js`.
    *   **Crucially**, you **must** configure restrictions for this API key in your Google Cloud Console. Set up **HTTP referer restrictions** to allow requests only from the domain(s) where you will host this tool. This prevents unauthorized use of your key.
2.  **Deployment:** Deploy the `python-converters` directory (containing `index.html` and the `assets` folder) to any static web hosting provider (e.g., GitHub Pages, Netlify, Vercel, AWS S3).
3.  **Access:** Open the deployed `index.html` in your browser.

## How it Works

1.  The user selects a tab (REST or cURL).
2.  The user pastes their full request or command into the text area.
3.  The user clicks "Generate Python Code".
4.  JavaScript constructs a specific prompt for the Gemini API based on the selected tab and the input text.
5.  A `fetch` request is made to the Gemini API endpoint with the prompt and the embedded API key.
6.  The API processes the request and returns the generated Python code.
7.  JavaScript cleans up the response (removes markdown formatting) and displays the code in the output area, applying syntax highlighting.
8.  Users can then copy or download the generated code.

## Notes

- **API Costs:** Be mindful of potential costs associated with using the Google Gemini API. Monitor your usage in the Google Cloud Console.
- **CORS:** If you encounter CORS (Cross-Origin Resource Sharing) errors, double-check your API key's HTTP referer restrictions in the Google Cloud Console. They must match the domain from which you are serving the `index.html` file.
- **Performance:** While built as a static tool, performance can be influenced by the Gemini API response time. The `gemini-1.5-flash` model is chosen for a balance of capability and speed.
