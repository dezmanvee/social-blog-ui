import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { createPlanAPI } from "../../API/plans/planAPIs";
import LoadingAlert from "../../components/alerts/LoadingAlert";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/LoadingAlert";

const CreatePlan = () => {
    const navigate = useNavigate();

    const planMutation = useMutation({
        mutationKey: ['create-plan'],
        mutationFn: createPlanAPI
    })
    //!Formik Configuration
    const formik = useFormik({
        //*Initail values
        initialValues: {
            planName: '',
            features: 'Limited features, No supports, 50 Posts',
            price: "0.00",
        },

        //*schema for validation
        validationSchema: Yup.object({
            planName: Yup.string().required('Plan name is required'),
            features: Yup.string().required('features are required'),
            price: Yup.string().required('price is required'),
        }),

        //* Submit form
        onSubmit: async(values) => {
            const postData = {
                planName: values?.planName,
                features: values?.features.split(',').map(feature => feature.trim()),
                price: values?.price
            }
            planMutation.mutateAsync(postData)
              .then(() => {
                //Navigate to user dashboard
                navigate('/dashboard')
              })
              .catch(err => console.log(err))
        }
    })
    const {data, isError, isSuccess, isPending, error} = planMutation;
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={formik.handleSubmit}
          className="p-6 mt-8 bg-white rounded shadow-md w-80"
        >
          <h2 className="mb-4 text-xl font-semibold text-center text-gray-700">
            Create Plan
          </h2>
          {/* show mesage */}
          {/* error */}
          {isPending && <LoadingAlert loading="Loading" loadingMsg="Please wait..." />}
          {isError && <DangerAlert error="Error" errorMsg={error?.response?.data?.message || error?.message} />}
          {isSuccess && <SuccessAlert success="Success" successMsg={data?.message} />}
  
          {/* Type Name Input */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Plan:
            </label>
            <select
              id="planName"
              {...formik.getFieldProps("planName")}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            >
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>
            {formik.touched.planName && formik.errors.planName && (
              <div className="text-red-500 mt-1">{formik.errors.planName}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Features (comma separated):
            </label>
            <input
              type="text"
              id="features"
              {...formik.getFieldProps("features")}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            {formik.touched.features && formik.errors.features && (
              <div className="text-red-500 mt-1">{formik.errors.features}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Price:
            </label>
            <input
              type="number"
              id="price"
              {...formik.getFieldProps("price")}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            {formik.touched.price && formik.errors.price && (
              <div className="text-red-500 mt-1">{formik.errors.price}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-orange-500 rounded hover:bg-orange-600 focus:outline-none focus:shadow-outline"
          >
            Create Plan
          </button>
        </form>
      </div>
    );
  };
  
  export default CreatePlan;