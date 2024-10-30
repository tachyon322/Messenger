import Image from "next/image";
import Button from "@/components/ui/Button";
import { db } from "@/lib/db";

export default async function Home() {

  await db.set("hello", "world")

  return (
    <div className="">
      <Button variant={"default"}>BTN</Button>
    </div>
  );
}
