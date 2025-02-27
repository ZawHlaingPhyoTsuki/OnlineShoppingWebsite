import { Product } from "@/types/product";
import SkeletonProduct from "../Common/SkeletonProduct";
import SingleGridItem from "../Shop/SingleGridItem";
import SingleListItem from "../Shop/SingleListItem";

type ProductSectionProps = {
  productStyle: string;
  products: Product[];
  isLoading: boolean;
  limit: number;
};

const ProductSection = ({
  productStyle,
  products,
  isLoading,
  limit = 10,
}: ProductSectionProps) => {
  if (isLoading)
    return <SkeletonProduct productStyle={productStyle} limit={limit} />;

  return (
    <div
      className={`${
        productStyle === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9"
          : "flex flex-col gap-7.5"
      }`}
    >
      {products &&
        products.length > 0 &&
        products.map((item, key) =>
          productStyle === "grid" ? (
            <SingleGridItem item={item} key={key} />
          ) : (
            <SingleListItem item={item} key={key} />
          )
        )}
    </div>
  );
};

export default ProductSection;