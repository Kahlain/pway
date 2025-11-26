/**
 * Operations Sheet V2 Data Mapper
 * Transforms stages-data.json structure to match React component format
 */

/**
 * Map department names to pillar IDs
 */
function mapDeptToPillar(deptName) {
    const mapping = {
        'Account Management': 'account_mgmt',
        'Finance': 'finance',
        'Finance and Admin': 'finance',
        'Financial Health': 'finance',
        'People': 'hr',
        'Talent & Culture': 'hr',
        'HR (People)': 'hr',
        'IT & Ops': 'it',
        'Tech & Security': 'it',
        'IT': 'it',
        'Marketing': 'marketing',
        'CEO Office': 'ceo',
        'Legal': 'legal'
    };
    return mapping[deptName] || null;
}

/**
 * Map process status from JSON to React format
 */
function mapProcessStatus(status) {
    const mapping = {
        'new': 'NEW',
        'active': 'ACTIVE',
        'todo': 'TODO',
        'merge': 'MERGE' // Merge status should remain as MERGE to show red badge
    };
    return mapping[status] || 'ACTIVE';
}

/**
 * Convert percentage string to number
 */
function parseHealthPercentage(target) {
    if (typeof target === 'string') {
        return parseInt(target.replace('%', ''), 10);
    }
    return target || 0;
}

/**
 * Transform a single stage from JSON format to React component format
 */
function transformStage(stageJson) {
    // Map people
    const people = {
        role: stageJson.people.experts || '',
        sub: stageJson.people.coordinators || ''
    };

    // Map processes
    const process = (stageJson.processes || []).map(p => ({
        name: p.name,
        status: mapProcessStatus(p.status)
    }));

    // Map TDR to aiData
    const aiData = stageJson.tdr ? {
        rule: stageJson.tdr.rule || '',
        docs: stageJson.tdr.documentation || [],
        implication: stageJson.tdr.aiImplication || ''
    } : {
        rule: '',
        docs: [],
        implication: ''
    };

    // Map health percentage
    const health = parseHealthPercentage(stageJson.tdr?.target || '0%');

    // Map backProcess to requiredSupport, gateway, and activePillars
    // The JSON has backProcess, but the design needs requiredSupport format
    const requiredSupport = [];
    const gateway = {};
    const activePillars = [];
    
    // Convert backProcess items to requiredSupport format for gateway section
    // Include all items that map to known pillars (including Account Management)
    (stageJson.backProcess || []).forEach(item => {
        const pillarId = mapDeptToPillar(item.title);
        if (pillarId && pillarId !== 'legal' && pillarId !== 'ceo') { // Legal and CEO Office are always on, not stage-specific
            if (!activePillars.includes(pillarId)) {
                activePillars.push(pillarId);
            }
            
            // Extract task name from description (first part before comma or colon, or use title)
            let taskName = item.title;
            let taskDesc = item.desc;
            
            // Try to extract a shorter task name from description
            const descParts = item.desc.split(/[,:]/);
            if (descParts.length > 0 && descParts[0].trim().length < 30) {
                taskName = descParts[0].trim();
                taskDesc = descParts.slice(1).join(',').trim() || item.desc;
            }
            
            // Create requiredSupport entry for gateway section
            requiredSupport.push({
                dept: item.title,
                task: taskName,
                desc: taskDesc
            });
            
            // Create gateway entry for pillar highlighting
            gateway[pillarId] = `${taskName}: ${taskDesc}`;
        }
    });

    return {
        id: stageJson.step,
        name: stageJson.title,
        tagline: stageJson.promise,
        description: stageJson.description || '',
        color: stageJson.color,
        textColor: stageJson.textColor || 'white',
        engine: stageJson.engine || '',
        health: health,
        people: people,
        process: process,
        aiData: aiData,
        requiredSupport: requiredSupport, // Converted from backProcess for gateway section
        gateway: gateway,
        activePillars: activePillars
    };
}

/**
 * Transform entire stages data from JSON to React format
 */
function transformStagesData(jsonData) {
    if (!jsonData || !jsonData.stages) {
        console.error('Invalid JSON data structure');
        return [];
    }

    return jsonData.stages.map(transformStage);
}

/**
 * Load and transform stages data from JSON file
 */
async function loadAndTransformStagesData() {
    try {
        const response = await fetch('data/stages-data.json?v=' + Date.now());
        const jsonData = await response.json();
        return transformStagesData(jsonData);
    } catch (error) {
        console.error('Error loading stages data:', error);
        return [];
    }
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.transformStagesData = transformStagesData;
    window.loadAndTransformStagesData = loadAndTransformStagesData;
}

