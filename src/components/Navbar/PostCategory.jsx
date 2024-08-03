
const PostCategory = ({ fetchedCategories, filterByCategoryBtnHandler }) => {
 

    return (
      <div className="flex flex-wrap gap-2 mb-10">
        {/* All Articles Category */}
        <button
          className="h-10 inline-flex items-center justify-center w-full sm:w-auto text-center py-3 px-4 rounded-full bg-white border border-gray-200 text-sm font-semibold hover:bg-gray-50 focus:ring focus:ring-teal-600 transition duration-200"
          onClick={() => filterByCategoryBtnHandler(null)}
        >
          All Articles
        </button>
        {/* Dynamic Categories */}
        {fetchedCategories?.allCategories?.map((category) => (
          <button
            key={category?._id}
            className="h-10 inline-flex items-center justify-center w-full sm:w-auto text-center py-3 px-4 rounded-full bg-white border border-gray-200 text-sm font-semibold hover:bg-gray-50 focus:ring focus:ring-teal-600 transition duration-200"
            onClick={() => filterByCategoryBtnHandler(category._id)}
          >
            {category?.categoryName} 
          </button>
        ))}
      </div>
    );
  };
  
  export default PostCategory;