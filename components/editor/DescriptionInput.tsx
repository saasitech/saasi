import { usePricingStore } from "@/lib/store";
import { ContentEditButton } from "../ContentEditableButton";
import ContentEditableInput from "./ContentEditable";

export const DescriptionInput = () => {
  const pricingStore = usePricingStore((state) => state);
  const handleChange = (value) => {
    pricingStore.setDescription(value);
  };
  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <label htmlFor="description" className="label-text flex-1">
          Description
        </label>
        <div className="space-x-1">
          <ContentEditButton cmd="italic" name="i" />
          <ContentEditButton cmd="bold" name="b" />
          <ContentEditButton
            cmd="underline"
            name="u"
            arg="https://saasi.vercel.app/terms"
            className="tooltip-top-left"
          />
        </div>
      </div>
      <ContentEditableInput
        value={pricingStore.description}
        onChange={handleChange}
      />
    </div>
  );
};
