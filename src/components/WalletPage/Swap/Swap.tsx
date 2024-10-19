import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ArrowUpDown } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { ActionType } from '../actions'
import { Bottom } from './Bottom'
import { tokens, TokensType } from './token'
import { Top } from './Top'

interface TokenSwapProps {
  setCurrent: (action: ActionType | null) => void
}

export default function TokenSwap({ setCurrent }: TokenSwapProps) {
  const [payToken, setPayToken] = useState(tokens[0])
  const [receiveToken, setReceiveToken] = useState(tokens[1])
  const [payAmount, setPayAmount] = useState('')
  const [receiveAmount, setReceiveAmount] = useState('')
  const [fetchingQuote, setFetchingQuote] = useState(false)

  useEffect(() => {
    if (!payAmount || !/^\d*\.?\d*$/.test(payAmount)) {
      setReceiveAmount('')
      return
    }
    setFetchingQuote(true)

    const fetchQuote = async () => {
      try {
        const res = await axios.get(
          `https://quote-api.jup.ag/v6/quote?inputMint=${payToken.mint}&outputMint=${receiveToken.mint}&amount=${Number(payAmount) * 10 ** payToken.decimals}&slippageBps=50`,
        )

        const outputAmount =
          Number(res.data.outAmount) / 10 ** receiveToken.decimals
        setReceiveAmount(outputAmount.toString())
      } catch (error) {
        console.error('Error fetching swap price:', error)
        setReceiveAmount('')
      } finally {
        setFetchingQuote(false)
      }
    }

    const debounceFetch = setTimeout(fetchQuote, 500) // Debounce for 500ms
    return () => clearTimeout(debounceFetch) // Clean up previous timeout if the amount changes
  }, [payAmount, payToken, receiveToken])

  const handleSwap = () => {
    setPayToken(receiveToken)
    setReceiveToken(payToken)
    setPayAmount(receiveAmount)
    setReceiveAmount(payAmount)
  }

  const selectTokenValue = (value: TokensType) => {
    const newToken = tokens.find((t) => t.symbol === value)
    if (newToken && newToken !== receiveToken) setPayToken(newToken)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      className="w-full mx-auto space-y-6 bg-white  shadow-xl  rounded-lg dark:bg-gray-800 p-6"
    >
      <Top setCurrent={setCurrent}>Swap tokens</Top>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="space-y-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            You Pay:
          </label>
          <div className="flex items-center space-x-2">
            <Select
              value={payToken.symbol}
              onValueChange={(value: TokensType) => {
                const newToken = tokens.find((t) => t.symbol === value)
                if (newToken && newToken !== receiveToken) setPayToken(newToken)
              }}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-700">
                {tokens.map((token) => (
                  <SelectItem
                    key={token.symbol}
                    value={token.symbol}
                    disabled={token === receiveToken}
                  >
                    <div className="flex gap-3">
                      <Image
                        height={20}
                        width={20}
                        alt={token.name}
                        src={
                          token.icon ||
                          'https://solana.com/_next/static/media/solanaLogoMark.17260911.svg'
                        }
                      />
                      <span>{token.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              min={0}
              type="text"
              placeholder="0.00"
              value={payAmount}
              onChange={(e) => {
                if (/^\d*\.?\d*$/.test(e.target.value)) {
                  setPayAmount(e.target.value)
                }
              }}
              className="flex-grow text-right"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
            Current Balance: 0 {payToken.symbol}
          </p>
        </motion.div>

        <div className="flex justify-center">
          <Button variant="outline" size="icon" onClick={handleSwap}>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            You Receive:
          </label>
          <div className="flex items-center space-x-2">
            <Select
              value={receiveToken.symbol}
              onValueChange={selectTokenValue}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-700">
                {tokens.map((token) => (
                  <SelectItem
                    key={token.symbol}
                    value={token.symbol}
                    disabled={token === payToken}
                  >
                    <div className="flex gap-3">
                      <Image
                        height={20}
                        width={20}
                        alt={token.name}
                        src={token.icon || ''}
                      />
                      <span>{token.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="border-2 w-full rounded-lg h-10 flex justify-center items-center">
              {!fetchingQuote && (
                <Input
                  type="text"
                  placeholder="0.00"
                  value={receiveAmount}
                  className="flex-grow text-right"
                  readOnly
                />
              )}
              <span>
                {fetchingQuote && (
                  <ThreeDots
                    visible={true}
                    height="30"
                    width="30"
                    color="#A9A9A9"
                    radius="9"
                    ariaLabel="three-dots-loading"
                  />
                )}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
            Current Balance: 0 {receiveToken.symbol}
          </p>
        </motion.div>
      </motion.div>
      <Bottom fetchingQuote={fetchingQuote} receiveAmount={receiveAmount} />
    </motion.div>
  )
}
