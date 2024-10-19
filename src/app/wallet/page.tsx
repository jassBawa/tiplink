import { getServerSession } from 'next-auth'
import LeftSideBar from '../../components/WalletPage/LeftSideBar'
import RightSideBar from '../../components/WalletPage/RightSideBar'
import TopBar from '../../components/WalletPage/TopBar'
import WalletDetail from '@/components/WalletPage/WalletDetail'
import { createWallet, fetchUserBalance } from '@/services/walletService'
import prisma from '@/db'
const Wallet = async () => {
  const session = await getServerSession()

  let wallet, balance

  if (session) {
    const email = session.user?.email ?? undefined
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    if (user) {
      wallet = user?.publicKey ? user.publicKey : await createWallet(user)
      balance = await fetchUserBalance(wallet)
      console.log(balance)
    }
  }

  return (
    <div className="h-full flex flex-col items-center bg-white dark:bg-[#181819] ">
      <TopBar />
      <div className="flex justify-between grow w-full transition-colors">
        <div className="hidden sm:block min-w-1/5 border-r dark:border-slate-500">
          <LeftSideBar />
        </div>
        <div className="flex justify-center items-center w-full py-12 bg-slate-100 dark:bg-[#11151d]">
          <WalletDetail
            wallet={wallet}
            usdbalance={Number(balance?.usdBalance)}
            solbalance={Number(balance?.solBalance)}
          />
        </div>
        <div className=" hidden md:block">{/* <RightSideBar /> */}</div>
      </div>
    </div>
  )
}

export default Wallet
