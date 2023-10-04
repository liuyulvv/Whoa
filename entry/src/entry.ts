const modules = ['./WhoaEvent.js', './Bundle.js', './Babylon.js'];

modules.forEach(async (module) => {
    await import(module);
});
