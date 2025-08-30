import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state,action) => {
  switch(action.type) {
    case "SET_NOTIFICATION":
      return action.payload
    case "BLANK_NOTIFICATION":
      return "Notifications will appear here"
    default:
      return ""
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification,notificationDispatch] = useReducer(notificationReducer,"Notifications will appear here")

  return (
    <NotificationContext.Provider value={[notification,notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext

export const useNotificationValue = () => {
  const counterAndDispatch = useContext(NotificationContext)
  return counterAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const counterAndDispatch = useContext(NotificationContext)
  return counterAndDispatch[1]
}