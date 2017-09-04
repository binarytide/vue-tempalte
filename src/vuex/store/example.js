// import Parse from 'parse'

// initial state
const state = {
  annotations: [] //  ,
  // layerAnnotationsInstance: Parse.Object.extend('LayerAnnotations')
}

// mutations
const mutations = {
  ADD_ANNOTATION_TO_LIST (state, payload) {
    state.annotations.push(payload)
  },
  SET_ANNOTATION_LIST (state, payload) {
    state.annotations = payload
  }
}

const getters = {
  annotations: state => state.annotations,
  layerAnnotationsInstance: state => state.layerAnnotationsInstance
}

const actions = {
  deleteAnnotation ({dispatch, commit}, payload) {
    payload.destroy({
      success (payload) {
        // The object was deleted from the Parse Cloud.
      },
      error (payload, error) {
        // The delete failed.
        // error is a Parse.Error with an error code and message.
      }
    })
  },
  // getAnnotations: function ({dispatch, commit}, payload) {
  //   var LayerAnnotations = Parse.Object.extend('LayerAnnotations')
  //   var query = new Parse.Query(LayerAnnotations)
  //   query.equalTo('layer', payload)
  //   query.find({
  //     success: function (results) {
  //       commit('SET_ANNOTATION_LIST', results)
  //     },
  //     error: function (error) {
  //       console.log('Error: ' + error.code + ' ' + error.message)
  //     }
  //   })
  // },
  setAnnotation: function ({dispatch, commit}, payload) {
    console.log('payload test ' + payload.id)
    var newItem = true
    if (payload.id) { newItem = false }
    payload.save(null, {
      success: function (annotation) {
        if (newItem) {
          commit('ADD_ANNOTATION_TO_LIST', annotation)
        }
      },
      error: function (annotation, error) {
        console.log('Failed to create new object, with error code: ' + error.message)
      }
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
