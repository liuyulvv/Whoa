const modules = ['./WhoaFoundation.js', './WhoaUI.js', './WhoaFramework.js', './WhoaGeometry.js', './WhoaGeneral.js'];

async function load() {
    for (const module of modules) {
        await import(module);
    }
}

await load();

export {};
