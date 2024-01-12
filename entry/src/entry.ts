const modules = [
    './WhoaFoundation.js',
    './WhoaUI.js',
    './WhoaKernel.js',
    './WhoaGeometry.js',
    './WhoaFramework.js',
    './WhoaHouse.js'
];

async function Load() {
    for (const module of modules) {
        await import(module);
    }
}

await Load();

export {};
