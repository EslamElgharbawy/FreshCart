import TextareaAutosize from "react-textarea-autosize";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/store.hooks";

export default function ReviewForm() {
    const { productDetails} = useAppSelector(
        (store) => store.ProductSlice,
      );
  return (
    <>
      <h3 className="text-xl text-[#333] font-semibold mb-2">
        Be the first to review “{productDetails?.title}”
      </h3>
      <form action="">
        <p className="text-sm text-textMain mb-4">
          Your email address will not be published. Required fields are marked *
        </p>
        <div className="grid w-full mb-5 gap-6">
          <InputGroup className="!rounded-none !border-[#ebebeb]">
            <TextareaAutosize
              minRows={6}
              data-slot="input-group-control"
              className="flex field-sizing-content focus:placeholder:opacity-0 placeholder:!text-[#777] text-[#999] w-full resize-y bg-transparent px-5 py-2.5 placeholder:!text-sm text-sm placeholder:transition-opacity placeholder:duration-300 outline-none"
              placeholder="Write Your Review Here…"
            />
          </InputGroup>
          <div className="flex sm:max-xl:flex-col justify-center items-center gap-5">
            <InputGroup className="!rounded-none !border-[#ebebeb] py-5">
              <InputGroupInput
                type="text"
                placeholder="Your Name"
                className="focus:placeholder:opacity-0 placeholder:!text-[#777] text-[#999] w-full bg-transparent px-4 placeholder:!text-sm text-sm placeholder:transition-opacity placeholder:duration-300 outline-none"
              />
            </InputGroup>
            <InputGroup className="!rounded-none !border-[#ebebeb] py-5">
              <InputGroupInput
                type="email"
                placeholder="Your Email"
                className="focus:placeholder:opacity-0 placeholder:!text-[#777] text-[#999] w-full bg-transparent px-4 placeholder:!text-sm text-sm placeholder:transition-opacity placeholder:duration-300 outline-none"
              />
            </InputGroup>
          </div>
        </div>
        <Button className="bg-[#454545] uppercase rounded-none text-white py-3 px-7 font-semibold h-auto hover:bg-opacity-95">
          submit review
        </Button>
      </form>
    </>
  );
}
