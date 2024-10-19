'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpDown, DollarSign } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import SolIcon from '../../icons/solana.png'

const COINGECKO_API_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'

interface AssetPrice {
  [key: string]: {
    usd: number
  }
}

export default function LinkTransfer({
  setType,
}: {
  setType: (e: any) => void
}) {
  const [amount, setAmount] = useState('0')
  const [asset, setAsset] = useState('SOL')
  const [isUSD, setIsUSD] = useState(true)
  const [assetPrice, setAssetPrice] = useState<AssetPrice | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchAssetPrice = useCallback(async () => {
    try {
      const response = await fetch(COINGECKO_API_URL)
      if (!response.ok) {
        throw new Error('Failed to fetch asset price')
      }
      const data: AssetPrice = await response.json()
      setAssetPrice(data)
      setIsLoading(false)
    } catch (err) {
      console.log(`Failed to fetch asset price. Please try again later.`)
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAssetPrice()
  }, [fetchAssetPrice])

  const handleCreateLink = () => {
    console.log(`Creating link for ${amount} ${isUSD ? 'USD' : asset}`)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) setAmount(value)
  }

  const toggleCurrency = useCallback(() => {
    if (!amount || !assetPrice) return

    setIsUSD((prev) => !prev)
    setAmount((prevAmount) => {
      const numAmount = parseFloat(prevAmount)
      const price = assetPrice.solana.usd
      return isUSD
        ? (numAmount / price).toFixed(4)
        : (numAmount * price).toFixed(2)
    })
  }, [amount, assetPrice, isUSD])

  const getEquivalentAmount = useMemo(() => {
    if (!amount || !assetPrice) return '~$0.00'

    const numAmount = parseFloat(amount)
    const price = assetPrice.solana.usd
    return isUSD
      ? `~${(numAmount / price).toFixed(4)} ${asset}`
      : `~$${(numAmount * price).toFixed(2)} USD`
  }, [amount, assetPrice, isUSD, asset])

  const quickSelectAmounts = isUSD ? ['1', '2', '5'] : ['0.01', '0.02', '0.05']

  if (isLoading) {
    return <div>Loading...</div>
  }

  // if (error) {
  //   return <div>{error}</div>
  // }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-none shadow-lg"
    >
      <button
        onClick={setType}
        className="text-gray-600 dark:text-gray-300 flex items-center gap-2 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <div>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
          Create & Send
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Specify asset and amount to send (taken from your wallet balance):
        </p>
      </div>

      <Select onValueChange={setAsset} defaultValue={asset}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select asset" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="SOL" className="bg-white dark:bg-black">
            <div className="flex items-center gap-2">
              <Image src={SolIcon} height={30} width={30} alt="SOL icon" />
              <span>SOL</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your available {asset}: 0.00 {asset}
        </p>

        <div className="relative mt-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {isUSD && <DollarSign className="h-5 w-5 text-gray-400" />}
          </div>
          <Input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="text-3xl font-semibold pl-10 pr-20 py-6"
          />
          <span className="absolute right-12 top-1/2 -translate-y-1/2 text-lg text-gray-400">
            {isUSD ? 'USD' : asset}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={toggleCurrency}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-right text-gray-500 dark:text-gray-400 mt-1">
          {getEquivalentAmount}
        </p>
      </div>

      <div className="flex justify-between gap-2 mt-4">
        {quickSelectAmounts.map((quickAmount) => (
          <Button
            key={quickAmount}
            variant="outline"
            onClick={() => setAmount(quickAmount)}
            className="flex-1"
          >
            {isUSD ? '$' : ''}
            {quickAmount}
          </Button>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="ghost" onClick={setType}>
          Cancel
        </Button>
        <Button onClick={handleCreateLink}>Create new TipLink</Button>
      </div>
    </motion.div>
  )
}
