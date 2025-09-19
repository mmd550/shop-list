import { createContext, useContext } from 'react'

export const UserAgentContext = createContext<string>('')

// Custom hook to use UserAgent
export const useUserAgent = () => {
  const context = useContext(UserAgentContext)
  return context
}
