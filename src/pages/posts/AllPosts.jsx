import { useQuery } from "@tanstack/react-query";
import { allPostsAPI, deletePostAPI } from "../../API/posts/postAPIs";
import { allCatgegoryAPI } from "../../API/categories/categoryAPIs";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../../components/ui/button";
import PostCategory from "../../components/navbar/PostCategory";
import {
  SwimmingIcon,
  LockKeyIcon,
  UserIcon,
  EyeIcon,
  Cancel01Icon,
  Cancel02Icon,
  CancelSquareIcon,
  ArrowLeft01Icon,
} from "hugeicons-react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "../../components/ui/badge";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import { useState } from "react";
import SearchAndFilter from "../../components/posts/SearchAndFilter";
import Pagination from "./Pagination";
import truncateString from "../../lib/truncateString";
import PostCard from "../../components/posts/PostCard";
import PostDetailModal from "./PostDetailModal";

const AllPosts = () => {
  //Some filter states
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const { data, isPending, isError, error, isSuccess, refetch } = useQuery({
    queryKey: ["all-posts", { ...filters, page }],
    queryFn: () =>
      allPostsAPI({ ...filters, page, title: searchTerm, limit: 9 }),
  });

  // Filter by category handler using buttons
  const filterByCategoryBtnHandler = (categoryId) => {
    setFilters({ ...filters, category: categoryId });
    setPage(1);
    refetch();
  };

  // Filter by category handler using search field
  const filterByCategoryInputHandler = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
    refetch();
  };

  //Sumbit handler for Filter by category using search field
  const SubmitHandlerFilterByCategoryInput = (e) => {
    e.preventDefault();
    setFilters({ ...filters, title: searchTerm });
    setPage(1);
    refetch();
  };

  //Handler for clear search filter
  const clearFilterHandler = (e) => {
    // e.preventDefault();
    setFilters({});
    setSearchTerm("");
    setPage(1);
    refetch();
  };

  //Handler for pagination
  const paginationHandler = (pageNumber) => {
    setPage(pageNumber);
    refetch();
  };

  const fetchedCategories = useQuery({
    queryKey: ["all-categories"],
    queryFn: allCatgegoryAPI,
  });

  const deleteMutation = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: deletePostAPI,
  });

  const deleteHandler = (postId) => {
    deleteMutation
      .mutateAsync(postId)
      .then(() => {
        refetch();
      })
      .catch((err) => console.log(err));
  };

  // return (
  //   <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-12 lg:pb-16">
  //     <div class="mx-auto max-w-2xl lg:mx-0">
  //       <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-6">
  //         From the blog
  //       </h2>
  //       <p class="mt-2 text-xl leading-8 text-gray-600">
  //         Learn how to grow your business with our expert advice.
  //       </p>
  //     </div>
  //     {/* Filtering with button */}
  //     <PostCategory
  //       fetchedCategories={fetchedCategories?.data}
  //       filterByCategoryBtnHandler={filterByCategoryBtnHandler}
  //     />

  //     <SearchAndFilter
  //       SubmitHandlerFilterByCategoryInput={SubmitHandlerFilterByCategoryInput}
  //       filterByCategoryInputHandler={filterByCategoryInputHandler}
  //       searchTerm={searchTerm}
  //       clearFilterHandler={clearFilterHandler}
  //     />
  //     {/* Alert Messages */}
  //     {data?.allPosts.length < 1 && (<h3 className="text-xl font-bold text-center mt-4 text-gray-900">
  //         Post not found
  //       </h3>)}
  //     {isPending && (
  //       <LoadingAlert loading="Loading" loadingMsg="Please wait..." />
  //     )}
  //     {isError && <DangerAlert error="Error" errorMsg={error?.message} />}
  //     <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
  //       {data?.allPosts.map((post) => (
  //         <Card
  //           key={post?._id}
  //           className="flex flex-col justify-between cursor-pointer"
  //           onClick={() => navigate(`/details/${post?._id}`)}
  //         >
  //           <CardHeader className="p-0">
  //             <div className="relative" style={{ height: 240 }}>
  //               <div className="absolute top-0 left-0 z-10"></div>
  //               <div className="absolute bottom-0 right-0 z-10"></div>
  //               <img
  //                 src={post?.image?.path}
  //                 alt={post?.image?.filename}
  //                 className="absolute inset-0 w-full h-full object-cover rounded-tr-xl rounded-tl-xl"
  //               />
  //             </div>
  //           </CardHeader>
  //           <CardContent>
  //             <div
  //               className="pt-6"
  //               dangerouslySetInnerHTML={{ __html: truncateString(post?.description, 150) }}
  //             />
  //           </CardContent>
  //           <CardFooter className="flex items-center justify-between">
  //             <small>
  //               {formatDistanceToNow(new Date(post?.createdAt))} ago
  //             </small>
  //             <Badge variant="secondary">{post?.category?.categoryName}</Badge>
  //           </CardFooter>
  //         </Card>
  //         // <button onClick={() => navigate(`/update/${post?._id}`)}>Edit</button>
  //         // <button onClick={() => deleteHandler(post?._id)}>Delete</button>
  //       ))}
  //     {/* Pagination */}
  //     </div>
  //       <Pagination page={page} data={data} paginationHandler={paginationHandler}/>
  //   </div>

  // )

  const follow = true;
// ! Write a media query of phone, tablet, laptop and desktop for cards display different from tailwind
  return (
    <article className="relative flex w-full flex-col xl:mx-auto pt-10 px-4 min-h-full">
      <div
        className="flex w-full flex-col xl:mx-auto"
        // style={{
        //   "--num-cards": 3,
        //   "--post-gap": "16px",
        // }}
      >
        <div className="relative mx-auto w-full post-template post-cards">
          {/* Search and filter */}
          <span className="flex flex-1 items-center lg:items-start flex-col-reverse">
            <SearchAndFilter
              SubmitHandlerFilterByCategoryInput={
                SubmitHandlerFilterByCategoryInput
              }
              filterByCategoryInputHandler={filterByCategoryInputHandler}
              searchTerm={searchTerm}
              clearFilterHandler={clearFilterHandler}
            />
          </span>
          {/* posts container */}
          <div className="grid mt-8 gap-8 grid-cols-auto-fit-minmax !gap-x-8">
            {data?.allPosts?.map((post) => {
              return <PostCard key={post?._id} post={post} />;
            })}
          </div>
        </div>
      </div>
      {/* Pagination */}
      <Pagination
        page={page}
        data={data}
        paginationHandler={paginationHandler}
      />
    </article>
  );
};
export default AllPosts;
