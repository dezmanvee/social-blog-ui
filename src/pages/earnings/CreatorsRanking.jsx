import { allEarningsAPI } from "../../API/earnings/earningsAPIs";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Home03Icon, ChartIncreaseIcon, ArrowLeftDoubleIcon } from "hugeicons-react";

const CreatorsRanking = () => {
  const { data, isError, isPending, isSuccess, error } = useQuery({
    queryKey: ["creators-ranking"],
    queryFn: allEarningsAPI,
  });

  // TODO: Hint UsersList Endpoint 

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 py-6 sm:py-12">
    //   <div className="w-full sm:max-w-xl mx-auto min-h-screen ">
    //     <div className="flex flex-col justify-between h-full bg-white shadow-lg rounded-3xl overflow-hidden">
    //       <div className="px-4 py-10 sm:p-10">
    //         <div className="max-w-md mx-auto">
    //           <div className="flex items-center space-x-5 mb-6">
    //             <FaTrophy className="text-yellow-500 text-5xl" />
    //             <div className="block pl-2 font-semibold text-2xl self-start text-gray-700">
    //               <h2 className="leading-relaxed">Top Creators</h2>
    //               <p className="text-sm text-gray-500">
    //                 House of the best creators of all time.
    //               </p>
    //             </div>
    //           </div>
    //           <div className="divide-y divide-gray-200">
    //             {data?.allEarnings?.map((ranking, index) => (
    //               <div
    //                 key={index}
    //                 className="pt-6 pb-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
    //               >
    //                 <div className="flex justify-between items-center space-x-4">
    //                   <div
    //                     className={`text-lg font-bold ${
    //                       index === 0 ? "text-yellow-500" : "text-gray-500"
    //                     }`}
    //                   >
    //                     {`#${ranking.rank}`}
    //                   </div>
    //                   <div className="flex justify-center items-center gap-x-2">

    //                   {ranking.user.profilePicture ? (
    //                     <img
    //                       src={ranking.user.profilePicture}
    //                       alt="avatar"
    //                       className="w-12 h-12 rounded-full"
    //                     />
    //                   ) : (
    //                     <Avatar />
    //                   )}
    //                   <div className="text-black font-medium">
    //                     {ranking.user.username?.toUpperCase()}
    //                   </div>
    //                   </div>
    //                   <div className="text-gray-600">
    //                     {`Posts: ${ranking?.user?.posts?.length}`}
    //                   </div>
    //                   <div className="ml-auto flex items-center space-x-2">
    //                     <FaDollarSign className="text-green-500 text-xl" />
    //                     <div className="text-gray-600 font-medium">
    //                       {ranking?.totalEarnings?.toFixed(2)}
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <section className="md:p-4 lg:px-10 lg:py-5">
      <div className="mb-6 hidden justify-between lg:flex">
        <nav
          aria-label="breadcrumbs"
          className="hidden h-10 gap-0.5 items-center px-1.5 text-surface-secondary lg:flex"
        >
          <ul className="flex-1 items-center gap-0.5 lg:flex">
            <li className="flex flex-row items-center gap-0.5">
              <Link
                to="/dashboard/all-posts"
                className="h-6 w-6 p-0 rounded-8 text-white"
              >
                <Home03Icon
                  stroke-width="3.0"
                  className="w-5 h-5 pointer-events-none"
                />
              </Link>
              <span aria-hidden="true" className="text-slate-200">
                <ArrowLeftDoubleIcon className="w-4 h-4 pointer-events-none"/>
              </span>
            </li>
            <li className="flex flex-row items-center gap-1 px-2 text-white">
              <ChartIncreaseIcon
                stroke-width="3.0"
                className="w-5 h-5 pointer-events-none"
              />
              <span className="font-bold">Leaderboard</span>
            </li>
          </ul>
        </nav>
      </div>
      {/* Content */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Card For Highest earners */}
        <div className="flex flex-col border-b border-gray-700 p-4 md:rounded-lg md:border md:bg-surface-float">
          <h3 className="mb-2 font-bold text-white text-lg">Highest earner</h3>
          <ul>
            {data?.allEarnings?.map((ranking, idx) => {
              return (
                <li
                  key={idx}
                  className="flex w-full flex-row items-center rounded-sm px-2 hover:bg-accent-pepper-subtler"
                >
                  <span className="inline-flex min-w-4 text-slate-400">
                    {ranking?.user?.posts?.length}
                  </span>
                  {ranking?.rank === 1 && <span class="pl-1">🏆</span>}
                  {ranking?.rank === 2 && <span class="pl-1">🥈</span>}
                  {ranking?.rank === 3 && <span class="pl-1">🥉</span>}
                  <div className="relative flex flex-row items-center gap-4 min-w-0 flex-shrink !p-2">
                    <div className="flex min-w-0 shrink items-center no-underline">
                      <img
                        src={
                          ranking?.user?.profilePicture?.path ||
                          ranking?.user?.profilePicture ||
                          "https://github.com/shadcn.png"
                        }
                        alt=""
                        className="object-cover w-10 h-10 rounded-lg"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "https://github.com/shadcn.png";
                          e.target.onerror = null;
                        }}
                      />
                    </div>
                    <div className="ml-3 flex min-w-0 flex-1 flex-col text-sm">
                      <span className="flex flex-row">
                        <div className="w-fit font-bold text-white flex min-w-0 shrink items-center no-underline">
                          <p className="max-w-full shrink truncate">
                            {ranking?.user?.username}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className="flex items-center font-bold capitalize md:gap-0.5 md:text-sm ml-1 text-white">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-5 h-5 pointer-events-none text-purple-600"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8 13.605A5.333 5.333 0 108 2.938a5.333 5.333 0 000 10.667zm1.213-8.672a.494.494 0 00-.812-.517L4.944 7.922a.494.494 0 00.35.843H7.82l-1.034 2.844a.494.494 0 00.812.518l3.456-3.507a.494.494 0 00-.348-.842H8.179l1.034-2.845z"
                                fill="currentcolor"
                              ></path>
                            </svg>
                            $ {ranking?.totalEarnings}
                          </span>
                        </div>
                      </span>

                      <span className="items-center text-slate-400 flex flex-row">
                        <p className="flex min-w-0 shrink items-center no-underline">
                          @{ranking?.user?.username?.toLowerCase()}
                        </p>
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default CreatorsRanking;
