import { Link } from "react-router-dom";
import { ArrowRight01Icon } from "hugeicons-react";
import { Button } from "../../components/ui/button";

const Profile = () => {
  return (
    // <div className="relative mx-auto flex w-full flex-1 flex-row items-stretch pt-0 lg:max-w-[calc(100vw-17.5rem)]">
    //   {/* Left */}
    //   <div className="flex flex-col transition-transform ease-in-out md:translate-x-[unset] md:items-center md:px-6 md:pt-6  -translate-x-full absolute z-3 ml-auto h-full w-full border-l border-gray-600 bg-background-default md:relative md:w-[unset] bg-background-default">
    //     {/* small screen */}
    //     <span className="mb-6 flex w-full text-white flex-row items-center justify-between border-b border-gray-600 p-2 md:hidden">
    //       <span className="ml-4 font-bold">Account Settings</span>
    //       <Button className="h-10 w-10 p-0 rounded-lg">
    //         <svg
    //           width="1em"
    //           height="1em"
    //           viewBox="0 0 24 24"
    //           xmlns="http://www.w3.org/2000/svg"
    //           class="w-7 h-7 pointer-events-none"
    //         >
    //           <path
    //             d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z"
    //             fill="currentcolor"
    //             fill-rule="evenodd"
    //           ></path>
    //         </svg>
    //       </Button>
    //     </span>
    //     {/* aside content */}
    //     <div className="px-6 md:px-0">
    //       <Link
    //         to="/dashboard/account/profile"
    //         className="flex w-full flex-row text-slate-400 rounded-2xl md:w-64 border border-gray-600 bg-theme-active p-[0.9375rem]"
    //       >
    //         <div className="object-cover w-5 h-5 rounded-full relative overflow-hidden">
    //           <img
    //             // src={
    //             //   authUser?.profilePicture ||
    //             //   "https://github.com/shadcn.png"
    //             // }
    //             // alt={`${authUser?.username || "User"}'s profile picture`}
    //             src="https://github.com/shadcn.png"
    //             alt="File upload preview"
    //             className="absolute block inset-0 w-full h-full m-auto object-cover"
    //             loading="lazy"
    //             onError={(e) => {
    //               e.target.onerror = null; // Prevent infinite loop if fallback also fails
    //               e.target.src = "https://github.com/shadcn.png";
    //             }}
    //           />
    //         </div>
    //         <span className="ml-2 text-sm">Profile</span>
    //         <ArrowRight01Icon className="w-6 h-6 ml-auto text-white"/>
    //       </Link>
    //     </div>
    //   </div>

    //   {/* Right */}
    //   <div className="relative lg:border-r lg:border-l border-gray-600 flex flex-col w-full lg:max-w-[calc(100vw-19.75rem)] xl:max-w-[40.5rem] md:border-l flex-auto mr-auto">
    //     <h1 className="sticky font-bold text-xl py-4 px-6 border-b border-gray-600 w-full flex flex-row items-center">
    //       <Button className="h-6 w-6 p-0 rounded-lg bg-transparent text-white text-lg font-bold mr-2 flex">
    //         Profile
    //       </Button>
    //     </h1>
    //     <section className="h-full overflow-y-scroll !max-h-[calc(100dvh-12rem)] max-h-[calc(100vh-12rem)] !min-h-[calc(100dvh-12rem)] min-h-[calc(100vh-12rem)] flex flex-col p-6 w-full overflow-x-hidden">
    //       <form>
    //         <h2 className="mt-0 font-bold text-white" id="profilePicture">
    //           Profile picture
    //         </h2>
    //         <p className="mt-1 text-sm text-slate-400">
    //           Upload a picture to make your profile stand out and help others
    //           easily recognize your comments and contributions!
    //         </p>
    //         {/* picture */}
    //         <div className="relative mt-6 flex">
    //           <div className="absolute left-0 top-0 flex w-full">
    //             <div className="w-full max-w-[19.25rem]">
    //               <button
    //                 type="button"
    //                 className="group relative flex items-center justify-center overflow-hidden border border-gray-600 w-full h-24 rounded-3xl border-0 bg-background-subtle hover:bg-gray-900"
    //               >
    //                 <input
    //                   id="profilePicture"
    //                   type="file"
    //                   name="image"
    //                   accept="image/*"
    //                   // onChange={handleFileChange}
    //                   className="hidden"
    //                 />
    //                 <span className="absolute text-white hover:block">
    //                   <span className="text-theme-label-secondary ml-16 mr-3 flex flex-wrap items-center justify-center">
    //                     <svg
    //                       width="1em"
    //                       height="1em"
    //                       viewBox="0 0 24 24"
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       class="w-8 h-8 pointer-events-none"
    //                     >
    //                       <path
    //                         d="M12.833 4a4.83 4.83 0 013.781 1.823l.146.192.069.01a4.834 4.834 0 014.151 4.346l.015.223.005.218v4.046a4.833 4.833 0 01-4.171 4.788c-1.721.238-3.33.357-4.829.357-1.498 0-3.108-.12-4.829-.357a4.833 4.833 0 01-4.166-4.57L3 14.858v-4.046a4.833 4.833 0 013.956-4.753l.283-.044a4.835 4.835 0 013.454-1.992l.248-.018.226-.005h1.666zm0 1.5h-1.666a3.331 3.331 0 00-3.015 1.91c-.255.03-.514.064-.775.1a3.333 3.333 0 00-2.872 3.118l-.005.184v4.046a3.333 3.333 0 002.877 3.302 33.88 33.88 0 004.623.343 33.88 33.88 0 004.623-.343 3.333 3.333 0 002.872-3.118l.005-.184v-4.046a3.333 3.333 0 00-2.877-3.302c-.261-.036-.52-.07-.774-.099a3.335 3.335 0 00-2.807-1.905l-.209-.006zM12 9.5a3.333 3.333 0 110 6.667A3.333 3.333 0 0112 9.5zm0 1.5a1.833 1.833 0 100 3.667A1.833 1.833 0 0012 11zm5-1.333a.833.833 0 110 1.666.833.833 0 010-1.666z"
    //                         fill="currentcolor"
    //                         fill-rule="evenodd"
    //                       ></path>
    //                     </svg>
    //                     <span className="ml-1.5 font-bold text-sm">
    //                       Upload cover image
    //                     </span>
    //                   </span>
    //                 </span>
    //               </button>
    //             </div>
    //           </div>
    //           {/* image container */}
    //           <div className="relative z-1 flex w-min">
    //             <button
    //               type="button"
    //               className="group relative flex items-center justify-center overflow-hidden border-[#0E1217] w-24 h-24 rounded-3xl border-4 !border-background-default"
    //             >
    //               <input
    //                 id="profilePicture"
    //                 type="file"
    //                 name="image"
    //                 accept="image/*"
    //                 // onChange={handleFileChange}
    //                 className="hidden"
    //               />
    //               <img
    //                 // src={
    //                 //   authUser?.profilePicture ||
    //                 //   "https://github.com/shadcn.png"
    //                 // }
    //                 // alt={`${authUser?.username || "User"}'s profile picture`}
    //                 src="https://github.com/shadcn.png"
    //                 alt="File upload preview"
    //                 className="h-full w-full object-cover group-hover:opacity-50"
    //                 loading="lazy"
    //                 onError={(e) => {
    //                   e.target.onerror = null; // Prevent infinite loop if fallback also fails
    //                   e.target.src = "https://github.com/shadcn.png";
    //                 }}
    //               />
    //               <span className="text-white absolute hidden group-hover:block">
    //                 <svg
    //                   width="1em"
    //                   height="1em"
    //                   viewBox="0 0 24 24"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   class="w-8 h-8 pointer-events-none"
    //                 >
    //                   <path
    //                     d="M12.833 4a4.83 4.83 0 013.781 1.823l.146.192.069.01a4.834 4.834 0 014.151 4.346l.015.223.005.218v4.046a4.833 4.833 0 01-4.171 4.788c-1.721.238-3.33.357-4.829.357-1.498 0-3.108-.12-4.829-.357a4.833 4.833 0 01-4.166-4.57L3 14.858v-4.046a4.833 4.833 0 013.956-4.753l.283-.044a4.835 4.835 0 013.454-1.992l.248-.018.226-.005h1.666zm0 1.5h-1.666a3.331 3.331 0 00-3.015 1.91c-.255.03-.514.064-.775.1a3.333 3.333 0 00-2.872 3.118l-.005.184v4.046a3.333 3.333 0 002.877 3.302 33.88 33.88 0 004.623.343 33.88 33.88 0 004.623-.343 3.333 3.333 0 002.872-3.118l.005-.184v-4.046a3.333 3.333 0 00-2.877-3.302c-.261-.036-.52-.07-.774-.099a3.335 3.335 0 00-2.807-1.905l-.209-.006zM12 9.5a3.333 3.333 0 110 6.667A3.333 3.333 0 0112 9.5zm0 1.5a1.833 1.833 0 100 3.667A1.833 1.833 0 0012 11zm5-1.333a.833.833 0 110 1.666.833.833 0 010-1.666z"
    //                     fill="currentcolor"
    //                     fill-rule="evenodd"
    //                   ></path>
    //                 </svg>
    //               </span>
    //             </button>
    //           </div>

    //           {/* Next Addition */}

    //         </div>
    //       </form>
    //     </section>
    //     <div className="sticky flex flex-row gap-3 border-t border-gray-600 p-3">
    //       <Button variant="outline" className="font-bold h-10 px-5 rounded-xl ml-auto hover:shadow-2xl">Save changes</Button>
    //     </div>
    //   </div>
    // </div>

    <form>
      <h2 className="mt-0 font-bold text-white" id="profilePicture">
        Profile picture
      </h2>
      <p className="mt-1 text-sm text-slate-400">
        Upload a picture to make your profile stand out and help others easily
        recognize your comments and contributions!
      </p>
      {/* picture */}
      <div className="relative mt-6 flex">
        <div className="absolute left-0 top-0 flex w-full">
          <div className="w-full max-w-[19.25rem]">
            <button
              type="button"
              className="group relative flex items-center justify-center overflow-hidden border border-gray-600 w-full h-24 rounded-3xl border-0 bg-background-subtle hover:bg-gray-900"
            >
              <input
                id="profilePicture"
                type="file"
                name="image"
                accept="image/*"
                // onChange={handleFileChange}
                className="hidden"
              />
              <span className="absolute text-white hover:block">
                <span className="text-theme-label-secondary ml-16 mr-3 flex flex-wrap items-center justify-center">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-8 h-8 pointer-events-none"
                  >
                    <path
                      d="M12.833 4a4.83 4.83 0 013.781 1.823l.146.192.069.01a4.834 4.834 0 014.151 4.346l.015.223.005.218v4.046a4.833 4.833 0 01-4.171 4.788c-1.721.238-3.33.357-4.829.357-1.498 0-3.108-.12-4.829-.357a4.833 4.833 0 01-4.166-4.57L3 14.858v-4.046a4.833 4.833 0 013.956-4.753l.283-.044a4.835 4.835 0 013.454-1.992l.248-.018.226-.005h1.666zm0 1.5h-1.666a3.331 3.331 0 00-3.015 1.91c-.255.03-.514.064-.775.1a3.333 3.333 0 00-2.872 3.118l-.005.184v4.046a3.333 3.333 0 002.877 3.302 33.88 33.88 0 004.623.343 33.88 33.88 0 004.623-.343 3.333 3.333 0 002.872-3.118l.005-.184v-4.046a3.333 3.333 0 00-2.877-3.302c-.261-.036-.52-.07-.774-.099a3.335 3.335 0 00-2.807-1.905l-.209-.006zM12 9.5a3.333 3.333 0 110 6.667A3.333 3.333 0 0112 9.5zm0 1.5a1.833 1.833 0 100 3.667A1.833 1.833 0 0012 11zm5-1.333a.833.833 0 110 1.666.833.833 0 010-1.666z"
                      fill="currentcolor"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-1.5 font-bold text-sm">
                    Upload cover image
                  </span>
                </span>
              </span>
            </button>
          </div>
        </div>
        {/* image container */}
        <div className="relative z-1 flex w-min">
          <button
            type="button"
            className="group relative flex items-center justify-center overflow-hidden border-[#0E1217] w-24 h-24 rounded-3xl border-4 !border-background-default"
          >
            <input
              id="profilePicture"
              type="file"
              name="image"
              accept="image/*"
              // onChange={handleFileChange}
              className="hidden"
            />
            <img
              // src={
              //   authUser?.profilePicture ||
              //   "https://github.com/shadcn.png"
              // }
              // alt={`${authUser?.username || "User"}'s profile picture`}
              src="https://github.com/shadcn.png"
              alt="File upload preview"
              className="h-full w-full object-cover group-hover:opacity-50"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop if fallback also fails
                e.target.src = "https://github.com/shadcn.png";
              }}
            />
            <span className="text-white absolute hidden group-hover:block">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8 pointer-events-none"
              >
                <path
                  d="M12.833 4a4.83 4.83 0 013.781 1.823l.146.192.069.01a4.834 4.834 0 014.151 4.346l.015.223.005.218v4.046a4.833 4.833 0 01-4.171 4.788c-1.721.238-3.33.357-4.829.357-1.498 0-3.108-.12-4.829-.357a4.833 4.833 0 01-4.166-4.57L3 14.858v-4.046a4.833 4.833 0 013.956-4.753l.283-.044a4.835 4.835 0 013.454-1.992l.248-.018.226-.005h1.666zm0 1.5h-1.666a3.331 3.331 0 00-3.015 1.91c-.255.03-.514.064-.775.1a3.333 3.333 0 00-2.872 3.118l-.005.184v4.046a3.333 3.333 0 002.877 3.302 33.88 33.88 0 004.623.343 33.88 33.88 0 004.623-.343 3.333 3.333 0 002.872-3.118l.005-.184v-4.046a3.333 3.333 0 00-2.877-3.302c-.261-.036-.52-.07-.774-.099a3.335 3.335 0 00-2.807-1.905l-.209-.006zM12 9.5a3.333 3.333 0 110 6.667A3.333 3.333 0 0112 9.5zm0 1.5a1.833 1.833 0 100 3.667A1.833 1.833 0 0012 11zm5-1.333a.833.833 0 110 1.666.833.833 0 010-1.666z"
                  fill="currentcolor"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
        </div>

        {/* Next Addition */}
      </div>
      <div className="h-[70%] w-full"></div>
      <Button
        type="submit"
        variant="outline"
        className="font-bold h-10 px-5 rounded-xl ml-auto hover:shadow-2xl"
      >
        Save changes
      </Button>
    </form>
  );
};
export default Profile;
