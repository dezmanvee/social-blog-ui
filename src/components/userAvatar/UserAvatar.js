const UserAvatar = ({ user }) => {
  return (
    <img
      src={
        user?.profilePicture ||
        user?.profilePicture?.path ||
        "https://github.com/shadcn.png"
      }
      alt={`${user?.username || "User"}'s profile`}
      className="inset-0 w-auto h-auto m-auto object-cover"
      loading="lazy"
      onError={(e) => {
        e.target.onerror = null; // Prevent infinite loop if fallback also fails
        e.target.src =
          user?.profilePicture?.path || "https://github.com/shadcn.png";
      }}
    />
  );
};
export default UserAvatar;
