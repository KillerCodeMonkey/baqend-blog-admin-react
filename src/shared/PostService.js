import { db } from 'baqend'

export default {
  create: (formData, tags) => {
    let post = new db.Post()

    Object.assign(post, formData)
    post.tags = tags

    return post.save({ refresh: true })
  },
  getAll: () => {
    return db.Post
      .find()
      .resultList()
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
    let deleteTasks = [
      post.delete()
    ]

    if (post.preview_image) {
      deleteTasks.push(post.preview_image.delete())
    }

    post.images.forEach((image) => {
      deleteTasks.push(image.delete())
    })

    return deleteTasks
  },
  uploadPreviewImage: (post, formFile) => {
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
      })
  },
  deletePreview: (post) => {
    return post
      .preview_image
      .delete()
      .then(() => {
        post.preview_image = null

        return post.save()
      })
  },
  uploadImage: (post, formFile) => {
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
  },
  deleteImage: (post, image) => {
    return image
      .delete()
      .then(() => {
        const index = post.images.indexOf(image)
        post.images.splice(index, 1)

        return post.save()
      })
  },
  update: (post, formData, tags) => {
    formData.publishedAt = formData.publishedAt ? new Date(formData.publishedAt) : null
    Object.assign(post, formData)
    post.tags = tags

    return post.update()
  }
}
