import SectionHeader from "@/components/SctionHeader/SectionHeader"
import ShiftHandoverCards from "@/components/ShiftHandoverRport/ShiftHandoverRport"
import React from 'react'

const AttendencePage = () => {
  return (
    <div className="pb-4">
      <SectionHeader title="Attendence and Shift Handover" />
      <ShiftHandoverCards/>
    </div>
  )
}

export default AttendencePage