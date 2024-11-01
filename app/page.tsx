import Button from "@/components/ui/Button";
import { db } from "@/lib/db";

export default async function Home() {

  interface UserMock {
    name: string
  }

  const user = {

  }

  return (
    <div className="">
      <Button variant={"default"}>BTN</Button>
    </div>
  );
}
