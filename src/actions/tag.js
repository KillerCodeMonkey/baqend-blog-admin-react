import { db } from 'baqend'

import { isLoading, isNotLoading } from './loading'

export const TAG_CREATED = 'TAG_CREATED'
function tagCreated(tag) {
  return {
    type: TAG_CREATED,
    tag
  }
}
export function createTag(formData) {
  return (dispatch, getState) => {
    let tag = new db.Tag(formData)

    dispatch(isLoading())

    return tag
      .save({refresh: true})
      .then(tag => {
        dispatch(isNotLoading())
        dispatch(tagCreated(tag))

        return tag
      })
      .catch(() => dispatch(isNotLoading()))
  }
}

export const TAG_DELETED = 'TAG_DELETED'
function tagDeleted(tag) {
  return {
    type: TAG_DELETED,
    tag
  }
}
export function deleteTag(tag) {
  return (dispatch, getState) => {
    dispatch(isLoading())

    return tag.delete()
      .then(() => {
        dispatch(isNotLoading())
        dispatch(tagDeleted(tag))

        return
      })
      .catch(() => dispatch(isNotLoading()))
  }
}

export const TAG_UPDATED = 'TAG_UPDATED'
function tagUpdated(tag) {
  return {
    type: TAG_UPDATED,
    tag
  }
}
export function updateTag(tag, formData) {
  return (dispatch, getState) => {
    Object.assign(tag, formData)

    dispatch(isLoading())

    return tag
      .save({refresh: true})
      .then((tag) => {
        dispatch(isNotLoading())
        dispatch(tagUpdated(tag))

        return tag
      })
      .catch(() => dispatch(isNotLoading()))
  }
}

export const TAGS_FETCHED = 'TAGS_FETCHED'
function tagsFetched(tags) {
  return {
    type: TAGS_FETCHED,
    tags
  }
}
export function fetchTags() {
  return (dispatch, getState) => {
    dispatch(isLoading())

    return db.Tag
      .find()
      .resultList()
      .then(tags => {
        dispatch(isNotLoading())
        dispatch(tagsFetched(tags))

        return tags
      })
      .catch(() => dispatch(isNotLoading()))
  }
}
