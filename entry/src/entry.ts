const modules = ['./WhoaEvent.js', './WhoaUI.js', './WhoaFramework.js', './WhoaGeometry.js', './WhoaInteraction.js'];

async function load() {
    for (const module of modules) {
        await import(module);
    }
}

await load();

export {};
