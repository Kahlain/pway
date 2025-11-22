/**
 * Shared Navigation Component
 * Creates a navigation header that matches the existing design
 * and provides links between the Flying Wheel and Operations Sheet views
 */

function createNavigation(currentPage = '') {
    const isOperationsSheet = currentPage === 'operations-sheet';
    const isFlyingWheel = currentPage === 'flying-wheel';
    const isOpsRationale = currentPage === 'ops-rationale';

    return `
        <header class="mb-12 border-b-2 border-slate-900 pb-6 flex flex-col md:flex-row justify-between items-end">
            <div>
                <h1 class="serif text-5xl font-bold text-slate-900 tracking-tight mb-2">The Pigeon Way</h1>
                <div class="flex items-center gap-4">
                    <div class="text-slate-500 font-medium uppercase tracking-widest text-sm">
                        ${isOperationsSheet ? 'Intelligence Operational Sheet v 0.8' : isOpsRationale ? 'Ops Rationale' : 'The Flying Wheel v 0.8'}
                    </div>
                    <nav class="flex items-center gap-3 text-xs">
                        <a href="operations-sheet.html" 
                           class="px-3 py-1 rounded transition-colors ${isOperationsSheet ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}">
                            Operations Sheet
                        </a>
                        <span class="text-slate-300">|</span>
                        <a href="pigeon-way.html" 
                           class="px-3 py-1 rounded transition-colors ${isFlyingWheel ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}">
                            Flying Wheel
                        </a>
                        <span class="text-slate-300">|</span>
                        <a href="ops-rationale.html" 
                           class="px-3 py-1 rounded transition-colors ${isOpsRationale ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}">
                            Ops Rationale
                        </a>
                        <span class="text-slate-300">|</span>
                        <button 
                            onclick="handleLogout()"
                            class="px-3 py-1 rounded transition-colors text-slate-600 hover:bg-slate-100 cursor-pointer border-0 bg-transparent"
                            title="Logout"
                        >
                            Logout
                        </button>
                    </nav>
                </div>
            </div>
            <div class="text-right mt-4 md:mt-0">
                <div class="text-2xl font-bold text-slate-900 serif italic">"Truth. Delivered."</div>
                <div class="text-slate-400 text-xs uppercase tracking-wider font-bold mt-1">One Team. One Soul.</div>
            </div>
        </header>
    `;
}

// For React component (used in pigeon-way.html)
// Expose globally for use in JSX
window.NavigationComponent = function NavigationComponent({ currentPage = '' }) {
    const isOperationsSheet = currentPage === 'operations-sheet';
    const isFlyingWheel = currentPage === 'flying-wheel';
    const isOpsRationale = currentPage === 'ops-rationale';

    return React.createElement('header', {
        className: 'relative z-20 w-full p-8 mb-4 border-b-2 border-slate-900 pb-6 flex flex-col md:flex-row justify-between items-end'
    }, [
        React.createElement('div', { key: 'left' }, [
            React.createElement('h1', {
                key: 'title',
                className: 'serif text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-2'
            }, 'The Pigeon Way'),
            React.createElement('div', {
                key: 'subtitle',
                className: 'flex items-center gap-4'
            }, [
                React.createElement('div', {
                    key: 'label',
                    className: 'text-slate-500 font-medium uppercase tracking-widest text-sm pl-1'
                }, isOperationsSheet ? 'Intelligence Operational Sheet v 0.8' : isOpsRationale ? 'Ops Rationale' : 'The Flying Wheel v 0.8'),
                React.createElement('nav', {
                    key: 'nav',
                    className: 'flex items-center gap-3 text-xs'
                }, [
                    React.createElement('a', {
                        key: 'operationssheet',
                        href: 'operations-sheet.html',
                        className: `px-3 py-1 rounded transition-colors ${isOperationsSheet ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}`
                    }, 'Operations Sheet'),
                    React.createElement('span', {
                        key: 'separator1',
                        className: 'text-slate-300'
                    }, '|'),
                    React.createElement('a', {
                        key: 'flywheel',
                        href: 'pigeon-way.html',
                        className: `px-3 py-1 rounded transition-colors ${isFlyingWheel ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}`
                    }, 'Flying Wheel'),
                    React.createElement('span', {
                        key: 'separator2',
                        className: 'text-slate-300'
                    }, '|'),
                    React.createElement('a', {
                        key: 'ops',
                        href: 'ops-rationale.html',
                        className: `px-3 py-1 rounded transition-colors ${isOpsRationale ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}`
                    }, 'Ops Rationale'),
                    React.createElement('span', {
                        key: 'separator3',
                        className: 'text-slate-300'
                    }, '|'),
                    React.createElement('button', {
                        key: 'logout',
                        onClick: () => handleLogout(),
                        className: 'px-3 py-1 rounded transition-colors text-slate-600 hover:bg-slate-100 cursor-pointer border-0 bg-transparent',
                        title: 'Logout'
                    }, 'Logout')
                ])
            ])
        ]),
        React.createElement('div', {
            key: 'right',
            className: 'text-right mt-4 md:mt-0'
        }, [
            React.createElement('div', {
                key: 'tagline',
                className: 'text-2xl font-bold text-slate-900 serif italic'
            }, '"Truth. Delivered."'),
            React.createElement('div', {
                key: 'motto',
                className: 'text-slate-400 text-xs uppercase tracking-wider font-bold mt-1'
            }, 'One Team. One Soul.')
        ])
    ]);
};

/**
 * Handle logout button click
 */
function handleLogout() {
    if (typeof clearAuthentication === 'function') {
        clearAuthentication();
        window.location.href = 'welcome.html';
    } else {
        // Fallback if auth function not loaded
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('pigeon_authenticated');
            localStorage.removeItem('pigeon_auth_timestamp');
            window.location.href = 'welcome.html';
        }
    }
}

// Expose globally
window.handleLogout = handleLogout;

