import Image from "next/image";
import Button from "./components/button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-dvh gap-20">
      <h1 className="text-4xl font-bold">Welcome To Quizzer</h1>
      <div className="flex gap-10">
        <Button name="Login" link="/login"/>
        <Button name="Register" link="/register"/>
      </div>
    </main>
  );
}
