const modules = ['./WhoaMath.js', './WhoaFoundation.js', './WhoaUI.js', './WhoaFramework.js', './WhoaGeneral.js'];

async function load() {
    for (const module of modules) {
        await import(module);
    }
}

await load();

export {};
