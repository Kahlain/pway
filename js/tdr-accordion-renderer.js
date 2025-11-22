/**
 * TDR Accordion Renderer (Vanilla JS)
 * Renders TDR accordion for operations-sheet.html
 * POC: Currently implemented for DISCOVER stage only
 */

// Tier color mapping
const TIER_COLORS = {
    1: { // Green - Agile & Relational
        border: '#10b981',
        bg: '#ecfdf5',
        text: '#065f46',
        badge: '#10b981'
    },
    2: { // Blue - Technical & Strategic
        border: '#3b82f6',
        bg: '#eff6ff',
        text: '#1e40af',
        badge: '#3b82f6'
    },
    3: { // Red - Compliance & Safety
        border: '#ef4444',
        bg: '#fef2f2',
        text: '#991b1b',
        badge: '#ef4444'
    }
};

// Tier labels
const TIER_LABELS = {
    1: 'Agile & Relational',
    2: 'Technical & Strategic',
    3: 'Compliance & Safety'
};

/**
 * Render TDR Card HTML
 * @param {Object} tdr - TDR data object
 * @param {string} uniqueId - Unique identifier for this accordion instance
 * @param {string} stageColor - The color of the stage (e.g., "#D6407D" for DISCOVER)
 * @returns {string} HTML string
 */
function renderTDRCard(tdr, uniqueId, stageColor) {
    if (!tdr) return '';
    
    const tierColors = TIER_COLORS[tdr.tier] || TIER_COLORS[1];
    const tierLabel = TIER_LABELS[tdr.tier] || 'Agile & Relational';
    const contentId = `tdr-content-${uniqueId}`;
    const buttonId = `tdr-button-${uniqueId}`;
    
    // Use stage color for border and background
    const borderColor = stageColor || tierColors.border;
    // Create darker version for percentage text visibility (more darkening for better contrast)
    const percentageColor = stageColor ? darkenColor(stageColor, 30) : borderColor;
    // Create light pink background from stage color (for DISCOVER: #D6407D)
    // Convert hex to rgba for proper opacity
    const lightPinkBg = stageColor ? hexToRgba(stageColor, 0.08) : tierColors.bg;
    
    return `
        <div class="tdr-accordion mt-4 rounded-lg border overflow-hidden transition-all duration-300 bg-white" 
             style="border-color: ${borderColor}; border-width: 2px;"
             data-tdr-id="${uniqueId}"
             data-tier="${tdr.tier}"
             data-stage-color="${stageColor || ''}">
            <!-- Toggle Button -->
            <button 
                id="${buttonId}"
                class="tdr-toggle w-full flex items-center justify-between p-3 text-left hover:bg-opacity-50 transition-colors"
                style="background-color: transparent;"
                onclick="toggleTDRAccordion('${uniqueId}')"
                aria-expanded="false"
                aria-controls="${contentId}">
                <div class="flex items-center gap-2">
                    <span class="text-xs font-semibold text-slate-700">
                        Documentation Standard (<span class="font-bold" style="color: ${percentageColor};">${tdr.target}</span>) and AI Potential
                    </span>
                </div>
                <span class="tdr-icon text-slate-400 transition-transform duration-300 text-xs">▼</span>
            </button>
            
            <!-- Expanded Content -->
            <div 
                id="${contentId}"
                class="tdr-content hidden px-3 pb-3 space-y-3"
                style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out, padding-top 0.3s ease-out, padding-bottom 0.3s ease-out;">
                <!-- The Rule -->
                <div class="bg-slate-50 rounded p-3 border border-slate-200">
                    <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">The Rule</h4>
                    <p class="text-xs text-slate-700 leading-relaxed">"${tdr.rule}"</p>
                </div>
                
                <!-- What to Document -->
                <div class="bg-slate-50 rounded p-3 border border-slate-200">
                    <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">What to Document</h4>
                    <ul class="space-y-1.5">
                        ${tdr.documentation.map(item => `
                            <li class="text-xs text-slate-700 flex items-start gap-2">
                                <span class="font-bold mt-0.5" style="color: ${borderColor};">•</span>
                                <span>${item}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <!-- AI Implication -->
                <div class="bg-slate-50 rounded p-3 border border-slate-200">
                    <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">The AI Implication</h4>
                    <p class="text-xs text-slate-700 leading-relaxed">${tdr.aiImplication}</p>
                </div>
            </div>
        </div>
    `;
}

/**
 * Convert hex color to rgba with opacity
 */
function hexToRgba(hex, opacity) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Darken a hex color for better visibility
 */
function darkenColor(hex, percent = 20) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    const newR = Math.max(0, Math.min(255, Math.floor(r * (1 - percent / 100))));
    const newG = Math.max(0, Math.min(255, Math.floor(g * (1 - percent / 100))));
    const newB = Math.max(0, Math.min(255, Math.floor(b * (1 - percent / 100))));
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

/**
 * Toggle TDR Accordion
 * @param {string} uniqueId - Unique identifier for the accordion
 */
function toggleTDRAccordion(uniqueId) {
    const accordion = document.querySelector(`[data-tdr-id="${uniqueId}"]`);
    if (!accordion) return;
    
    const button = accordion.querySelector('.tdr-toggle');
    const content = accordion.querySelector('.tdr-content');
    const icon = accordion.querySelector('.tdr-icon');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    // Get stage color for light pink background
    const stageColor = accordion.dataset.stageColor || '';
    const lightPinkBg = stageColor ? hexToRgba(stageColor, 0.08) : 'transparent';
    
    if (isExpanded) {
        // Collapse
        content.style.maxHeight = '0';
        content.style.paddingTop = '0';
        content.style.paddingBottom = '0';
        setTimeout(() => {
            content.classList.add('hidden');
        }, 300);
        button.setAttribute('aria-expanded', 'false');
        icon.style.transform = 'rotate(0deg)';
        button.style.backgroundColor = 'transparent';
        accordion.style.backgroundColor = 'white';
    } else {
        // Expand
        content.classList.remove('hidden');
        // Force reflow to get accurate scrollHeight
        content.style.maxHeight = '0';
        const scrollHeight = content.scrollHeight;
        // Trigger reflow
        void content.offsetHeight;
        content.style.maxHeight = scrollHeight + 'px';
        content.style.paddingTop = '1rem';
        content.style.paddingBottom = '1rem';
        button.setAttribute('aria-expanded', 'true');
        icon.style.transform = 'rotate(180deg)';
        
        // Use light pink background from stage color
        button.style.backgroundColor = lightPinkBg;
        accordion.style.backgroundColor = lightPinkBg;
    }
}

// Store tier info in accordion element for color management
function setTDRTier(uniqueId, tier) {
    const accordion = document.querySelector(`[data-tdr-id="${uniqueId}"]`);
    if (accordion) {
        accordion.dataset.tier = tier;
    }
}

