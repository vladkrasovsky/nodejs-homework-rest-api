const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require('nanoid')

const CONTACTS_PATH = path.join(__dirname, 'contacts.json')

const writeContacts = async contacts => {
  await fs.writeFile(CONTACTS_PATH, JSON.stringify(contacts, null, 2))
}

/**
 * Gets contacts list from collection
 * @returns {Promise} Fulfills with contacts list
 */
const listContacts = async () => {
  const data = await fs.readFile(CONTACTS_PATH)
  return JSON.parse(data)
}

/**
 * Gets single contact from collection
 * @param {String} contactId Contact ID
 * @returns {Promise} Fulfills with the single contact data
 */
const getContactById = async contactId => {
  const contacts = await listContacts()
  const result = contacts.find(({ id }) => String(id) === String(contactId))
  return result || null
}

/**
 * Adds new single contact to collection
 * @param {Object} body Contact data
 * @returns {Promise} Fulfills with the single contact data
 */
const addContact = async body => {
  const contacts = await listContacts()
  const newContact = {
    id: nanoid(),
    ...body,
  }
  contacts.push(newContact)
  await writeContacts(contacts)
  return newContact
}

/**
 * Updates single contact by ID
 * @param {String} contactId Contact ID
 * @param {Object} body Contact data
 * @returns {Promise} Fulfills with the single contact data
 */
const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(({ id }) => String(id) === String(contactId))
  if (index === -1) {
    return null
  }
  contacts[index] = { id: contactId, ...body }
  await writeContacts(contacts)
  return contacts[index]
}

/**
 * Removes single contact from collection
 * @param {String} contactId Contact ID
 * @returns {Promise} Fulfills with the Contact ID
 */
const removeContact = async contactId => {
  const contacts = await listContacts()
  const index = contacts.findIndex(({ id }) => String(id) === String(contactId))
  if (index === -1) {
    return null
  }
  const [result] = contacts.splice(index, 1)
  await writeContacts(contacts)
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
