let AppData = {
  tags: [],
  getTagsForPost: (post) => {
    let tags = []

    this.tags.forEach((tag) => {
      if (post.tags.indexOf(tag.id) > -1) {
        tags.push(tag)
      }
    })

    return tags
  }
}

export default AppData
