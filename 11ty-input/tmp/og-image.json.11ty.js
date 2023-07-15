class OgImageData {
  data() {
    return {
      permalink: "/tmp/og-image-data.json",
    };
  }

  render(data) {
    const ogImageData = data.collections.generateOgImage.map((page) => {
      return {
        inputUrl: "/tmp/og-image-content" + page.url,
        outputUrl: page.url + "og-image.jpg",
      };
    });

    return JSON.stringify(ogImageData, null, 2);
  }
}

module.exports = OgImageData;
