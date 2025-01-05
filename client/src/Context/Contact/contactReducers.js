import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACT,
  CLEAR_FILTER,
} from '../types'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      }
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      }

      case FILTER_CONTACT:
        return {
          ...state,
          filtered: state.contacts.filter((contact) => {
            const regex = new RegExp(`${action.payload.searchTerm}`, 'gi')
            
            // Check for matching name/email or blood group
            const matchesSearchTerm =
              contact.name.match(regex) || contact.email.match(regex)
      
            const matchesBloodGroup =
              action.payload.bloodGroup ? contact.bloodGroup === action.payload.bloodGroup : true
      
            // Return the contact if it matches either the search term or blood group
            return matchesSearchTerm && matchesBloodGroup
          }),
        }
      

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      }

    default:
      return state
  }
}
