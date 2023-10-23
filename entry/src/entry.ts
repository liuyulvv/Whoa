const modules = ['./WhoaEvent.js', './WhoaUI.js', './WhoaGeometry.js', './WhoaFramework.js'];

async function load() {
    for (const module of modules) {
        await import(module);
    }
}

await load();

export {};
