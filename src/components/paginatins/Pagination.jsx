import { Button } from "../ui/button";


const Pagination = ({currentPage,lastPage,isFetching,setPage}) => {
  const goToPage = (p) => {
    const safe = Math.min(Math.max(1, p), lastPage);
    setPage(safe);
  };
  return (
    <div className="flex flex-wrap items-center  gap-3 pb-4">
      <div className="text-sm">
        Page {currentPage} of {lastPage} {isFetching ? "• Updating..." : ""}
      </div>
      <div className="flex items-center gap-2">
        <Button
          className={"bg-main-green text-main-gold disabled:bg-main-green/50"}
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
        >
          First
        </Button>
        <Button
          className={"bg-main-green text-main-gold disabled:bg-main-green/50"}
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <Button
          className={"bg-main-green text-main-gold disabled:bg-main-green/50"}
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === lastPage}
        >
          Next
        </Button>

        <Button
          className={"bg-main-green text-main-gold disabled:bg-main-green/50"}
          onClick={() => goToPage(lastPage)}
          disabled={currentPage === lastPage}
        >
          Last
        </Button>
      </div>
    </div>
  )
}

export default Pagination