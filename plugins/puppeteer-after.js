const nodeStaticServer = require("node-static");
const http = require("http");
const puppeteer = require("puppeteer");

module.exports = function (eleventyConfig, suppliedOptions) {
  const defaultOptions = {
    outputDir: eleventyConfig.dir.output,
    serverPort: 8190,
    func: () => {
      throw new Error(
        "[eleventy-plugin-puppetafter] Please set func to do something with Puppeteer!"
      );
    },
  };

  const options = Object.assign({}, defaultOptions, suppliedOptions);

  const { func, serverPort, outputDir } = options;

  eleventyConfig.on("eleventy.after", async function () {
    // serve the output folder
    const fileServer = new nodeStaticServer.Server(outputDir);

    const httpServer = http.createServer(function (request, response) {
      request
        .addListener("end", function () {
          fileServer.serve(request, response);
        })
        .resume();
    });

    httpServer.listen(serverPort);

    const baseUrl = `http://localhost:${serverPort}`;

    const browser = await puppeteer.launch();
    const browserPage = await browser.newPage();

    await func({
      baseUrl,
      browserPage,
    });

    browser.close();
    httpServer.close();
  });
};
