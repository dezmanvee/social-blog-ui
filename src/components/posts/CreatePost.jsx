import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createPostAPI } from "../../API/posts/postAPIs";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";


const CreatePost = () => {
  const [description, setDescription] = useState('')
  const postMutation = useMutation({
    mutationKey: ['create-post'],
    mutationFn: createPostAPI
  })
  const {data, isPending, isError, error, isSuccess } = postMutation 
  const formik = useFormik({
    //*initial values
    initialValues: {
      description: "",
    },
    //*validation
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
    }),
    //*submit
    onSubmit: (values) => {
      const postData = {
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

          <ReactQuill 
            value={formik.values.description}
            onChange={(value) => {
              setDescription(value)
              formik.setFieldValue("description", value)
            }}
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
