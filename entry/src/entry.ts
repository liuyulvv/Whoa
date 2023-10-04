const modules = ['./WhoaEvent.js', './WhoaUI.js', './Whoa3D.js'];

modules.forEach(async (module) => {
    await import(module);
});
