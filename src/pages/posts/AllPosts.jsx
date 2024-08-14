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
  ArrowLeft01Icon
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

  return (
    <>
      <article className="relative flex w-full flex-col xl:mx-auto pt-10">
        <div
          className="flex w-full flex-col xl:mx-auto"
          style={{
            "--num-cards": 3,
            "--post-gap": "16px",
          }}
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
            <div className="grid mt-8 gap-8 grid-cols-auto-fit-minmax gap-x-8">
              {data?.allPosts?.map((post) => {
                return <PostCard key={post?.Id} post={post} />;
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
      <div></div>
      {/* Modal for post details */}

      <button
        className="btn bg-white text-black"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_4" className="modal">
        {/* <div className="modal-box flex max-w-full flex-col items-center border-gray-600 bg-color shadow-2 focus:outline-none md:border md:bg-color h-full w-full md:h-auto md:rounded-2xl md:w-[40.75rem] lg:mt-16 lg:mb-10 lg:mx-auto !bg-color  lg:h-auto lg:overflow-hidden"> */}

        {/* header */}
        <div className="flex flex-row items-center gap-2 fixed z-[76] ml-0 w-full border border-gray-600 bg-background-subtle px-6 py-4 max-w-full lg:left-[unset] top-0 lg:w-[40.75rem] opacity-100">
          <form method="dialog" className="w-full">
            {/* if there is a button in form, it will close the modal */}
            {/*  */}
            <div className="flex w-full">
              <div className="flex items-center mr-auto">
                <Button className="w-10 h-10 p-0 text-slate-400 hover:text-white bg-transparent hover:bg-gray-700 rounded-xl">
                  <ArrowLeft01Icon className="w-7 h-7 pointer-events-none"/>
                </Button>
              </div>
              <div className="flex-1"></div>
              <div className="flex ml-auto items-center">
                <Button className="w-10 h-10 p-0 text-slate-400 hover:text-white bg-transparent hover:bg-gray-700 rounded-xl">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-7 h-7 pointer-events-none"
                  >
                    <path
                      d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z"
                      fill="currentcolor"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/*Content Start */}
        <div className="modal-box flex flex-col flex-1 px-4 lg:px-8 border border-gray-600 max-lg:min-w-full max-lg:min-h-full max-w-full flex-col border-gray-600 bg-color shadow-2 focus:outline-none md:border md:bg-color h-full w-full md:h-auto md:rounded-2xl md:w-[40.75rem] lg:mt-16 max-lg:mt-24 lg:mb-10 lg:mx-auto !bg-color  lg:h-auto">
          {/* <form method="dialog">
            <div className="flex">
            <div className="flex-1"></div>
              <div className="flex ml-auto items-center">
                <Button className="w-10 h-10 p-0 text-slate-400 hover:text-white bg-transparent hover:bg-gray-700 rounded-xl">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"	
                    class="w-7 h-7 pointer-events-none"
                  >
                    <path
                      d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z"
                      fill="currentcolor"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </div>
            </div>
          </form> */}
          {/* discription */}
          <div className="relative mb-6 text-slate-300 border-l border-purple-500 pl-4">
            <div className="overflow-hidden">
              <p className="select-text break-words text-lg">
                <span className="pr-1 font-bold text-purple-500">TLDR</span>
                Discover 20 essential browser extensions for web developers in
                2024, including ColorZilla, WhatFont, Wappalyzer, and more.
                Explore extensions for getting information from other websites,
                developing and testing projects, and improving productivity.
              </p>
            </div>
          </div>
          {/* category */}
          <div className="relative flex flex-1">
            <div className="rounded-lg border mt-4 bg-background-subtle border-slate-500 py-3 px-2 h-4 flex items-center justify-center text-xs font-bold text-slate-400 my-2">
              #Category
            </div>
          </div>
          {/* Date of post */}
          <div className="flex items-center mb-2">
            <span className="text-slate-400 text-sm max-w-full shrink truncate">
              1min read time
            </span>
            <span className="mx-1 text-gray-400">•</span>
            <div className="text-gray-400 text-xs">June 2024</div>
          </div>
          {/* Thumbnail */}
          <div className="mb-10 block rounded-2xl">
            <div className="relative overflow-hidden">
              <div className="pt-[49%] -z-[1]"></div>
              <img
                src="https://res.cloudinary.com/daily-now/image/upload/s--l0DV-tnN--/f_auto/v1722747797/posts/8wL1eXI5s"
                alt=""
                className="absolute block inset-0 w-full h-full m-auto object-cover"
              />
            </div>
          </div>
          {/* #Likes and comments */}
          <div className="mb-5 flex items-center gap-x-4 text-slate-400 text-sm">
            <span>23 likes</span>
            <span>10 comments</span>
          </div>
          {/* Buttons for activities */}
          <div className="flex items-center rounded-2xl border border-gray-600">
            <div className="flex flex-row gap-2 hover:border-border-subtlest-tertiary relative max-h-cardLarge h-full p-2 rounded-2xl bg-background-subtle border border-gray-600 hover:border-gray-500">
              <div className="flex flex-row items-stretch select-none">
                <Button className="w-10 h-10 p-0 text-slate-400 bg-transparent hover:text-green-400 hover:bg-green-950 rounded-xl">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-7 h-7 pointer-events-none"
                  >
                    <path
                      d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z"
                      fill="currentcolor"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </div>

              <div className="flex flex-row items-stretch select-none">
                <Button className="w-10 h-10 p-0 text-slate-400 bg-transparent hover:text-red-500 hover:bg-red-950 rounded-xl">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-7 h-7 pointer-events-none rotate-180"
                  >
                    <path
                      d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z"
                      fill="currentcolor"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </div>
            </div>
            {/* comment and view */}
            <div className="flex flex-1 items-center justify-start gap-6 px-4 py-2 text-slate-400">
              <div className="flex flex-row items-stretch select-none hover:text-cyan-400">
                <Button
                  id="comment post"
                  className="w-10 h-10 p-0 text-slate-400 bg-transparent hover:text-cyan-400 hover:bg-cyan-950 rounded-xl"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-7 h-7 pointer-events-none"
                  >
                    <path
                      d="M8.084 3.217a35.447 35.447 0 017.05-.078l.782.078.279.031c1.089.121 1.885.372 2.606.828a4.516 4.516 0 011.664 1.86c.336.69.5 1.423.53 2.361l.005.321v3.975a4.493 4.493 0 01-3.545 4.392l-.207.04-2.089.346-2.86 2.992-.147.135c-.986.789-2.399.623-3.205-.324-.532-.625-.616-1.34-.51-2.29l.029-.224.038-.254.033-.187-1.332-.189a5.011 5.011 0 01-1.677-.55l-.253-.146-.243-.16a4.777 4.777 0 01-1.491-1.721 4.935 4.935 0 01-.532-1.972l-.009-.3V8.618c0-1.096.162-1.915.535-2.683.375-.77.94-1.4 1.664-1.859.649-.41 1.359-.655 2.288-.788l.318-.04.28-.031zm7.666 1.491a33.948 33.948 0 00-6.752-.075l-.748.075-.28.031c-.915.102-1.481.297-1.97.606a3.016 3.016 0 00-1.116 1.247c-.228.468-.357.989-.38 1.76l-.004.266v3.563c0 .577.134 1.116.375 1.587.242.471.592.874 1.024 1.18.37.263.801.453 1.276.554l.242.043 1.98.283c.339.048.457.096.575.175.119.078.262.187.27.386l-.002.024-.013.08-.164.741-.064.333c-.111.63-.167 1.332.09 1.634.263.309.7.39 1.037.187l.089-.062 2.998-3.135.13-.101.092-.063.077-.04.08-.03.035-.01.087-.02L17 15.545a2.993 2.993 0 002.495-2.77l.005-.182V8.618c0-.921-.13-1.506-.384-2.026A3.016 3.016 0 0018 5.345c-.44-.278-.943-.464-1.706-.572l-.265-.034-.279-.03zm-.55 6.294l.093.005c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005c-.398-.044-.707-.36-.707-.745 0-.38.301-.694.691-.744l.109-.007h6.4zm0-3.5l.093.004c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005C8.309 8.953 8 8.637 8 8.252c0-.38.301-.694.691-.744l.109-.007h6.4z"
                      fill="currentcolor"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </Button>
                <label
                  htmlFor="comment post"
                  className="cursor-pointer items-center font-bold text-sm ml-1 hidden lg:flex"
                >
                  Comment
                </label>
              </div>

              {/* Views */}
              <div className="flex flex-row items-stretch select-none hover:text-orange-400">
                <Button
                  id="view post"
                  className="w-10 h-10 p-0 text-slate-400 bg-transparent hover:text-orange-400 hover:bg-orange-950 rounded-xl"
                >
                  <EyeIcon className="w-6 h-6 pointer-events-none" />
                </Button>
                <label
                  htmlFor="view post"
                  className="cursor-pointer items-center font-bold text-sm ml-1 hidden lg:flex"
                >
                  View
                </label>
              </div>
            </div>
            {/* Follow and Unfollow */}
            <div className="flex flex-row items-stretch select-none">
              {follow ? (
                <Button className="rounded-xl mr-2 bg-transparent border border-white text-white">
                  Following
                </Button>
              ) : (
                <Button variant="outline" className="rounded-xl mr-2">
                  Follow
                </Button>
              )}
            </div>
          </div>
          {/* End of activities */}

          {/* form for comment */}
          <form className="w-full items-center gap-4 rounded-2xl border-t border-gray-600 bg-blur-highlight p-3 text-sm hover:border-slate-400 hover:bg-gray-700 md:border md:bg-surface-float mt-6 flex">
            {/* Avatar for logged in user*/}
            <img
              src="https://res-console.cloudinary.com/dkc0j221n/thumbnails/v1/image/upload/v1718528996/c29jaWFsX2Jsb2dfYXBwL3VpZmQ1c2N5Zm5qd3I2M2loNTNt/drilldown"
              alt=""
              className="object-cover w-10 h-10 rounded-lg hidden md:flex"
            />
            <textarea
              className="flex-1 h-full border-none bg-transparent placeholder:text-slate-400 outline-none text-white m-4"
              rows="1"
              placeholder="Share your comment"
            ></textarea>
            <Button className="rounded-xl bg-transparent border border-white text-white">
              Post
            </Button>
          </form>

          {/* comment card */}
          <div className="mb-12 mt-6 flex flex-col gap-4">
            <section className="flex scroll-mt-16 flex-col items-stretch rounded-3xl border-gray-600 border">
              <article className="flex flex-col rounded-3xl p-4 hover:bg-surface-hover focus:outline border-gray-600 hover:bg-gray-700">
                <header className="z-1 flex w-full flex-row self-start">
                  <img
                    src="https://avatars.githubusercontent.com/u/48529975?v=4"
                    alt=""
                    className="object-cover w-10 h-10 rounded-lg"
                  />
                  <div className="ml-3 flex min-w-0 flex-1 flex-col text-sm text-white font-semibold justify-end">
                    <span>Liam Armstrong</span>
                  </div>
                </header>
                <div className="break-words-overflow z-1 mt-3 text-sm">
                  <p className="text-white">
                    Would love some feedback and your thoughts on that, so, feel
                    free to reach out!
                  </p>
                </div>
              </article>
            </section>
          </div>
        </div>
        {/* End */}

        {/* </div> */}
      </dialog>
    </>
  );
};
export default AllPosts;
