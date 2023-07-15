// this would write a JSON file with data to pass to the 'eleventy.after' event

class PostPdfData {
  data() {
    return {
      permalink: "/tmp/post-pdf-data.json",
    };
  }

  render(data) {
    const pdfData = data.collections.generatePdf.map((page) => {
      return {
        inputUrl: page.url,
        outputUrl: page.url + "pdf.pdf",
      };
    });

    return JSON.stringify(pdfData, null, 2);
  }
}

module.exports = PostPdfData;
