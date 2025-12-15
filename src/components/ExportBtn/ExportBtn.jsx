import { Button } from "../ui/button"
import { BsFileEarmarkSpreadsheet } from "react-icons/bs"
const ExportBtn = () => {
  return (
    <Button className="flex items-center gap-2 bg-main-green text-main-gold h-12! hover:bg-main-green/80">
      <BsFileEarmarkSpreadsheet />
      Export
    </Button>
  )
}

export default ExportBtn