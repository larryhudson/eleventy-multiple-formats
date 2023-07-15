const fs = require("node:fs");
const path = require("node:path");

async function generatePdfs({
  pdfsToGenerate,
  baseUrl,
  outputDir,
  browserPage,
}) {
  for (const pdfPage of pdfsToGenerate) {
    const outputPath = path.join(outputDir, pdfPage.outputUrl);

    await browserPage.goto(baseUrl + pdfPage.inputUrl);
    console.log("[eleventy-plugin-afterpuppet] Writing pdf", outputPath);
    await browserPage.pdf({
      path: outputPath,
    });
  }
}

module.exports = generatePdfs;
