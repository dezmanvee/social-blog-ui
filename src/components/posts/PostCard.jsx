import { EyeIcon } from "hugeicons-react";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import truncateString from "../../lib/truncateString";
import { formatDistanceToNow } from "date-fns";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  return (
    <article
      className="group min-h-card snap-start relative max-h-cardLarge h-full flex flex-col p-2 rounded-2xl bg-background-subtle border border-slate-700 hover:border-slate-400 shadow-xl"
      onClick={() => navigate(`/details/${post?._id}`)}
    >
      <Link className="post_card_index focus-outline absolute inset-0 h-full w-full"></Link>
      {/* A link or button for small screen sizes */}
      {/* Post header */}
      <div className="relative m-2 flex gap-2">
        <div className="relative flex flex-row gap-2">
          <Link className="z-0 flex min-w-0 shrink items-center no-underline">
            <img
              src="https://res.cloudinary.com/daily-now/image/upload/s--3BoAETXw--/f_auto/v1717993214/squads/8a09782e-202a-450f-afda-d4dd3ae97589"
              alt=""
              className="object-cover w-8 h-8 rounded-full"
              loading="lazy"
              type="avatar"
            />
          </Link>
        </div>

        <div className="ml-2 mr-6 flex flex-1 overflow-auto text-sm line-clamp-1 break-words text-gray-400 justify-start items-end">
          <span className="max-w-full shrink truncate">Post Owner</span>
          <span className="mx-1 text-slate-300">•</span>
          <span>{formatDistanceToNow(new Date(post?.createdAt))} ago</span>
        </div>
      </div>

      {/*Description  */}
      <h3 className="line-clamp-3 px-2 font-bold !text-white mt-2 break-words multi-truncate font-bold text-xl">
        <div
          dangerouslySetInnerHTML={{
            __html: truncateString(post?.description, 100),
          }}
        />
      </h3>
      {/* Category */}
      <div className="relative flex flex-1">
        <div className="flex-1"></div>
        <div className="rounded border mt-4 border-slate-500 px-2 h-4 flex items-center justify-center text-xs font-bold text-slate-400 my-2">
          #{post?.category?.categoryName}
        </div>
      </div>
      {/* Post image */}
      <div className="relative flex flex-1 flex-col">
        <div className="flex-1"></div>
        <img
          src={post?.image?.path}
          alt={post?.image?.filename}
          className="mb-2 rounded-12 h-40 object-cover "
        />
      </div>
      {/*Card Footer Wrapper */}
      <div className="flex flex-row items-center justify-between">
        {/* Likes */}
        <div className="flex flex-row justify-center items-center rounded-xl bg-surface-float">
          <Button
            className={`font-bold h-8 px-3 rounded-lg pointer-events-auto ${
              post?.likes.length > 0 ? "text-green-500" : "text-slate-400"
            }`}
          >
            <span className="pointer-events-none relative">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 pointer-events-none"
              >
                <path
                  d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z"
                  fill="currentcolor"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </span>
            <span
              className={`flex h-5 min-w-[1ch] flex-col overflow-hidden ml-1.5 tabular-nums ${
                post?.likes.length > 0 ? "text-green-500" : "text-slate-400"
              }`}
            >
              {post?.likes.length}
            </span>
          </Button>
          {/* Divider for likes and dislikes */}
          <div className="box-border border border-surface-float py-2.5" />
          {/* dislikes */}
          <Button className="font-bold h-8 px-3 rounded-lg pointer-events-auto">
            <span
              className={`pointer-events-none relative ${
                post?.dislikes.length > 0 ? "text-red-500" : "text-slate-400"
              }`}
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 pointer-events-none rotate-180"
              >
                <path
                  d="M9.456 4.216l-5.985 7.851c-.456.637-.583 1.402-.371 2.108l.052.155a2.384 2.384 0 002.916 1.443l2.876-.864.578 4.042a2.384 2.384 0 002.36 2.047h.234l.161-.006a2.384 2.384 0 002.2-2.041l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115zm3.57.613c.16.114.298.253.411.411l5.897 7.736a.884.884 0 01-.973 1.36l-3.563-1.069a.884.884 0 00-1.129.722l-.678 4.75a.884.884 0 01-.875.759h-.234a.884.884 0 01-.875-.76l-.679-4.75a.884.884 0 00-1.128-.72l-3.563 1.068a.884.884 0 01-.973-1.36L10.56 5.24a1.767 1.767 0 012.465-.41z"
                  fill="currentcolor"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </span>
            <span
              className={`flex h-5 min-w-[1ch] flex-col overflow-hidden ml-1.5 tabular-nums ${
                post?.dislikes.length > 0 ? "text-red-500" : "text-slate-400"
              }`}
            >
              {post?.dislikes.length}
            </span>
          </Button>
        </div>
        {/* Comment */}
        <div className="flex flex-row items-stretch select-none text-white">
          <Button
            className={`font-bold h-8 w-8 p-0 rounded-lg pointer-events-auto ${
              post?.comments.length > 0 ? "text-[#2cdce6]" : "text-slate-400"
            }`}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 pointer-events-none"
            >
              <path
                d="M8.084 3.217a35.447 35.447 0 017.05-.078l.782.078.279.031c1.089.121 1.885.372 2.606.828a4.516 4.516 0 011.664 1.86c.336.69.5 1.423.53 2.361l.005.321v3.975a4.493 4.493 0 01-3.545 4.392l-.207.04-2.089.346-2.86 2.992-.147.135c-.986.789-2.399.623-3.205-.324-.532-.625-.616-1.34-.51-2.29l.029-.224.038-.254.033-.187-1.332-.189a5.011 5.011 0 01-1.677-.55l-.253-.146-.243-.16a4.777 4.777 0 01-1.491-1.721 4.935 4.935 0 01-.532-1.972l-.009-.3V8.618c0-1.096.162-1.915.535-2.683.375-.77.94-1.4 1.664-1.859.649-.41 1.359-.655 2.288-.788l.318-.04.28-.031zm7.666 1.491a33.948 33.948 0 00-6.752-.075l-.748.075-.28.031c-.915.102-1.481.297-1.97.606a3.016 3.016 0 00-1.116 1.247c-.228.468-.357.989-.38 1.76l-.004.266v3.563c0 .577.134 1.116.375 1.587.242.471.592.874 1.024 1.18.37.263.801.453 1.276.554l.242.043 1.98.283c.339.048.457.096.575.175.119.078.262.187.27.386l-.002.024-.013.08-.164.741-.064.333c-.111.63-.167 1.332.09 1.634.263.309.7.39 1.037.187l.089-.062 2.998-3.135.13-.101.092-.063.077-.04.08-.03.035-.01.087-.02L17 15.545a2.993 2.993 0 002.495-2.77l.005-.182V8.618c0-.921-.13-1.506-.384-2.026A3.016 3.016 0 0018 5.345c-.44-.278-.943-.464-1.706-.572l-.265-.034-.279-.03zm-.55 6.294l.093.005c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005c-.398-.044-.707-.36-.707-.745 0-.38.301-.694.691-.744l.109-.007h6.4zm0-3.5l.093.004c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005C8.309 8.953 8 8.637 8 8.252c0-.38.301-.694.691-.744l.109-.007h6.4z"
                fill="currentcolor"
                fill-rule="evenodd"
              ></path>
            </svg>
          </Button>
          <label className="cursor-pointer items-center font-bold flex !pr-0">
            <span
              className={`flex h-5 min-w-[1ch] flex-col overflow-hidden text-sm ${
                post?.comments.length > 0 ? "text-[#2cdce6]" : "text-slate-400"
              }`}
            >
              {post?.comments.length}
            </span>
          </label>
        </div>
        {/* Views */}
        <div className="flex flex-row items-stretch select-none text-white">
          <Button
            className={`font-bold h-8 w-8 p-0 rounded-lg pointer-events-auto ${
              post?.viewers.length > 0 ? "text-orange-400" : "text-slate-400"
            }`}
          >
            <EyeIcon className="w-5 h-5 text-sm" />
          </Button>
          <label className="cursor-pointer items-center font-bold flex !pr-0">
            <span
              className={`flex h-5 min-w-[1ch] flex-col overflow-hidden text-sm ${
                post?.viewers.length > 0 ? "text-orange-400" : "text-slate-400"
              }`}
            >
              {post?.viewers.length}
            </span>
          </label>
        </div>
      </div>
    </article>
  );
};
export default PostCard;
