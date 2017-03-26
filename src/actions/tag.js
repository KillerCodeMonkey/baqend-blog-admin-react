import { db } from 'baqend'

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

    return tag
      .save({refresh: true})
      .then(tag => dispatch(tagCreated(tag)))
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
    return tag.delete().then(() => dispatch(tagDeleted(tag)))
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

    return tag
      .save({refresh: true})
      .then((tag) => dispatch(tagUpdated(tag)))
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
    return db.Tag.find().resultList().then(tags => dispatch(tagsFetched(tags)))
  }
}
