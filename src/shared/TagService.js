import db from 'baqend'

let _tags = []
let _loaded = false

export default {
  get: () => {
    if (_loaded) {
      return Promise.resolve(_tags)
    }
    return db.Tag.find().resultList().then((tags) => {
      _tags = tags
      _loaded = true
      return tags
    })
  },
  getForPost: (post) => {
    let tags = []

    _tags.forEach((tag) => {
      if (post.tags.indexOf(tag.id) > -1) {
        tags.push(tag)
      }
    })

    return tags
  },
  delete: (tag) => {
    const index = _tags.indexOf(tag)

    return tag.delete().then(() => {
        _tags.splice(index, 1)

        return _tags
    })
  },
  create: (tagData) => {
    let tag = new db.Tag(tagData)

    return tag
      .save({refresh: true})
      .then((tag) => {
        _tags.push(tag)

        return _tags
      })
  },
  update: (tag, formData) => {
    const index = _tags.indexOf(tag)
    Object.assign(_tags[index], formData)

    return _tags[index]
      .save({refresh: true})
      .then((tag) => {
        _tags[index] = tag

        return _tags
      })
  }
}
