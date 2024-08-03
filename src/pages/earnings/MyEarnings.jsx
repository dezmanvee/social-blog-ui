import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../components/ui/card";
import { myEarningsAPI } from "../../API/earnings/earningsAPIs";
import {htmlToText} from 'html-to-text'
import truncateString from "../../lib/truncateString.js";


const MyEarnings = () => {
  const { data } = useQuery({
    queryKey: ["my-earnings"],
    queryFn: myEarningsAPI,
  });

  return (
    <Card className="max-w-[800px] m-auto">
      <CardHeader className="bg-gradient-to-r from-[#22c1c3] to-[#fdbb2d] rounded-t-xl">
        <CardTitle>Earnings</CardTitle>
        <CardDescription className="text-white">
          Earnings are calculated based on the number of post(s) viewed
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data?.myEarnings?.length <= 0 ? (
          <div className="mt-4">You have no earnings</div>
        ) : (
          <div className="mt-4">
            {data?.myEarnings?.map((earnings) => (
              <div
                key={earnings._id}
                className="mb-4 grid grid-cols-[25px_1fr_60px] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {truncateString(htmlToText(earnings?.post?.description), 20) || "Untitled post"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                  {new Date(earnings.calculatedOn).toLocaleDateString()}
                  </p>
                </div>
                <small className="text-sm font-medium leading-none">
                  $ {earnings?.amount?.toFixed(2)}
                </small>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default MyEarnings;
