/**
 * Master Sheet Renderer
 * Renders the master sheet HTML from JSON data
 * Preserves exact HTML structure and classes from the original design
 */

/**
 * Get status badge HTML
 */
function getStatusBadge(status) {
    const badges = {
        'new': '<span class="text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded">NEW</span>',
        'active': '<span class="text-[10px] bg-green-600 text-white px-1.5 py-0.5 rounded">Active</span>',
        'merge': '<span class="text-[10px] bg-red-700 text-white px-1.5 py-0.5 rounded">Merge</span>',
        'todo': '<span class="text-[10px] bg-orange-600 text-white px-1.5 py-0.5 rounded">To implement</span>'
    };
    return badges[status] || '';
}

/**
 * Get process list item classes based on status
 */
function getProcessListItemClass(status) {
    const classes = {
        'new': 'flex items-center justify-between text-sm font-medium text-slate-700 bg-indigo-50 border-indigo-200 p-3 rounded border shadow-sm',
        'active': 'flex items-center justify-between text-sm font-medium text-slate-700 bg-white p-3 rounded border border-slate-100 shadow-sm',
        'merge': 'flex items-center justify-between text-sm font-medium text-slate-700 bg-red-50 border-red-200 p-3 rounded border shadow-sm',
        'todo': 'flex items-center justify-between text-sm font-medium text-slate-700 bg-orange-50 border-orange-200 p-3 rounded border shadow-sm'
    };
    return classes[status] || classes['active'];
}

/**
 * Render a single stage card
 */
function renderStage(stage) {
    // Handle engine color for badge - DEFINE uses #84cc16, DELIVER uses slate-800, DYNAMIZE uses slate-500
    let engineColorClass = '';
    if (stage.engineColor === '#84cc16') {
        engineColorClass = 'text-[#84cc16]';
    } else if (stage.engineColor === '#231F20') {
        engineColorClass = 'text-slate-800';
    } else if (stage.engineColor === '#A6A8AB') {
        engineColorClass = 'text-slate-500';
    } else {
        engineColorClass = `text-[${stage.engineColor}]`;
    }
    
    return `
        <!-- ${stage.step}. ${stage.title} -->
        <div class="page-break bg-white rounded-xl border-l-8 shadow-sm overflow-hidden" style="border-color: ${stage.color};">
            <div class="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
                <!-- Brand Identity -->
                <div class="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0">
                    <div class="flex items-center gap-3 mb-2">
                        <span class="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Step ${stage.step}</span>
                        <span class="text-[10px] font-bold ${engineColorClass} uppercase tracking-wider">${stage.engine}</span>
                    </div>
                    <h2 class="text-4xl font-bold text-slate-900 mb-2">${stage.title}</h2>
                    <p class="serif text-xl italic text-slate-600 mb-4">"${stage.promise}"</p>
                    <p class="text-sm text-slate-500 leading-relaxed">${stage.description}</p>
                </div>

                <!-- Our People -->
                <div class="lg:col-span-1">
                    <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full" style="background-color: ${stage.color};"></span> Our People
                    </h3>
                    <div class="bg-slate-50 rounded-lg p-4 border border-slate-100 space-y-4">
                        <div class="bg-white p-3 rounded border border-slate-200 shadow-sm">
                            <div class="text-[10px] font-bold text-slate-400 uppercase mb-1">The Experts</div>
                            <div class="text-xs font-medium text-slate-700">${highlightTextHTML(stage.people.experts)}</div>
                        </div>
                        <div class="bg-white p-3 rounded border border-slate-200 shadow-sm">
                            <div class="text-[10px] font-bold text-slate-400 uppercase mb-1">The Coordinators</div>
                            <div class="text-xs font-medium text-slate-700">${highlightTextHTML(stage.people.coordinators)}</div>
                        </div>
                    </div>
                </div>

                <!-- The Front Processes -->
                <div class="lg:col-span-2">
                    <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full" style="background-color: ${stage.color};"></span> The Front Processes
                    </h3>
                    <div class="bg-slate-50 rounded-lg p-4 border border-slate-100">
                        <ul class="space-y-2">
                            ${stage.processes.map(proc => `
                                <li class="${getProcessListItemClass(proc.status)}">
                                    ${proc.name}
                                    ${getStatusBadge(proc.status)}
                                </li>
                            `).join('')}
                        </ul>
                        <div class="mt-3">
                            <span class="inline-block px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded border border-slate-200">
                                Engine: ${stage.engine}
                            </span>
                        </div>
                        
                        <!-- TDR Accordion for Front Processes -->
                        ${stage.tdr ? renderTDRCard(stage.tdr, `${stage.id}-${stage.step}`, stage.color) : ''}
                    </div>
                </div>

                <!-- The Back Process -->
                <div class="lg:col-span-1">
                    <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full" style="background-color: ${stage.color};"></span> The Back Process
                    </h3>
                    <div class="bg-slate-50 rounded-lg p-4 border border-slate-100 space-y-4">
                        ${stage.backProcess.map(item => `
                            <div class="bg-white p-3 rounded border border-slate-200 shadow-sm">
                                <div class="text-[10px] font-bold text-slate-400 uppercase mb-1">${highlightTextHTML(item.title)}</div>
                                <div class="text-xs font-medium text-slate-700">${item.desc}</div>
                            </div>
                        `).join('')}
                        <div class="mt-3">
                            <span class="inline-block px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded border border-slate-200">
                                Engine: Support Engine
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Render the entire master sheet from JSON data
 */
function renderMasterSheet(data) {
    const stagesHTML = data.stages.map(stage => renderStage(stage)).join('');
    
    return `
        <!-- The Dimensions Table -->
        <div class="space-y-8">
            ${stagesHTML}
        </div>
    `;
}

/**
 * Initialize the master sheet renderer
 * Loads JSON data and renders the master sheet
 */
async function initMasterSheet() {
    try {
        // Add cache-busting parameter to ensure fresh data
        const response = await fetch('data/stages-data.json?v=' + Date.now());
        const data = await response.json();
        
        const container = document.getElementById('master-sheet-content');
        if (container) {
            container.innerHTML = renderMasterSheet(data);
            
            // Set tier data for TDR accordions (stages only)
            data.stages.forEach((stage) => {
                if (stage.tdr) {
                    setTDRTier(`${stage.id}-${stage.step}`, stage.tdr.tier);
                }
            });
        }
    } catch (error) {
        console.error('Error loading master sheet data:', error);
        const container = document.getElementById('master-sheet-content');
        if (container) {
            container.innerHTML = '<div class="text-red-600 p-4">Error loading data. Please check the console.</div>';
        }
    }
}

