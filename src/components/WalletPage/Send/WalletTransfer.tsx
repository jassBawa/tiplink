import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpDown, DollarSign } from 'lucide-react'
import React, { useState } from 'react'
import { IoMdArrowBack } from 'react-icons/io'

const WalletTransfer = ({ setType }: { setType: (e: any) => void }) => {
  const [amount, setAmount] = useState('')
  const [address, setAddress] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`your amount: ${amount} is send to address:${address}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
    >
      <button
        onClick={() => setType(null)}
        className="text-gray-600 dark:text-gray-300 flex items-center gap-2 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <div>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
          Send to Solana wallet address
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Specify amount and the designated wallet address:
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="0 USD"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-10 pr-20 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              type="button"
              className="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md text-sm mr-2 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
            >
              Max
            </button>
            <button
              type="button"
              className="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
            >
              <ArrowUpDown size={16} />
            </button>
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter Solana wallet address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          <p className="text-gray-400 dark:text-gray-500 text-sm text-center mt-2">
            .sol and AllDomains addresses supported
          </p>
        </div>

        <div className="flex justify-between items-center w-full">
          <Button variant="ghost" type="button" onClick={() => setType(null)}>
            Cancel
          </Button>
          <Button type="submit" className="">
            Send
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

export default WalletTransfer
