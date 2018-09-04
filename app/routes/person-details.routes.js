
var urlConst = require('../constants/url-constants')
var PersonDetailsHelpers = require('../helpers/person-details.helpers').PersonDetailsHelpers
var personDetailsHelpers = new PersonDetailsHelpers() 



module.exports = function(app) {
    
// console.log(db);

app.post(urlConst.VERSION_ID+urlConst.PERSON_COLLECTION_QUERY.POST_PERSON, personDetailsHelpers.create)

    // Retrieve all Notes
app.get(urlConst.VERSION_ID+urlConst.PERSON_COLLECTION_QUERY.GET_ALL_PERSONS, personDetailsHelpers.findAll)

    // // Retrieve a single Note with noteId
app.get(urlConst.VERSION_ID+urlConst.PERSON_COLLECTION_QUERY.GET_PERSON_BY_ID, personDetailsHelpers.findOne)

    // // Update a Note with noteId
app.post(urlConst.VERSION_ID+urlConst.PERSON_COLLECTION_QUERY.EDIT_PERSON_BY_ID, personDetailsHelpers.update)

    // // Delete a Note with noteId
app.post(urlConst.VERSION_ID+urlConst.PERSON_COLLECTION_QUERY.DELETE_PERSON, personDetailsHelpers.delete)

}