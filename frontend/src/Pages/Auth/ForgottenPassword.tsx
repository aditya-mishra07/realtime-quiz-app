import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgottenPassword() {
  return (
    <div className="flex h-screen justify-center bg-purple-400 items-center">
      <div className="bg-white flex flex-col rounded-lg justify-center gap-5 p-4">
        <h1 className=" text-2xl">Forgot password</h1>
        <h4 className=" text-gray-400">
          Enter your email and we'll send you a link to reset your password
        </h4>
        <Input type="text" placeholder="example@gmail.com" />
        <Button className="bg-purple-500 w-36 ml-40">Send Link</Button>
      </div>
    </div>
  );
}
