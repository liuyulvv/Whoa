const modules = ['./WhoaEvent.js', './WhoaUI.js', './Babylon.js'];

modules.forEach(async (module) => {
    await import(module);
});
