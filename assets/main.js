document.addEventListener('DOMContentLoaded', () => {
    // --- Constants ---
    const API_KEY = "AIzaSyAc_Rq0fTKmaUP1tYPXS0gjSSFpoFQQHBE"; // Встроенный ключ API
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY; // Используем модель flash для скорости

    // --- Translations ---
    const translations = {
        en: {
            title: "Python Code Converters",
            tab_rest: "REST → Python",
            tab_curl: "cURL → Python",
            input_label: "Input Data",
            input_placeholder_rest: "Paste your full REST request here...",
            input_placeholder_curl: "Paste your full cURL command here...",
            generate_button: "Generate Python Code",
            output_label: "Generated Python Code:",
            // output_placeholder: "# Python code will appear here...", // Removed - use static placeholder
            copy_button: "Copy code",
            download_button: "Download .py file",
            about_title: "About the project",
            about_text: "This project was created on a volunteer basis with the goal of simplifying the lives of Python developers who are involved in parsing or simplifying API requests. It's a powerful tool designed to streamline your workflow and boost your productivity.",
            error_invalid_input: "Input cannot be empty.",
            error_api: "Error communicating with the API. Please check the console for details.",
            error_cors: "CORS error detected. Make sure the API key is configured correctly with HTTP referer restrictions in Google Cloud.",
            error_unknown: "An unknown error occurred.",
            copied_success: "Code copied to clipboard!",
            generating: "Generating...",
            error_ai_invalid_curl_format: "AI detected invalid cURL format. Input must start with 'curl '.",
            error_ai_invalid_rest_format: "AI detected invalid REST format. Input should not be a cURL command.",
            more_projects_button: "More projects from BizTechLab"
        },
        ru: {
            title: "Конвертеры Python Кода",
            tab_rest: "REST → Python",
            tab_curl: "cURL → Python",
            input_label: "Входные данные",
            input_placeholder_rest: "Вставьте ваш полный REST-запрос сюда...",
            input_placeholder_curl: "Вставьте вашу полную cURL-команду сюда...",
            generate_button: "Сгенерировать Python код",
            output_label: "Сгенерированный Python код:",
            // output_placeholder: "# Python код появится здесь...", // Removed - use static placeholder
            copy_button: "Копировать код",
            download_button: "Скачать .py файл",
            about_title: "О проекте",
            about_text: "Этот проект создан на волонтерской основе с целью упростить жизнь Питонщикам, которые занимаются парсингом или упрощения API запросов. Это мощный инструмент, разработанный для оптимизации вашего рабочего процесса и повышения производительности.",
            error_invalid_input: "Поле ввода не может быть пустым.",
            error_api: "Ошибка связи с API. Пожалуйста, проверьте консоль для деталей.",
            error_cors: "Обнаружена ошибка CORS. Убедитесь, что ключ API правильно настроен с ограничениями по HTTP-рефереру в Google Cloud.",
            error_unknown: "Произошла неизвестная ошибка.",
            copied_success: "Код скопирован в буфер обмена!",
            generating: "Генерация...",
            error_ai_invalid_curl_format: "AI обнаружил неверный формат cURL. Ввод должен начинаться с 'curl '.",
            error_ai_invalid_rest_format: "AI обнаружил неверный формат REST. Ввод не должен быть командой cURL.",
            more_projects_button: "Еще проекты от BizTechLab"
        },
        he: {
            title: "ממירי קוד פייתון",
            tab_rest: "REST → Python",
            tab_curl: "cURL → Python",
            input_label: "נתוני קלט",
            input_placeholder_rest: "הדבק את בקשת ה-REST המלאה שלך כאן...",
            input_placeholder_curl: "הדבק את פקודת ה-cURL המלאה שלך כאן...",
            generate_button: "צור קוד פייתון",
            output_label: "קוד פייתון שנוצר:",
            // output_placeholder: "# קוד פייתון יופיע כאן...", // Removed - use static placeholder
            copy_button: "העתק קוד",
            download_button: "הורד קובץ .py",
            about_title: "על הפרויקט",
            about_text: "פרויקט זה נוצר על בסיס התנדבותי במטרה לפשט את חייהם של מפתחי פייתון העוסקים בפארסינג או בפישוט בקשות API. זהו כלי עוצמתי שנועד לייעל את זרימת העבודה שלך ולהגביר את הפרודוקטיביות שלך.",
            error_invalid_input: "הקלט אינו יכול להיות ריק.",
            error_api: "שגיאה בתקשורת עם ה-API. אנא בדוק את הקונסולה לפרטים.",
            error_cors: "זוהתה שגיאת CORS. ודא שמפתח ה-API מוגדר כהלכה עם הגבלות HTTP referer ב-Google Cloud.",
            error_unknown: "אירעה שגיאה לא ידועה.",
            copied_success: "הקוד הועתק ללוח!",
            generating: "יוצר...",
            error_ai_invalid_curl_format: "ה-AI זיהה פורמט cURL לא תקין. הקלט חייב להתחיל ב-'curl '.",
            error_ai_invalid_rest_format: "ה-AI זיהה פורמAT REST לא תקין. הקלט לא אמור להיות פקודת cURL.",
            more_projects_button: "פרויקטים נוספים מ-BizTechLab"
        }
    };

    // --- DOM Elements ---
    const langButtons = document.querySelectorAll('.lang-switcher button');
    const inputDataEl = document.getElementById('inputData');
    const outputCodeEl = document.getElementById('outputCode');
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const errorAlertEl = document.getElementById('errorAlert');
    const restTabBtn = document.getElementById('rest-tab');
    const curlTabBtn = document.getElementById('curl-tab');
    const htmlEl = document.documentElement; // To set lang and dir
    const outputActionsEl = document.getElementById('outputActions'); // Div containing copy/download buttons
    const outputPreEl = outputCodeEl.parentElement; // The <pre> element

    // --- State ---
    let currentLang = 'en'; // Default language
    let currentTab = 'rest'; // Default tab

    // --- Functions ---

    // Function to apply translations
    function applyTranslations(lang) {
        const trans = translations[lang];
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (trans[key]) {
                if (el.tagName === 'TEXTAREA' && key.startsWith('input_placeholder_')) {
                    el.placeholder = trans[key];
                } else if (el.tagName === 'BUTTON' && key === 'copy_button') {
                    el.title = trans[key]; // Update title for icon buttons
                } else if (el.tagName === 'BUTTON' && key === 'download_button') {
                    el.title = trans[key]; // Update title for icon buttons
                } else {
                    el.textContent = trans[key];
                }
            }
        });
        // Update placeholder based on active tab and language
        updateInputPlaceholder();
        // Update output placeholder - NO LONGER NEEDED, placeholder is static English
        // if (outputCodeEl.textContent.trim() === "# Python code will appear here..." || outputCodeEl.textContent.trim().startsWith('# ')) { // Check if it's the placeholder
        //      outputCodeEl.textContent = "# Python code will appear here...";
        //      hljs.highlightElement(outputCodeEl); // Re-highlight placeholder if needed
        // }
        // Update HTML lang and dir
        htmlEl.lang = lang;
        htmlEl.dir = lang === 'he' ? 'rtl' : 'ltr';

        // Update active language button style
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
            btn.classList.toggle('btn-primary', btn.dataset.lang === lang); // Use primary color for active
            btn.classList.toggle('btn-outline-secondary', btn.dataset.lang !== lang);
        });
    }

    // Function to set language
    function setLanguage(lang) {
        if (translations[lang]) {
            currentLang = lang;
            localStorage.setItem('preferredLang', lang);
            applyTranslations(lang);
        }
    }

    // Function to update input placeholder based on active tab
    function updateInputPlaceholder() {
        const placeholderKey = currentTab === 'rest' ? 'input_placeholder_rest' : 'input_placeholder_curl';
        inputDataEl.placeholder = translations[currentLang][placeholderKey];
    }

    // Function to show error messages
    function showError(messageKey) {
        errorAlertEl.textContent = translations[currentLang][messageKey] || translations[currentLang]['error_unknown'];
        errorAlertEl.classList.remove('d-none');
    }

    // Function to hide error messages
    function hideError() {
        errorAlertEl.classList.add('d-none');
    }

    // Function to handle code generation
    async function handleGenerateCode() {
        hideError();
        const inputText = inputDataEl.value.trim();
        if (!inputText) {
            showError('error_invalid_input');
            return;
        }

        // --- Input Format Validation Removed (will be done by AI) ---


        // Disable button and show loading state
        generateBtn.disabled = true;
        generateBtn.textContent = translations[currentLang].generating;
        outputCodeEl.textContent = "# Python code will appear here..."; // Use static placeholder
        outputActionsEl.classList.add('d-none'); // Hide buttons initially
        outputPreEl.classList.add('output-disabled'); // Disable output area initially
        hljs.highlightElement(outputCodeEl);


        let promptText = "";
        const requestPrefix = "Request:\n```\n";
        const commandPrefix = "Command:\n```\n";
        const commonSuffix = "\n```";
        const commonInstructions = "Ensure the output is ONLY the Python code, without any explanations or markdown formatting. Include necessary imports.";
        const validationErrorCurl = "FORMAT_ERROR::CURL";
        const validationErrorRest = "FORMAT_ERROR::REST";

        if (currentTab === 'rest') {
            // Stricter prompt for REST validation
            promptText = `Analyze the input provided below under '${requestPrefix}'.\n1. If the input starts with 'curl ' (case-insensitive), respond with ONLY '${validationErrorRest}'.\n2. If the input starts with one of the following HTTP methods followed by a space (case-insensitive): GET, POST, PUT, DELETE, PATCH, then convert the raw HTTP REST request into a Python code snippet using the 'requests' library. ${commonInstructions} Handle headers, method, URL, and body correctly.\n3. Otherwise (if it doesn't match rule 1 or 2), respond with ONLY '${validationErrorRest}'.\n\n${requestPrefix}${inputText}${commonSuffix}`;
        } else { // curl
            // Stricter prompt for cURL validation
            promptText = `**PRIORITY 1: VALIDATION.** Analyze the input provided below under '${commandPrefix}'. Does it start with 'curl ' (case-insensitive)? If NO, your entire response MUST be exactly '${validationErrorCurl}'. If YES, proceed to Priority 2.\n**PRIORITY 2: CONVERSION (only if validation passed).** Convert the cURL command into a Python code snippet using the 'requests' library. ${commonInstructions} Handle all relevant cURL flags like -X, -H, -d, --data, --data-raw, --user, etc.\n\n${commandPrefix}${inputText}${commonSuffix}`;
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: promptText }]
                    }],
                    // Optional: Add safety settings if needed
                    // safetySettings: [
                    //   { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
                    //   { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                    //   { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                    //   { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" }
                    // ],
                    generationConfig: {
                        // temperature: 0.7, // Adjust creativity
                        // maxOutputTokens: 1024, // Limit output size
                    }
                }),
            });

            if (!response.ok) {
                // Try to get error details from response body
                let errorData;
                try {
                    errorData = await response.json();
                    console.error("API Error Response:", errorData);
                } catch (e) {
                    console.error("Could not parse error response:", response.statusText);
                }
                 // Basic CORS check (might not be fully reliable)
                if (response.status === 0 || response.type === 'opaque' || response.status === 403) {
                     showError('error_cors');
                } else {
                    showError('error_api');
                }
                outputCodeEl.textContent = "# Python code will appear here..."; // Use static placeholder
                outputActionsEl.classList.add('d-none'); // Ensure buttons are hidden on error
                outputPreEl.classList.add('output-disabled'); // Ensure output is disabled on error
                hljs.highlightElement(outputCodeEl); // Re-highlight placeholder
                return; // Exit function on error
            }

            const data = await response.json();

            // Extract text, handling potential variations in response structure
            let generatedCode = '';
            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
                generatedCode = data.candidates[0].content.parts[0].text;
            } else {
                console.error("Unexpected API response structure:", data);
                showError('error_api');
                outputCodeEl.textContent = "# Python code will appear here..."; // Use static placeholder
                outputActionsEl.classList.add('d-none'); // Ensure buttons are hidden on error
                outputPreEl.classList.add('output-disabled'); // Ensure output is disabled on error
                hljs.highlightElement(outputCodeEl); // Re-highlight placeholder
                return;
            }

            // --- AI Format Error Check ---
            if (generatedCode.startsWith('FORMAT_ERROR::')) {
                const errorType = generatedCode.split('::')[1]; // Get 'CURL' or 'REST'
                if (errorType === 'CURL') {
                    showError('error_ai_invalid_curl_format');
                } else if (errorType === 'REST') {
                    showError('error_ai_invalid_rest_format');
                } else {
                    showError('error_unknown'); // Fallback
                }
                outputCodeEl.textContent = "# Python code will appear here..."; // Use static placeholder
                outputActionsEl.classList.add('d-none'); // Ensure buttons are hidden on error
                outputPreEl.classList.add('output-disabled'); // Ensure output is disabled on error
                hljs.highlightElement(outputCodeEl); // Re-highlight placeholder
                return; // Exit after showing format error
            }
            // --- End AI Format Error Check ---


            // Clean the code: remove markdown backticks and 'python' label if present
            generatedCode = generatedCode.replace(/^```python\s*/i, '').replace(/\s*```$/, '').trim();

            outputCodeEl.textContent = generatedCode || "# Python code will appear here..."; // Use static placeholder
            // SUCCESS (or empty result from AI): Show buttons and enable output area if code exists
            if (generatedCode) {
                outputActionsEl.classList.remove('d-none');
                outputPreEl.classList.remove('output-disabled');
            } else {
                // Keep disabled if no code generated (e.g., API returned empty)
                outputActionsEl.classList.add('d-none');
                outputPreEl.classList.add('output-disabled');
            }
            hljs.highlightElement(outputCodeEl); // Apply syntax highlighting

        } catch (error) {
            console.error('Fetch Error:', error);
             // Basic CORS check
            if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                 showError('error_cors');
            } else {
                showError('error_api');
            }
            outputCodeEl.textContent = "# Python code will appear here..."; // Use static placeholder
            outputActionsEl.classList.add('d-none'); // Ensure buttons are hidden on error
            outputPreEl.classList.add('output-disabled'); // Ensure output is disabled on error
            hljs.highlightElement(outputCodeEl); // Re-highlight placeholder
        } finally {
            // Re-enable button and restore text
            generateBtn.disabled = false;
            generateBtn.textContent = translations[currentLang].generate_button;
        }
    }

    // Function to copy code to clipboard
    function copyCode() {
        const codeToCopy = outputCodeEl.textContent;
        // Avoid copying placeholder text
        if (codeToCopy && codeToCopy !== "# Python code will appear here...") {
            navigator.clipboard.writeText(codeToCopy).then(() => {
                // Optional: Show temporary success message
                const originalTitle = copyBtn.title;
                copyBtn.title = translations[currentLang].copied_success;
                setTimeout(() => {
                    copyBtn.title = originalTitle;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                // Optionally show an error to the user
            });
        }
    }

    // Function to download code as .py file
    function downloadCode() {
        const codeToDownload = outputCodeEl.textContent;
        // Avoid downloading placeholder text
        if (codeToDownload && codeToDownload !== "# Python code will appear here...") {
            const blob = new Blob([codeToDownload], { type: 'text/x-python' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'generated_code.py';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }

    // --- Event Listeners ---
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.dataset.lang);
        });
    });

    generateBtn.addEventListener('click', handleGenerateCode);
    copyBtn.addEventListener('click', copyCode);
    downloadBtn.addEventListener('click', downloadCode);

    // Tab switching logic
    restTabBtn.addEventListener('show.bs.tab', () => { // Use Bootstrap event
        currentTab = 'rest';
        updateInputPlaceholder();
        hideError(); // Hide errors when switching tabs
        // Optionally clear input/output or keep it? Let's keep it for now.
    });

    curlTabBtn.addEventListener('show.bs.tab', () => { // Use Bootstrap event
        currentTab = 'curl';
        updateInputPlaceholder();
        hideError(); // Hide errors when switching tabs
    });

    // --- Initialization ---
    // Detect initial language
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = navigator.language.split('-')[0]; // Get 'en' from 'en-US'

    if (savedLang && translations[savedLang]) {
        setLanguage(savedLang);
    } else if (translations[browserLang]) {
        setLanguage(browserLang);
    } else {
        setLanguage('en'); // Fallback to English
    }

    // Initialize highlight.js
    hljs.highlightAll();
    // Ensure the initial placeholder is highlighted if needed
    if (outputCodeEl.textContent === "# Python code will appear here...") {
         hljs.highlightElement(outputCodeEl);
    }

    // Set initial active tab style (Bootstrap handles the content switching)
    // No extra JS needed here if using data-bs-toggle="tab" correctly in HTML

    // Set initial placeholder
    updateInputPlaceholder();

}); // End DOMContentLoaded
