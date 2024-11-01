"use client";

import { FC, useState } from "react";
import Button from "./ui/Button";
import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";

interface AddFriendButtonProps {}

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {

    type FormData = z.infer<typeof addFriendValidator>;

    const [showSuccessState, setShowSuccessState] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(addFriendValidator),
    })

  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });
      await axios.post("/api/friends/add", {
        email: validatedEmail,
      })
      setShowSuccessState(true);

    } catch (error) {
        if (error instanceof z.ZodError) {
            setError("email", { message: error.message });
        }

        if (error instanceof AxiosError) {
            setError("email", { message: error.response?.data.message });
        }

        setError("email", { message: "Something went wrong" });
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  }

  return (
    <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="email"
        {...register("email")}
        className="block text-sm font-medium leading-6 text-gray-900"></label>
      <div className="mt-2 flex gap-4">
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="JohnDoe@example.com"
        />
        <Button>Add</Button>
      </div>
      <p className="mt-1 text-sm text-red-700">
        {errors.email?.message}
      </p>
      {showSuccessState ? (
        <p className="mt-2 text-sm text-green-700">
          Successfully added JohnDoe@example.com to your friends list!
        </p>
      ) : null}
    </form>
  );
};

export default AddFriendButton;
