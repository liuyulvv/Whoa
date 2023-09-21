const modules = ['./event.js', './bundle.js', './babylon.js', './interaction.js'];

async function load() {
    for (const module of modules) {
        await import(module);
    }
}

await load();

export {};
