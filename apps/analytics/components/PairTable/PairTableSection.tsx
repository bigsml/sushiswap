import { Network } from '@sushiswap/ui'
import { FC, ReactNode } from 'react'

import { ENABLED_NETWORKS } from '../../config'
import { usePoolFilters } from '../PairsProvider'
import { PairTable } from './PairTable'

interface PairTableSection {
  children?: ReactNode
}

export const PairTableSection: FC<PairTableSection> = () => {
  const { selectedNetworks, setFilters } = usePoolFilters()

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-slate-50 font-semibold">Markets</h4>
      <Network.Selector
        networks={ENABLED_NETWORKS}
        selectedNetworks={selectedNetworks}
        onChange={(selectedNetworks) => setFilters({ selectedNetworks })}
      />
      <PairTable />
    </div>
  )
}
