const PuppeteerAfterPlugin = require("./plugins/puppeteer-after");
const fs = require("node:fs");
const path = require("path");
const generatePdfs = require("./utils/puppeteer-pdf");
const generateOgImages = require("./utils/puppeteer-og-image");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addPlugin(PuppeteerAfterPlugin, {
    func: async ({ baseUrl, browserPage }) => {
      const outputDir = eleventyConfig.dir.output;

      const pdfsToGenerate = await fs.promises
        .readFile(path.join(outputDir, "/tmp/post-pdf-data.json"))
        .then(JSON.parse);

      await generatePdfs({
        pdfsToGenerate,
        baseUrl,
        outputDir,
        browserPage,
      });

      const imagesToGenerate = await fs.promises
        .readFile(path.join(outputDir, "/tmp/og-image-data.json"))
        .then(JSON.parse);

      await generateOgImages({
        imagesToGenerate,
        baseUrl,
        outputDir,
        browserPage,
      });

      await fs.promises.rm(path.join(outputDir, "tmp"), { recursive: true });

      // delete the tmp folder
    },
  });

  return {
    dir: {
      input: "11ty-input",
      output: "11ty-output",
    },
  };
};
