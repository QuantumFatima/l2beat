import Image from 'next/image'
import AssetRiskLogo from './_assets/asset-risk-logo.svg?url'
import { AddressForm } from './_components/address-form'

export default function AssetsRiskPage() {
  return (
    <main className="md:pt-6 md:pr-6 flex bg-[#E6E7EC] flex-col justify-between pt-4 pr-4 min-h-screen">
      <div className="flex flex-col rounded-t-xl flex-1 min-h-[calc(100vh-120px)] px-5 bg-white dark:bg-zinc-900 justify-center items-center">
        <div className="flex flex-col gap-14 items-center w-[min(77vw,400px)] min-w-[260px]">
          <Image
            src={AssetRiskLogo}
            alt="Asset risks Logo"
            width={360}
            height={180}
            className="w-full"
          />
          <AddressForm />
        </div>
      </div>
    </main>
  )
}
