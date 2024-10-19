import { motion } from 'framer-motion'
import LinkTransfer from './LinkTransfer'
import WalletTransfer from './WalletTransfer'

interface SendFormProps {
  type: string
  onBack: () => void
}

function SendForm({ type, onBack }: SendFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      {type === 'wallet' && <WalletTransfer setType={onBack} />}

      {type === 'tiplink' && <LinkTransfer setType={onBack} />}
    </motion.div>
  )
}

export default SendForm
