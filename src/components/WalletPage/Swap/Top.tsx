import { ArrowLeft } from 'lucide-react'
import { ActionType } from '../actions'
import { ReactNode } from 'react'

export interface TokenSwapProps {
  setCurrent: (action: ActionType | null) => void
  children: ReactNode
}

export const Top = ({ setCurrent, children }: TokenSwapProps) => {
  return (
    <div className="flex items-center mb-6">
      <button
        onClick={() => setCurrent(null)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        <ArrowLeft size={24} />
      </button>
      <h1 className="text-3xl font-bold ml-4 text-gray-800 dark:text-white">
        {children}
      </h1>
    </div>
  )
}
