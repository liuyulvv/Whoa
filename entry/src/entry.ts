const modules = ['./WhoaFoundation.js', './WhoaUI.js', './WhoaFramework.js', './WhoaGeometry.js', './WhoaGeneral.js'];

async function Load() {
    for (const module of modules) {
        await import(module);
    }
}

await Load();

export {};
