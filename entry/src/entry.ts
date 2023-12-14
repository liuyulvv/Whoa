const modules = ['./WhoaMath.js', './WhoaEvent.js', './WhoaUI.js', './WhoaFramework.js', './WhoaGeneral.js'];

async function load() {
    for (const module of modules) {
        await import(module);
    }
}

await load();

export {};
