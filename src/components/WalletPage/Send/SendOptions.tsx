import { motion } from 'framer-motion'
import { ArrowLeft, ChevronRight, Wallet, Wand2 } from 'lucide-react'
import { ActionType } from '../actions'

interface SendOptionsProps {
  setTypeOfSend: (type: 'tiplink' | 'wallet') => void
  setCurrent: (action: ActionType | null) => void
}

function SendOptions({ setTypeOfSend, setCurrent }: SendOptionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      <div className="flex items-center mb-6">
        <button
          onClick={() => setCurrent(null)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold ml-4 text-gray-800 dark:text-white">
          Send
        </h1>
      </div>

      <p className="text-lg text-gray-600 dark:text-gray-300">
        Send assets to a new TipLink or to a Solana wallet address:
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <SendOption
          icon={Wand2}
          title="Send via new TipLink"
          description="Create a new TipLink using assets from this wallet."
          onClick={() => setTypeOfSend('tiplink')}
        />
        <div className="h-px bg-gray-200 dark:bg-gray-700" />
        <SendOption
          icon={Wallet}
          title="Send to Solana wallet address"
          description="Send assets to a Solana wallet address you specify."
          onClick={() => setTypeOfSend('wallet')}
        />
      </div>

      <button
        onClick={() => setCurrent(null)}
        className="w-full py-3 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        Cancel
      </button>
    </motion.div>
  )
}

interface SendOptionProps {
  icon: React.ElementType
  title: string
  description: string
  onClick: () => void
}

function SendOption({
  icon: Icon,
  title,
  description,
  onClick,
}: SendOptionProps) {
  return (
    <motion.button
      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
      className="w-full flex items-center justify-between p-6 text-left transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
      <ChevronRight className="h-6 w-6 text-gray-400 dark:text-gray-500" />
    </motion.button>
  )
}

export default SendOptions
