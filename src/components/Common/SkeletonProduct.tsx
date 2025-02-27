import React from "react";

type ProductSectionProps = {
  productStyle: string;
  limit: number;
};

const SkeletonProduct = ({
  productStyle,
  limit = 10,
}: ProductSectionProps) => {
  return (
    <div
      className={`w-full ${
        productStyle === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9"
          : "flex flex-col gap-7.5"
      }`}
    >
      {Array.from({ length: limit }).map((_, index) => (
        <div
          key={index}
          className={`flex flex-col gap-4 bg-white shadow-1 pl-3 pr-2.5 py-2.5 rounded-lg animate-pulse
            ${
              productStyle === "grid"
                ? "mx-auto h-[300px] w-[250px]"
                : "space-y-6 h-[250px] w-full "
            }
          `}
        >
          <div
            className={`bg-[#f3f4f6] ${
              productStyle === "grid" ? "h-1/2 w-full" : "h-full w-2/5 md:w-1/4"
            }`}
          ></div>
          <div className="w-3/4 h-4 bg-[#f3f4f6]"></div>
          <div className="w-1/4 h-4 bg-[#f3f4f6]"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonProduct;
