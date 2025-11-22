/**
 * TDR Accordion Component (React)
 * Collapsible accordion for displaying Digital Readiness Standard information
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
 * TDRCard React Component
 * @param {Object} props
 * @param {Object} props.tdr - TDR data object with tier, target, rule, documentation, aiImplication
 * @param {string} props.stageColor - The color of the stage (e.g., "#D6407D" for DISCOVER)
 */
function TDRCard({ tdr, stageColor }) {
    const [isExpanded, setIsExpanded] = React.useState(false);
    
    if (!tdr) return null;
    
    const tierColors = TIER_COLORS[tdr.tier] || TIER_COLORS[1];
    const tierLabel = TIER_LABELS[tdr.tier] || 'Agile & Relational';
    
    // Use stage color for border and background
    const borderColor = stageColor || tierColors.border;
    // Create darker version for percentage text visibility (more darkening for better contrast)
    const percentageColor = stageColor ? darkenColor(stageColor, 30) : borderColor;
    // Create light pink background from stage color (for DISCOVER: #D6407D)
    // Convert hex to rgba for proper opacity
    const lightPinkBg = stageColor ? hexToRgba(stageColor, 0.08) : tierColors.bg;
    
    return React.createElement('div', {
        className: 'rounded-lg border overflow-hidden transition-all duration-300 bg-white',
        style: {
            borderColor: borderColor,
            borderWidth: '2px',
            backgroundColor: isExpanded ? lightPinkBg : 'white'
        }
    }, [
        // Toggle Button
        React.createElement('button', {
            key: 'toggle',
            onClick: () => setIsExpanded(!isExpanded),
            className: 'w-full flex items-center justify-between p-3 text-left hover:bg-opacity-50 transition-colors',
            style: { backgroundColor: isExpanded ? lightPinkBg : 'transparent' },
            'aria-expanded': isExpanded,
            'aria-label': isExpanded ? 'Hide Process Specs' : 'View Process Specs'
        }, [
            React.createElement('div', {
                key: 'left',
                className: 'flex items-center gap-2'
            }, [
                React.createElement('span', {
                    key: 'title',
                    className: 'text-xs font-semibold text-slate-700'
                }, [
                    'Documentation Standard (',
                    React.createElement('span', {
                        key: 'percentage',
                        className: 'font-bold',
                        style: { color: percentageColor }
                    }, tdr.target),
                    ') and AI Potential'
                ])
            ]),
            React.createElement('span', {
                key: 'icon',
                className: 'text-slate-400 transition-transform duration-300 text-xs',
                style: { transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }
            }, '▼')
        ]),
        
        // Expanded Content
        isExpanded && React.createElement('div', {
            key: 'content',
            className: 'px-3 pb-3 space-y-3'
        }, [
            // The Rule
            React.createElement('div', {
                key: 'rule',
                className: 'bg-slate-50 rounded p-3 border border-slate-200'
            }, [
                React.createElement('h4', {
                    key: 'rule-title',
                    className: 'text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1'
                }, 'The Rule'),
                React.createElement('p', {
                    key: 'rule-text',
                    className: 'text-xs text-slate-700 leading-relaxed'
                }, `"${tdr.rule}"`)
            ]),
            
            // What to Document
            React.createElement('div', {
                key: 'documentation',
                className: 'bg-slate-50 rounded p-3 border border-slate-200'
            }, [
                React.createElement('h4', {
                    key: 'doc-title',
                    className: 'text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2'
                }, 'What to Document'),
                React.createElement('ul', {
                    key: 'doc-list',
                    className: 'space-y-1.5'
                }, tdr.documentation.map((item, idx) =>
                    React.createElement('li', {
                        key: idx,
                        className: 'text-xs text-slate-700 flex items-start gap-2'
                    }, [
                        React.createElement('span', {
                            key: 'bullet',
                            className: 'font-bold mt-0.5',
                            style: { color: borderColor }
                        }, '•'),
                        React.createElement('span', { key: 'text' }, item)
                    ])
                ))
            ]),
            
            // AI Implication
            React.createElement('div', {
                key: 'ai',
                className: 'bg-slate-50 rounded p-3 border border-slate-200'
            }, [
                React.createElement('h4', {
                    key: 'ai-title',
                    className: 'text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1'
                }, 'The AI Implication'),
                React.createElement('p', {
                    key: 'ai-text',
                    className: 'text-xs text-slate-700 leading-relaxed'
                }, tdr.aiImplication)
            ])
        ])
    ]);
}

// Expose globally for use in JSX
window.TDRCard = TDRCard;

