import { Category } from "@/types/category";
import { Label } from "../ui/label";

const CategoryRowItem = ({
  item,
  handleRowClicked,
  checkedCategory,
}: {
  item: Category;
  handleRowClicked: (categoryName: string) => void;
  checkedCategory: string | null;
}) => {
  return (
    <div className="w-full flex justify-between items-center cursor-pointer">
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          id={item.name}
          checked={checkedCategory === item.id}
          onChange={() => handleRowClicked(item.id)}
          className="h-4 w-4 rounded border-gray-300 bg-white checked:bg-blue hover:bg-blue-light active:bg-blue-dark focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
        />
        <Label htmlFor={item.name} className="cursor-pointer text-start">
          {item.name}
        </Label>
      </div>
      <span className="rounded-full bg-meta w-5 h-5 text-center flex items-center justify-center">
        {item.products.length}
      </span>
    </div>
  );
};

export default CategoryRowItem;
