const modules = ['./WhoaEvent.js', "./WhoaFramework.js", './WhoaUI.js', './Whoa3D.js'];

modules.forEach(async (module) => {
    await import(module);
});
