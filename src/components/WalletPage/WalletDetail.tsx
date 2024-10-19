'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { actions, ActionType } from './actions'
import { ReceiveQR } from './ReceiveQR'
import SendToken from './Send/Send'
import TokenSwap from './Swap/Swap'

export interface WalletDetailProps {
  wallet?: string
  usdbalance?: number
  solbalance?: number
}

const WalletDetail = ({
  wallet,
  usdbalance,
  solbalance,
}: WalletDetailProps) => {
  const [currentAction, setCurrentAction] = useState<null | ActionType>(null)
  const [activeTab, setActiveTab] = useState('Token')

  const handleActionClick = (action: ActionType) => {
    setCurrentAction(action)
  }

  const handleClose = () => {
    setCurrentAction(null)
  }

  return (
    <AnimatePresence mode="wait">
      <div
        className="rounded-[22px] flex flex-col justify-center items-center gap-3 sm:w-[450px] md:w-[600px] border-2 p-7 sm:p-10 bg-white
   dark:bg-[#1d1d1d] overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.1),0_0_40px_rgba(59,130,246,0.1)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.2),0_0_50px_rgba(59,130,246,0.2)
    "
      >
        <div className="flex flex-col items-start gap-2 w-full">
          <div className="text-gray-700 dark:text-gray-300">
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-semibold">
              Total Balance
            </p>
          </div>
          <div className="text-black dark:text-gray-100 opacity-90 text-xl mb-6">
            {solbalance === null || isNaN(Number(usdbalance)) ? (
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-[46px] h-[34px] mb-6">
                {''}
              </div>
            ) : (
              <div>
                <div className="font-bold sm:text-4xl">$ {usdbalance}</div>
                <div className="sm:text-md text-gray-500 dark:text-gray-400">
                  {solbalance} SOL
                </div>
              </div>
            )}
          </div>
        </div>
        {currentAction !== 'send' && currentAction !== 'swap' && (
          <>
            <div className="">
              <div className="flex flex-col items-center w-full gap-5">
                <div className="grid grid-cols-4 gap-6 w-full">
                  {actions.map((action) => (
                    <div
                      key={action.type}
                      className="flex flex-col items-center gap-2"
                    >
                      <motion.button
                        className="flex justify-center items-center w-16 h-16 bg-black dark:bg-white rounded-2xl text-white dark:text-black shadow-lg transition-colors duration-300 ease-in-out hover:bg-indigo-600 dark:hover:bg-indigo-400"
                        onClick={() => handleActionClick(action.type)}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <action.icon size={24} />
                      </motion.button>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {action.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-700 w-full rounded-2xl p-1">
                  {['Token', 'NFTs'].map((tab) => (
                    <motion.button
                      key={tab}
                      className={`flex justify-center items-center py-3 rounded-xl w-[49%] text-lg font-semibold transition-colors duration-300 ease-in-out ${
                        activeTab === tab
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => setActiveTab(tab)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {tab}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full mt-2 text-center bg-slate-200 dark:bg-gray-800 rounded-3xl p-6 transition-colors duration-300">
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                You don&apos;t have any assets yet!
              </p>
              <p className="text-gray-500 dark:text-gray-500 mb-4">
                Start by buying or depositing funds:
              </p>
              <motion.button
                className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: '#4338CA' }}
                whileTap={{ scale: 0.95 }}
              >
                + Add Funds
              </motion.button>
            </div>
          </>
        )}

        {/*Now depends on current action render the components */}
        {currentAction === 'receive' && (
          <ReceiveQR wallet={wallet} onClose={handleClose} />
        )}
        {currentAction === 'swap' && (
          <TokenSwap setCurrent={setCurrentAction} />
        )}
        {currentAction === 'send' && (
          <SendToken setCurrent={setCurrentAction} />
        )}
      </div>
    </AnimatePresence>
  )
}
export default WalletDetail
