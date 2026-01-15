import DailySettlementRport from '@/components/DailySettlementRport/DailySettlementRport'
import SectionHeader from '@/components/SctionHeader/SectionHeader'
import React from 'react'

const DailySettlementPage = () => {
  return (
    <div>
      <SectionHeader title="Daily Settlement" />
      <DailySettlementRport/>
    </div>
  )
}

export default DailySettlementPage