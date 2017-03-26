import { db } from 'baqend'

let _posts = []
let _loaded = false

export default {
  create: (formData, tags) => {
    let post = new db.Post()

    Object.assign(post, formData)
    post.tags = tags

    return post.save({ refresh: true })
  },
  getAll: () => {
    if (_loaded) {
      return Promise.resolve(_posts)
    }

    return db.Post
      .find()
      .resultList()
      .then(posts => {
        _posts = posts
        _loaded = true

        return posts
      })
  },
  getBySlug: (slug) => {
    return db.Post
      .find()
      .equal('slug', slug)
      .singleResult()
      .then(post => {
        if (!post.images) {
          post.images = new db.List()
        }

        return post
      })
  },
  delete: (post) => {
    const index = _posts.indexOf(post)
    let deleteTasks = [
      post.delete()
    ]

    if (post.preview_image) {
      deleteTasks.push(post.preview_image.delete())
    }

    post.images.forEach((image) => {
      deleteTasks.push(image.delete())
    })

    return Promise.all(deleteTasks).then(() => {
      if (_loaded) {
        _posts.splice(index, 1)
      }
    })
  },
  uploadPreviewImage: (post, formFile) => {
    const index = _posts.indexOf(post)

    const file = new db.File({
      data: formFile,
      parent: '/www/images/posts/' + post.key
    })

    return file
      .upload()
      .then((file) => {
        //upload succeed successfully
        post.preview_image = file

        return post.save()
      }).then(post => {
        if (_loaded) {
          _posts[index] = post
        }

        return post
      })
  },
  deletePreview: (post) => {
    const index = _posts.indexOf(post)

    return post
      .preview_image
      .delete()
      .then(() => {
        post.preview_image = null

        return post.save()
      })
      .then(post => {
        if (_loaded) {
          _posts[index] = post
        }

        return post
      })
  },
  uploadImage: (post, formFile) => {
    const index = _posts.indexOf(post)
    const file = new db.File({
      data: formFile,
      parent: '/www/images/posts/' + post.key
    })

    return file
      .upload()
      .then((file) => {
        //upload succeed successfully
        post.images.push(file)

        return post.save()
      })
      .then(post => {
        if (_loaded) {
          _posts[index] = post
        }

        return post
      })
  },
  deleteImage: (post, image) => {
    const index = _posts.indexOf(post)

    return image
      .delete()
      .then(() => {
        const index = post.images.indexOf(image)
        post.images.splice(index, 1)

        return post.save()
      })
      .then(post => {
        if (_loaded) {
          _posts[index] = post
        }

        return post
      })
  },
  update: (post, formData, tags) => {
    const index = _posts.indexOf(post)

    formData.publishedAt = formData.publishedAt ? new Date(formData.publishedAt) : null
    Object.assign(post, formData)
    post.tags = tags

    return post.save({refresh: true}).then(post => {
      if (_loaded) {
        _posts[index] = post
      }

      return post
    })
  }
}
