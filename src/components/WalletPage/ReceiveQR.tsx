'use client'
import { Check, Copy, Info } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { WalletDetailProps } from './WalletDetail'

export const ReceiveQR = ({
  wallet,
  onClose,
}: WalletDetailProps & { onClose: () => void }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(wallet ?? 'no wallet address')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  //shows the public key in short like main tiplink
  const formattedWallet = useMemo(() => {
    console.log('Formatting wallet')
    if (wallet) {
      return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`
    }
    return 'no wallet address'
  }, [wallet])

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <DialogTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Your Wallet Address
        </DialogTitle>

        <div className="flex flex-col items-center gap-4 mt-4">
          <QRCodeSVG value={wallet ?? 'no wallet address found'} size={180} />
        </div>

        <div
          className="flex items-center justify-evenly bg-gray-100 dark:bg-gray-700 shadow-md shadow-gray-200 dark:shadow-gray-900 p-2 cursor-pointer rounded-md w-full mt-4"
          onClick={handleCopy}
        >
          <p className="font-mono text-gray-700 dark:text-gray-300 break-words">
            {formattedWallet}
          </p>
          <div className="relative">
            <button className="bg-blue-500 dark:bg-blue-600 text-white p-2 rounded-full hover:bg-blue-600 dark:hover:bg-blue-500 transition duration-300">
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
            {copied && (
              <div className="absolute top-full left-0 mt-1 bg-gray-800 text-white text-xs py-1 px-2 rounded-md">
                Copied!
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 flex gap-1 justify-center w-full">
          <Info />
          <i className="mt-1">
            Only send crypto to this address via the Solana network.
          </i>
        </p>
      </DialogContent>
    </Dialog>
  )
}
