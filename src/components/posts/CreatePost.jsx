import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createPostAPI } from "../../API/posts/postAPIs";


const CreatePost = () => {

  const postMutation = useMutation({
    mutationKey: ['create-post'],
    mutationFn: createPostAPI
  })
  const {data, isPending, isError, error, isSuccess } = postMutation 
  const formik = useFormik({
    //*initial values
    initialValues: {
      title: "",
      description: "",
    },
    //*validation
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    //*submit
    onSubmit: (values) => {
      const postData = {
        title: values.title,
        description: values.description
      }
      postMutation.mutate(postData)
    },
  });

  // get all states from useMutation hook
  
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {isPending && <p style={{color: 'blue', fontSize: '12px'}}>Loading...</p>}
        {isError && <p style={{color: 'red', fontSize: '12px'}}>{error?.response?.data?.message || error?.message}</p>}
        {isSuccess && <p style={{color: 'green', fontSize: '12px'}}>{data?.message}</p>}
        <input
          type="text"
          name="title"
          placeholder="Title"
          style={{ display: "flex", marginBlock: "10px" }}
          {...formik.getFieldProps("title")}
        />
        {formik.touched.title && formik.errors.title && (
          <div style={{ display: "flex", marginBlock: "10px", color: 'red', fontSize: '12px'}}>
            {formik.errors.title}
          </div>
        )}
        <input
          type="text"
          name="description"
          placeholder="Description"
          style={{ display: "flex", marginBlock: "10px" }}
          {...formik.getFieldProps("description")}
        />
        {formik.touched.description && formik.errors.description && (
          <div style={{ display: "flex", marginBlock: "10px", color: 'red', fontSize: '12px'}}>
            {formik.errors.description}
          </div>
        )}
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
export default CreatePost;
