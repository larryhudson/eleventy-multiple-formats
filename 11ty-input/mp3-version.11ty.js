// this would render the MP3 based on the post's templateContent

class PostMp3 {
  data() {
    return {
      pagination: {
        data: "collections.generateMp3",
        size: 1,
        alias: "currentPage",
      },
      permalink: (data) => {
        return data.currentPage.url + "mp3.mp3";
      },
    };
  }

  render(data) {
    const content = data.currentPage.templateContent;
    return "test...";
  }
}

module.exports = PostMp3;
