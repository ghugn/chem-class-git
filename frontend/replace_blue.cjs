const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.jsx') || file.endsWith('.js')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('d:/Downloads/antigravity_prj/chem_class/frontend/src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Logos / Gradients
    content = content.replace(/bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent/g, 'text-gray-900 dark:text-white');
    content = content.replace(/bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900\/20 dark:to-indigo-900\/20/g, 'bg-gray-50 dark:bg-gray-800');

    // Backgrounds
    content = content.replace(/bg-blue-50(?!0)/g, 'bg-gray-100');
    content = content.replace(/dark:bg-blue-500\/10(?!0)/g, 'dark:bg-gray-800');
    content = content.replace(/dark:bg-blue-900\/50(?!0)/g, 'dark:bg-gray-800');
    content = content.replace(/bg-blue-100/g, 'bg-gray-200');
    content = content.replace(/bg-blue-600/g, 'bg-gray-900');
    content = content.replace(/hover:bg-blue-700/g, 'hover:bg-black');
    content = content.replace(/hover:bg-blue-200/g, 'hover:bg-gray-300');
    content = content.replace(/dark:hover:bg-blue-500\/20/g, 'dark:hover:bg-gray-700');
    content = content.replace(/bg-blue-500\/10/g, 'bg-gray-100');
    content = content.replace(/bg-blue-500\/20/g, 'bg-gray-200');
    content = content.replace(/dark:bg-blue-500(?![\/\d])/g, 'dark:bg-gray-200');
    content = content.replace(/dark:bg-blue-[1-9]00\/[0-9]+/g, 'dark:bg-gray-800');

    // Text
    content = content.replace(/text-blue-600/g, 'text-gray-900');
    content = content.replace(/text-blue-700/g, 'text-gray-900');
    content = content.replace(/text-blue-800/g, 'text-black');
    content = content.replace(/dark:text-blue-400/g, 'dark:text-gray-100');
    content = content.replace(/dark:text-blue-300/g, 'dark:text-gray-300');

    // Borders
    content = content.replace(/border-blue-100/g, 'border-gray-200');
    content = content.replace(/border-blue-500/g, 'border-gray-900');
    content = content.replace(/border-blue-600/g, 'border-gray-900');
    content = content.replace(/dark:border-blue-400/g, 'dark:border-gray-500');
    content = content.replace(/dark:border-blue-800/g, 'dark:border-gray-700');

    // Rings
    content = content.replace(/focus:ring-blue-500/g, 'focus:ring-gray-900 dark:focus:ring-gray-100');
    content = content.replace(/dark:ring-blue-600/g, 'dark:ring-gray-100');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated', file);
    }
});
