import { Bookmark, BookmarkCheck } from "lucide-react";

const BookmarkToggle = ({setPage, setShowBookmarked ,showBookmarked}) => {
  return (
    <div>
      <button
      title="bookmark"
        onClick={() => {
          setShowBookmarked((prev) => !prev);
          setPage(1);
        }}
      >
        {showBookmarked ? <BookmarkCheck size={18}/> : <Bookmark  size={18}/>}
      </button>
    </div>
  );
}

export default BookmarkToggle