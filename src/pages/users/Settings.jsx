import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../components/ui/card";
  import { EnvelopeClosedIcon, CheckIcon, AvatarIcon, Pencil1Icon } from "@radix-ui/react-icons";
  import { Link, useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate()
  return (
    <Card className="max-w-md w-full mt-5 mx-auto">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Update email and profile picture.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Link to="/dashboard/update-account-email">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
            <EnvelopeClosedIcon />
            <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                Email
                </p>
                <p className="text-sm text-muted-foreground">
                Update account email.
                </p>
            </div>
            <CheckIcon className="h-4 w-4" />
            </div>
        </Link>
        <Link to="/dashboard/update-profile-photo">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
            <AvatarIcon />
            <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                Profile Picture
                </p>
                <p className="text-sm text-muted-foreground">
                Upload a profile photo.
                </p>
            </div>
            <CheckIcon className="h-4 w-4" />
            </div>
        </Link>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => navigate('/dashboard/create-post')}>
          <Pencil1Icon className="mr-2 h-4 w-4" /> Continue to explore
        </Button>
      </CardFooter>
    </Card>
  )
}
export default Settings