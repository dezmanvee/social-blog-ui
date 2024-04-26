import { useQuery } from "@tanstack/react-query";
import { allPostsAPI, deletePostAPI } from "../../API/posts/postAPIs";
import {useNavigate} from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const AllPosts = () => {
  const navigate = useNavigate()
    const {data, isPending, isError, error, isSuccess, refetch} = useQuery({
        queryKey: ['all-posts'],
        queryFn: allPostsAPI
    })


    const deleteMutation = useMutation({
      mutationKey: ['delete-post'],
      mutationFn: deletePostAPI
    })

    const deleteHandler = (postId) => {
      deleteMutation.mutateAsync(postId).then(() => {
        refetch()
      }).catch((err) => console.log(err))
      
    }
  return (
    <div>
        {isPending && <p style={{color: 'blue', fontSize: '12px'}}>Loading...</p>}
        {isError && <p style={{color: 'red', fontSize: '12px'}}>{error?.message}</p>}
        {isSuccess && <p style={{color: 'green', fontSize: '12px'}}>{data?.message}</p>}
      {data?.allPosts.map(post =>(
        <div key={post?._id}>
          <h2>{post?.title}</h2>
          <p>{post?.description}</p>
          <button onClick={() => navigate(`/update/${post?._id}`)}>Edit</button>
          <button onClick={() => deleteHandler(post?._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
export default AllPosts