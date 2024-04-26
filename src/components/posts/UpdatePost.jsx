import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { postAPI, updatePostAPI } from "../../API/posts/postAPIs";
import { useFormik } from "formik";
import * as Yup from "yup";

const UpdatePost = () => {
  const { postId } = useParams();

  const { data } = useQuery({
    queryKey: ["single-post"],
    queryFn: () => postAPI(postId),
  });

  const updateMutation = useMutation({
    mutationKey: ["update-post"],
    mutationFn: updatePostAPI
  });

  const formik = useFormik({
    initialValues: {
      title: data?.post?.title || '',
      description: data?.post?.description || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string(),
      description: Yup.string(),
    }),
    onSubmit: (values) => {
        const postData = {
            title: values.title,
            description: values.description,
            postId
        }
      updateMutation.mutate(postData);
    },
  });

  const {error, isError, isPending, isSuccess } = updateMutation

  return (
    <>

      <h2>You are about to edit - {data?.post?.title}</h2>

        {isPending && <p style={{color: 'blue', fontSize: '12px'}}>Loading...</p>}
        {isError && <p style={{color: 'red', fontSize: '12px'}}>{error?.message}</p>}
        {isSuccess && <p style={{color: 'green', fontSize: '12px'}}>Post updated successfully</p>}
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          style={{ display: "flex", marginBlock: "10px" }}
          {...formik.getFieldProps("title")}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          style={{ display: "flex", marginBlock: "10px" }}
          {...formik.getFieldProps("description")}
        />
        <button type="submit">update</button>
      </form>
    </>
  );
};
export default UpdatePost;
