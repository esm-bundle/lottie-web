const modules = [
  "lottie",
  "lottie_canvas_worker",
  "lottie_canvas",
  "lottie_html",
  "lottie_light_canvas",
  "lottie_light_html",
  "lottie_light",
  "lottie_svg",
];

modules.forEach((moduleName) => {
  describe(`@esm-bundle/esm/${moduleName}`, () => {
    it("can load the ESM bundle", () => {
      return import(`/base/esm/${moduleName}.js`);
    });

    it("can load the System.register bundle", () => {
      return System.import(`/base/system/${moduleName}.js`);
    });
  });
});
