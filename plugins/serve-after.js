const nodeStaticServer = require("node-static");
const http = require("http");

module.exports = function (eleventyConfig, suppliedOptions) {
  const defaultOptions = {
    outputDir: eleventyConfig.dir.output,
    serverPort: 8190,
    callbackFunction: () => {},
  };

  const options = Object.assign({}, defaultOptions, suppliedOptions);

  const { callbackFunction, serverPort, outputDir } = options;

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

    const serverUrl = `http://localhost:${serverPort}`;

    await callbackFunction({
      serverUrl,
    });

    httpServer.close();
  });
};
