import { db } from 'baqend'

export const POST_CREATED = 'POST_CREATED'
function postCreated(post) {
  return {
    type: POST_CREATED,
    post
  }
}
export function createPost(formData, tags) {
  return (dispatch, getState) => {
    let post = new db.Post()

    Object.assign(post, formData)
    post.tags = tags

    return post.save({ refresh: true }).then(post => dispatch(postCreated(post)))
  }
}

export const POSTS_FETCHED = 'POSTS_FETCHED'
function postsFetched(posts) {
  return {
    type: POSTS_FETCHED,
    posts
  }
}
export function fetchPosts() {
  return (dispatch, getState) => {
    return db.Post
      .find()
      .resultList()
      .then(posts => dispatch(postsFetched(posts)))
  }
}

export const POST_DELETED = 'POST_DELETED'
function postDeleted(post) {
  return {
    type: POST_DELETED,
    post
  }
}
export function deletePost(post) {
  return (dispatch, getState) => {
    let deleteTasks = [
      post.delete()
    ]

    if (post.preview_image) {
      deleteTasks.push(post.preview_image.delete())
    }

    post.images.forEach((image) => {
      deleteTasks.push(image.delete())
    })

    return Promise.all(deleteTasks).then(() => dispatch(postDeleted(post)))
  }
}

export const POST_PREVIEW_IMAGE_DELETED = 'POST_PREVIEW_IMAGE_DELETED'
function postPreviewImageDeleted(post) {
  return {
    type: POST_PREVIEW_IMAGE_DELETED,
    post
  }
}
export function deletePostPreviewImage(post) {
  return (dispatch, getState) => {
    return post
      .preview_image
      .delete()
      .then(() => {
        post.preview_image = null

        return post.save()
      })
      .then(post => dispatch(postPreviewImageDeleted(post)))
  }
}

export const POST_PREVIEW_IMAGE_UPLOADED = 'POST_PREVIEW_IMAGE_UPLOADED'
function postPreviewImageUploaded(post) {
  return {
    type: POST_PREVIEW_IMAGE_UPLOADED,
    post
  }
}
export function uploadPostPreviewImage(post, formFile) {
  return (dispatch, getState) => {
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
      }).then(post => dispatch(postPreviewImageUploaded(post)))
  }
}

export const POST_IMAGE_DELETED = 'POST_IMAGE_DELETED'
function postImageDeleted(post) {
  return {
    type: POST_IMAGE_DELETED,
    post
  }
}
export function deletePostImage(post, image) {
  return (dispatch, getState) => {
    return image
      .delete()
      .then(() => {
        const index = post.images.indexOf(image)
        post.images.splice(index, 1)

        return post.save()
      })
      .then(post => dispatch(postImageDeleted(post)))
  }
}

export const POST_IMAGE_UPLOADED = 'POST_IMAGE_UPLOADED'
function postImageUploaded(post) {
  return {
    type: POST_IMAGE_UPLOADED,
    post
  }
}
export function uploadPostImage(post, formFile) {
  return (dispatch, getState) => {
    const file = new db.File({
      data: formFile,
      parent: '/www/images/posts/' + post.key
    })

    return file
      .upload()
      .then((file) => {
        // upload succeed successfully
        post.images.push(file)

        return post.save()
      }).then(post => dispatch(postImageUploaded(post)))
  }
}

export const POST_FETCHED = 'POST_FETCHED'
function postFetched(post) {
  return {
    type: POST_FETCHED,
    post
  }
}
export function fetchPost(slug) {
  return (dispatch, getState) => {
    return db.Post
      .find()
      .equal('slug', slug)
      .singleResult()
      .then(post => {
        if (!post.images) {
          post.images = new db.List()
        }

        return dispatch(postFetched(post))
      })
  }
}

export const POST_UPDATED = 'POST_UPDATED'
function postUpdated(post) {
  return {
    type: POST_UPDATED,
    post
  }
}
export function updatePost(post, formData, tags) {
  return (dispatch, getState) => {
    formData.publishedAt = formData.publishedAt ? new Date(formData.publishedAt) : null
    Object.assign(post, formData)
    post.tags = tags

    return post.save({refresh: true}).then(post => dispatch(postUpdated(post)))
  }
}
