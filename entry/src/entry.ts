const modules = [
    './WhoaEvent.js',
    './WhoaFramework.js',
    './WhoaUI.js',
    './Whoa3D.js',
    './WhoaGeometry.js',
    './WhoaInteraction.js'
];

async function load() {
    for (const module of modules) {
        await import(module);
    }
}

await load();

export {};
