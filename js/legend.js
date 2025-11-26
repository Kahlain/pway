/**
 * Legend Component
 * Displays legend explaining red-bold functions, process statuses, and AS function split
 */

/**
 * Create Legend HTML (for operations-sheet.html)
 */
function createLegendHTML() {
    return `
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8 mt-12">
            <h3 class="text-lg font-bold text-slate-900 mb-4 serif">Legend</h3>
            
            <div class="space-y-6">
                <!-- Red Bold Functions -->
                <div>
                    <h4 class="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                        <span class="text-red-800 font-bold">Red Bold Functions</span>
                    </h4>
                    <p class="text-xs text-slate-600 leading-relaxed mb-2">
                        <span class="text-red-800 font-bold">Marketing, Account Management, Project Coordinators, and Producers</span> are important functions, but some are missing and others need an updated view. You'll gain efficiency once the team defines these roles clearly and aligns how they work together.
                    </p>
                </div>
                
                <!-- Process Statuses -->
                <div>
                    <h4 class="text-sm font-bold text-slate-700 mb-3">Process Status</h4>
                    <div class="space-y-2">
                        <div class="flex items-start gap-3">
                            <span class="inline-block px-2 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded mt-0.5">NEW</span>
                            <p class="text-xs text-slate-600 leading-relaxed flex-1">Process is documented but still very new and not fully functional and implemented.</p>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="inline-block px-2 py-1 bg-green-600 text-white text-[10px] font-bold rounded mt-0.5">Active</span>
                            <p class="text-xs text-slate-600 leading-relaxed flex-1">Process is fully functional and actively in use.</p>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="inline-block px-2 py-1 bg-red-700 text-white text-[10px] font-bold rounded mt-0.5">Merge</span>
                            <p class="text-xs text-slate-600 leading-relaxed flex-1">These processes must be merged under the same roof with the same approach but with different business rules to accommodate the difference between production and creative.</p>
                        </div>
                        <div class="flex items-start gap-3">
                            <span class="inline-block px-2 py-1 bg-orange-600 text-white text-[10px] font-bold rounded mt-0.5">To implement</span>
                            <p class="text-xs text-slate-600 leading-relaxed flex-1">Process is planned but not yet implemented.</p>
                        </div>
                    </div>
                </div>
                
                <!-- Account Services Split -->
                <div>
                    <h4 class="text-sm font-bold text-slate-700 mb-3">Account Services (AS) Function Split</h4>
                    <p class="text-xs text-slate-600 leading-relaxed">
                        <span class="text-red-800 font-bold">AS (Account Services)</span> is too large as a function that is putting too much pressure on the support structure. Dividing the function into <span class="text-red-800 font-bold">Account Management</span> (with skills to manage clients) vs <span class="text-red-800 font-bold">Project Coordinators</span> (with skills to manage projects) will bring more clarity and less friction.
                    </p>
                </div>
                
                <!-- Support Engine Documentation -->
                <div>
                    <h4 class="text-sm font-bold text-slate-700 mb-3">Support Engine</h4>
                    <p class="text-xs text-slate-600 leading-relaxed mb-3">
                        <span class="text-slate-900 font-bold">(*) Support Engine Process in documentation stage</span>
                    </p>
                    <div class="space-y-2 text-xs text-slate-600">
                        <p>Total Headcount: <span class="text-slate-900 font-medium">90</span> (Full time and Freelancers)</p>
                        <p>Support Team Resources: <span class="text-slate-900 font-medium">8</span> (excl. Account Management)</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Legend React Component (for pigeon-way.html)
 */
function LegendComponent() {
    return React.createElement('div', {
        className: 'bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8 mt-12'
    }, [
        React.createElement('h3', {
            key: 'title',
            className: 'text-lg font-bold text-slate-900 mb-4 serif'
        }, 'Legend'),
        
        React.createElement('div', {
            key: 'content',
            className: 'space-y-6'
        }, [
            // Red Bold Functions
            React.createElement('div', { key: 'red-bold' }, [
                React.createElement('h4', {
                    key: 'title',
                    className: 'text-sm font-bold text-slate-700 mb-3 flex items-center gap-2'
                }, [
                    React.createElement('span', {
                        key: 'label',
                        className: 'text-red-800 font-bold'
                    }, 'Red Bold Functions')
                ]),
                React.createElement('p', {
                    key: 'desc',
                    className: 'text-xs text-slate-600 leading-relaxed mb-2'
                }, [
                    React.createElement('span', {
                        key: 'highlight',
                        className: 'text-red-800 font-bold'
                    }, 'Marketing, Account Management, Project Coordinators, and Producers'),
                    ' are important functions, but some are missing and others need an updated view. You\'ll gain efficiency once the team defines these roles clearly and aligns how they work together.'
                ])
            ]),
            
            // Process Statuses
            React.createElement('div', { key: 'status' }, [
                React.createElement('h4', {
                    key: 'title',
                    className: 'text-sm font-bold text-slate-700 mb-3'
                }, 'Process Status'),
                React.createElement('div', {
                    key: 'statuses',
                    className: 'space-y-2'
                }, [
                    React.createElement('div', {
                        key: 'new',
                        className: 'flex items-start gap-3'
                    }, [
                        React.createElement('span', {
                            key: 'badge',
                            className: 'inline-block px-2 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded mt-0.5'
                        }, 'NEW'),
                        React.createElement('p', {
                            key: 'desc',
                            className: 'text-xs text-slate-600 leading-relaxed flex-1'
                        }, 'Process is documented but still very new and not fully functional and implemented.')
                    ]),
                    React.createElement('div', {
                        key: 'active',
                        className: 'flex items-start gap-3'
                    }, [
                        React.createElement('span', {
                            key: 'badge',
                            className: 'inline-block px-2 py-1 bg-green-600 text-white text-[10px] font-bold rounded mt-0.5'
                        }, 'Active'),
                        React.createElement('p', {
                            key: 'desc',
                            className: 'text-xs text-slate-600 leading-relaxed flex-1'
                        }, 'Process is fully functional and actively in use.')
                    ]),
                    React.createElement('div', {
                        key: 'merge',
                        className: 'flex items-start gap-3'
                    }, [
                        React.createElement('span', {
                            key: 'badge',
                            className: 'inline-block px-2 py-1 bg-red-700 text-white text-[10px] font-bold rounded mt-0.5'
                        }, 'Merge'),
                        React.createElement('p', {
                            key: 'desc',
                            className: 'text-xs text-slate-600 leading-relaxed flex-1'
                        }, 'These processes must be merged under the same roof with the same approach but with different business rules to accommodate the difference between production and creative.')
                    ]),
                    React.createElement('div', {
                        key: 'todo',
                        className: 'flex items-start gap-3'
                    }, [
                        React.createElement('span', {
                            key: 'badge',
                            className: 'inline-block px-2 py-1 bg-orange-600 text-white text-[10px] font-bold rounded mt-0.5'
                        }, 'To implement'),
                        React.createElement('p', {
                            key: 'desc',
                            className: 'text-xs text-slate-600 leading-relaxed flex-1'
                        }, 'Process is planned but not yet implemented.')
                    ])
                ])
            ]),
            
            // Account Services Split
            React.createElement('div', { key: 'as-split' }, [
                React.createElement('h4', {
                    key: 'title',
                    className: 'text-sm font-bold text-slate-700 mb-3'
                }, 'Account Services (AS) Function Split'),
                React.createElement('p', {
                    key: 'desc',
                    className: 'text-xs text-slate-600 leading-relaxed'
                }, [
                    React.createElement('span', {
                        key: 'as',
                        className: 'text-red-800 font-bold'
                    }, 'AS (Account Services)'),
                    ' is too large as a function that is putting too much pressure on the support structure. Dividing the function into ',
                    React.createElement('span', {
                        key: 'ad',
                        className: 'text-red-800 font-bold'
                    }, 'Account Management'),
                    ' (with skills to manage clients) vs ',
                    React.createElement('span', {
                        key: 'pc',
                        className: 'text-red-800 font-bold'
                    }, 'Project Coordinators'),
                    ' (with skills to manage projects) will bring more clarity and less friction.'
                ])
            ]),
            
            // Support Engine Documentation
            React.createElement('div', { key: 'support-engine' }, [
                React.createElement('h4', {
                    key: 'title',
                    className: 'text-sm font-bold text-slate-700 mb-3'
                }, 'Support Engine'),
                React.createElement('p', {
                    key: 'desc',
                    className: 'text-xs text-slate-600 leading-relaxed mb-3'
                }, [
                    React.createElement('span', {
                        key: 'note',
                        className: 'text-slate-900 font-bold'
                    }, '(*) Support Engine Process in documentation stage')
                ]),
                React.createElement('div', {
                    key: 'metadata',
                    className: 'space-y-2 text-xs text-slate-600'
                }, [
                    React.createElement('p', { key: 'headcount' }, [
                        'Total Headcount: ',
                        React.createElement('span', {
                            key: 'value',
                            className: 'text-slate-900 font-medium'
                        }, '90'),
                        ' (Full time and Freelancers)'
                    ]),
                    React.createElement('p', { key: 'resources' }, [
                        'Support Team Resources: ',
                        React.createElement('span', {
                            key: 'value',
                            className: 'text-slate-900 font-medium'
                        }, '8'),
                        ' (excl. Account Management)'
                    ])
                ])
            ])
        ])
    ]);
}

// Expose globally
window.createLegendHTML = createLegendHTML;
window.LegendComponent = LegendComponent;

