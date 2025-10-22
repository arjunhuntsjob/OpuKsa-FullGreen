// function googleTranslateElementInit() {
//   new google.translate.TranslateElement({
//     pageLanguage: 'en',
//     includedLanguages: 'en,ar',
//     layout: google.translate.TranslateElement.InlineLayout.SIMPLE
//   }, 'google_translate_element');
// }

// function loadGoogleTranslateScript() {
//   if (!document.getElementById('google-translate-script')) {
//     var script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//     script.id = 'google-translate-script';
//     document.head.appendChild(script);
//   }
// }
// loadGoogleTranslateScript();
// window.addEventListener('popstate', function () {
//   googleTranslateElementInit();
// });

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,ar',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

function loadGoogleTranslateScript() {
  if (!document.getElementById('google-translate-script')) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.id = 'google-translate-script';
    document.head.appendChild(script);
  }
}

// Function to replace specific Arabic translations
function replaceArabicTranslations() {
  // Wait for the translation to complete
  setTimeout(function () {
    // Get all text nodes in the document
    var walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    var node;
    var replacements = {
      // 'بيت': 'adarsh',
      // 'لتطوير المهارات المحدودة': '123',
      // 'شركة أسماكس لتطوير المهارات المحدودة ': "xyz",
      // 'شركة أسماكس لتطوير المهارات المحدودة': 'xzy',
      // 'المحدودة': '123',

    };

    while (node = walker.nextNode()) {
      var text = node.nodeValue;
      var modified = false;

      // Replace each occurrence
      for (var original in replacements) {
        if (text.includes(original)) {
          text = text.replace(new RegExp(original, 'g'), replacements[original]);
          modified = true;
        }
      }

      if (modified) {
        node.nodeValue = text;
      }
    }
  }, 1000); // Adjust delay if needed (1000ms = 1 second)
}

// Monitor for language changes
var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      var htmlElement = document.documentElement;
      if (htmlElement.classList.contains('translated-rtl') ||
        htmlElement.lang === 'ar') {
        replaceArabicTranslations();
      }
    }
  });
});

// Start observing
observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class', 'lang']
});

// Also run on initial load if already translated
window.addEventListener('load', function () {
  if (document.documentElement.classList.contains('translated-rtl') ||
    document.documentElement.lang === 'ar') {
    replaceArabicTranslations();
  }
});

loadGoogleTranslateScript();

window.addEventListener('popstate', function () {
  googleTranslateElementInit();
});




// ------------------------------------------------------------------------------------------
// function googleTranslateElementInit() {
//   new google.translate.TranslateElement({
//     pageLanguage: 'en',
//     includedLanguages: 'en,ar',
//     layout: google.translate.TranslateElement.InlineLayout.SIMPLE
//   }, 'google_translate_element');

//   // Wait for widget to load
//   setTimeout(() => {
//     const selectElement = document.querySelector('.goog-te-combo');
//     if (selectElement) {
//       // Check for saved language preference
//       let savedLanguage = getSavedLanguage();

//       if (savedLanguage && savedLanguage !== 'en') {
//         selectElement.value = savedLanguage;
//         selectElement.dispatchEvent(new Event('change'));
//       }

//       // Add event listener to save language preference
//       selectElement.addEventListener('change', function () {
//         const selectedLang = this.value;
//         saveLanguagePreference(selectedLang);
//       });
//     }
//   }, 1000);
// }

// function getSavedLanguage() {
//   // First try to get from Google's cookie
//   const googtransCookie = getCookie('googtrans');
//   console.log("googtransCookie", googtransCookie);

//   if (googtransCookie && googtransCookie !== '/en/en') {
//     const langCode = googtransCookie.split('/')[2];
//     if (langCode) return langCode;
//   }

//   // Fallback to localStorage
//   return localStorage.getItem('selectedLanguage') || 'en';
// }

// function saveLanguagePreference(language) {
//   // Save to localStorage as backup
//   localStorage.setItem('selectedLanguage', language);
// }

// function getCookie(name) {
//   const nameEQ = name + "=";
//   const ca = document.cookie.split(';');
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === ' ') c = c.substring(1, c.length);
//     if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//   }
//   return null;
// }

// function loadGoogleTranslateScript() {
//   if (!document.getElementById('google-translate-script')) {
//     var script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//     script.id = 'google-translate-script';
//     document.head.appendChild(script);
//   }
// }

// // Initialize when DOM is ready
// document.addEventListener('DOMContentLoaded', function () {
//   loadGoogleTranslateScript();
// });

// window.addEventListener('popstate', function () {
//   setTimeout(() => {
//     googleTranslateElementInit();
//   }, 100);
// });


















// ...........................................................................................
// function googleTranslateElementInit() {
//   // Check if there's a saved language preference
//   const savedLanguage = getCookie('googtrans');

//   new google.translate.TranslateElement({
//     pageLanguage: 'en',
//     includedLanguages: 'en,ar',
//     layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
//     // Set auto display to false to prevent conflicts
//     autoDisplay: false
//   }, 'google_translate_element');

//   // Apply saved language if it exists and is not default
//   if (savedLanguage && savedLanguage !== '/en/en' && savedLanguage !== '') {
//     // Wait for the widget to load then apply the saved language
//     setTimeout(() => {
//       const selectElement = document.querySelector('.goog-te-combo');
//       if (selectElement) {
//         // Extract language code from the cookie format (/en/ar -> ar)
//         const langCode = savedLanguage.split('/')[2];
//         if (langCode && langCode !== 'en') {
//           selectElement.value = langCode;
//           selectElement.dispatchEvent(new Event('change'));
//         }
//       }
//     }, 1000);
//   }
// }

// function loadGoogleTranslateScript() {
//   if (!document.getElementById('google-translate-script')) {
//     var script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//     script.id = 'google-translate-script';
//     document.head.appendChild(script);
//   }
// }

// // Function to get cookie value
// function getCookie(name) {
//   const nameEQ = name + "=";
//   const ca = document.cookie.split(';');
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === ' ') c = c.substring(1, c.length);
//     if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//   }
//   return null;
// }

// // Initialize when DOM is ready
// document.addEventListener('DOMContentLoaded', function () {
//   loadGoogleTranslateScript();
// });

// // Handle popstate event for back/forward navigation
// window.addEventListener('popstate', function () {
//   // Small delay to ensure page is ready
//   setTimeout(() => {
//     googleTranslateElementInit();
//   }, 100);
// });
