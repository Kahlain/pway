/**
 * Shared Navigation Component
 * Creates a navigation header that matches the existing design
 * and provides links between The Flywheel and Operations Sheet views
 */

function createNavigation(currentPage = '') {
    const isOperationsSheet = currentPage === 'operations-sheet';
    const isFlyingWheel = currentPage === 'flying-wheel';
    const isOpsRationale = currentPage === 'ops-rationale';
    const isOurServices = currentPage === 'our-services';

    return `
        <header class="mb-12 border-b-2 border-slate-900 pb-6">
            <!-- Top Row: Logo/Title and Tagline -->
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div class="flex items-center gap-3">
                    <img src="pigeon.svg" alt="Pigeon Logo" class="h-10 md:h-12" />
                    <h1 class="serif text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">The Pigeon Way</h1>
                </div>
                <div class="text-left md:text-right">
                    <div class="text-xl md:text-2xl font-bold text-slate-900 serif italic">"Truth. Delivered."</div>
                    <div class="text-slate-400 text-xs uppercase tracking-wider font-bold mt-1">One Team. One Soul.</div>
                </div>
            </div>
            
            <!-- Bottom Row: Page Label and Navigation -->
            <div class="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                <div class="text-slate-500 font-medium uppercase tracking-widest text-xs md:text-sm">
                    ${isOperationsSheet ? 'Intelligence Operational Sheet v 0.8' : isOpsRationale ? 'Ops Rationale' : isOurServices ? 'Our Services' : 'The Flywheel v 0.8'}
                </div>
                <nav class="flex items-center gap-2 md:gap-3 text-xs flex-wrap">
                    <a href="operations-sheet.html" 
                       class="px-3 py-1.5 rounded transition-colors ${isOperationsSheet ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}">
                        Operations Sheet
                    </a>
                    <span class="text-slate-300">|</span>
                    <a href="pigeon-way.html" 
                       class="px-3 py-1.5 rounded transition-colors ${isFlyingWheel ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}">
                        The Flywheel
                    </a>
                    <span class="text-slate-300">|</span>
                    <a href="ops-rationale.html" 
                       class="px-3 py-1.5 rounded transition-colors ${isOpsRationale ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}">
                        Ops Rationale
                    </a>
                    <span class="text-slate-300">|</span>
                    <a href="our-services.html" 
                       class="px-3 py-1.5 rounded transition-colors ${isOurServices ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}">
                        Our Services
                    </a>
                    <span class="text-slate-300">|</span>
                    <button 
                        onclick="handleLogout()"
                        class="px-3 py-1.5 rounded transition-colors text-slate-600 hover:bg-slate-100 cursor-pointer border-0 bg-transparent"
                        title="Logout"
                    >
                        Logout
                    </button>
                </nav>
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
    const isOurServices = currentPage === 'our-services';

    return React.createElement('header', {
        className: 'relative z-20 w-full mb-4 border-b-2 border-slate-900 pb-6'
    }, [
        // Top Row: Logo/Title and Tagline
        React.createElement('div', {
            key: 'top-row',
            className: 'flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4'
        }, [
            React.createElement('div', {
                key: 'logo-title',
                className: 'flex items-center gap-3'
            }, [
                React.createElement('img', {
                    key: 'logo',
                    src: 'pigeon.svg',
                    alt: 'Pigeon Logo',
                    className: 'h-10 md:h-12'
                }),
                React.createElement('h1', {
                    key: 'title',
                    className: 'serif text-4xl md:text-5xl font-bold text-slate-900 tracking-tight'
                }, 'The Pigeon Way')
            ]),
            React.createElement('div', {
                key: 'tagline',
                className: 'text-left md:text-right'
            }, [
                React.createElement('div', {
                    key: 'quote',
                    className: 'text-xl md:text-2xl font-bold text-slate-900 serif italic'
                }, '"Truth. Delivered."'),
                React.createElement('div', {
                    key: 'motto',
                    className: 'text-slate-400 text-xs uppercase tracking-wider font-bold mt-1'
                }, 'One Team. One Soul.')
            ])
        ]),
        
        // Bottom Row: Page Label and Navigation
        React.createElement('div', {
            key: 'bottom-row',
            className: 'flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6'
        }, [
            React.createElement('div', {
                key: 'label',
                className: 'text-slate-500 font-medium uppercase tracking-widest text-xs md:text-sm'
            }, isOperationsSheet ? 'Intelligence Operational Sheet v 0.8' : isOpsRationale ? 'Ops Rationale' : isOurServices ? 'Our Services' : 'The Flywheel v 0.8'),
            React.createElement('nav', {
                key: 'nav',
                className: 'flex items-center gap-2 md:gap-3 text-xs flex-wrap'
            }, [
                React.createElement('a', {
                    key: 'operationssheet',
                    href: 'operations-sheet.html',
                    className: `px-3 py-1.5 rounded transition-colors ${isOperationsSheet ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}`
                }, 'Operations Sheet'),
                React.createElement('span', {
                    key: 'separator1',
                    className: 'text-slate-300'
                }, '|'),
                React.createElement('a', {
                    key: 'flywheel',
                    href: 'pigeon-way.html',
                    className: `px-3 py-1.5 rounded transition-colors ${isFlyingWheel ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}`
                }, 'The Flywheel'),
                React.createElement('span', {
                    key: 'separator2',
                    className: 'text-slate-300'
                }, '|'),
                React.createElement('a', {
                    key: 'ops',
                    href: 'ops-rationale.html',
                    className: `px-3 py-1.5 rounded transition-colors ${isOpsRationale ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}`
                }, 'Ops Rationale'),
                React.createElement('span', {
                    key: 'separator3',
                    className: 'text-slate-300'
                }, '|'),
                React.createElement('a', {
                    key: 'services',
                    href: 'our-services.html',
                    className: `px-3 py-1.5 rounded transition-colors ${isOurServices ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}`
                }, 'Our Services'),
                React.createElement('span', {
                    key: 'separator4',
                    className: 'text-slate-300'
                }, '|'),
                React.createElement('button', {
                    key: 'logout',
                    onClick: () => handleLogout(),
                    className: 'px-3 py-1.5 rounded transition-colors text-slate-600 hover:bg-slate-100 cursor-pointer border-0 bg-transparent',
                    title: 'Logout'
                }, 'Logout')
            ])
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

