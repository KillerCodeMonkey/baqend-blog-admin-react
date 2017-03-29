import { db } from 'baqend'

import { isLoading, isNotLoading } from './loading'

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

    dispatch(isLoading())

    return post.save({ refresh: true })
      .then(post => {
        dispatch(isNotLoading())
        dispatch(postCreated(post))

        return post
      })
      .catch(() => dispatch(isNotLoading()))
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

    dispatch(isLoading())

    return db.Post
      .find()
      .resultList()
      .then(posts => {
        dispatch(isNotLoading())
        dispatch(postsFetched(posts))

        return posts
      })
      .catch(() => dispatch(isNotLoading()))
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
    if (post.images) {
      post.images.forEach((image) => {
        deleteTasks.push(image.delete())
      })
    }

    dispatch(isLoading())

    return Promise.all(deleteTasks)
      .then(() => {
        dispatch(isNotLoading())
        dispatch(postDeleted(post))

        return post
      })
      .catch(() => dispatch(isNotLoading()))
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

    dispatch(isLoading())

    return post
      .preview_image
      .delete()
      .then(() => {
        post.preview_image = null

        return post.save()
      })
      .then(post => {
        dispatch(isNotLoading())
        dispatch(postPreviewImageDeleted(post))

        return post
      })
      .catch(() => dispatch(isNotLoading()))
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

    dispatch(isLoading())

    return file
      .upload()
      .then((file) => {
        //upload succeed successfully
        post.preview_image = file

        return post.save()
      })
      .then(post => {
        dispatch(isNotLoading())
        dispatch(postPreviewImageUploaded(post))

        return post
      })
      .catch(() => dispatch(isNotLoading()))
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

    dispatch(isLoading())

    return image
      .delete()
      .then(() => {
        const index = post.images.indexOf(image)
        post.images.splice(index, 1)

        return post.save()
      })
      .then(post => {
        dispatch(isNotLoading())
        dispatch(postImageDeleted(post))

        return post
      })
      .catch(() => dispatch(isNotLoading()))
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

    dispatch(isLoading())

    return file
      .upload()
      .then((file) => {
        // upload succeed successfully
        post.images.push(file)

        return post.save()
      })
      .then(post => {
        dispatch(isNotLoading())
        dispatch(postImageUploaded(post))

        return post
      })
      .catch(() => dispatch(isNotLoading()))
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

    dispatch(isLoading())

    return db.Post
      .find()
      .equal('slug', slug)
      .singleResult()
      .then(post => {
        if (!post.images) {
          post.images = new db.List()
        }

        dispatch(isNotLoading())
        dispatch(postFetched(post))

        return post
      })
      .catch(() => dispatch(isNotLoading()))
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
    Object.assign(post, formData, {
      publishedAt: formData.publishedAt ? new Date(formData.publishedAt) : formData.publishedAt === '' ? null : post.publishedAt
    })
    post.tags = tags

    dispatch(isLoading())

    return post.save({refresh: true})
      .then(updated_post => {
        dispatch(isNotLoading())
        dispatch(postUpdated(updated_post))

        return updated_post
      })
      .catch(() => dispatch(isNotLoading()))
  }
}
