/**
 * Text Highlighting Utility
 * Highlights specific terms in text with red-bold styling
 * Works for both vanilla JS (returns HTML string) and React (returns JSX)
 */

const HIGHLIGHT_TERMS = [
    "Marketing",
    "Account Management",
    "Producers",
    "Project Coordinators",
    "Account Management"
];

/**
 * Escape special regex characters
 */
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Highlight text for vanilla JS (returns HTML string)
 * @param {string} text - The text to highlight
 * @returns {string} - HTML string with highlighted terms
 */
function highlightTextHTML(text) {
    if (!text) return '';
    
    const regex = new RegExp(`(${HIGHLIGHT_TERMS.map(escapeRegExp).join('|')})`, 'g');
    const parts = text.split(regex);
    
    return parts.map((part, i) => {
        if (HIGHLIGHT_TERMS.includes(part)) {
            return `<span class="text-red-800 font-bold">${part}</span>`;
        }
        return part;
    }).join('');
}

/**
 * Highlight text for React (returns JSX elements)
 * @param {string} text - The text to highlight
 * @returns {React.ReactElement} - React element with highlighted terms
 */
function HighlightText({ text }) {
    if (!text) return null;
    
    const regex = new RegExp(`(${HIGHLIGHT_TERMS.map(escapeRegExp).join('|')})`, 'g');
    const parts = text.split(regex);
    
    return React.createElement('span', null,
        parts.map((part, i) =>
            HIGHLIGHT_TERMS.includes(part) ?
                React.createElement('span', { key: i, className: 'text-red-800 font-bold' }, part) :
                part
        )
    );
}

// Expose globally for use in JSX
window.HighlightText = HighlightText;

