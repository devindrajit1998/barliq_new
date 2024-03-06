import React from "react";
import { useSelector } from "react-redux";

const BarStock = (props) => {
  const { info } = props;
  const Master = useSelector((state) => state.Master);

  if (info.length > 0) {
    return (
      <div className="overflow-y-scroll h-12">
        {info.map((item) => (
          <div className="mb-2 w-24">
            <div>
              Bar:
              <span className="font-bold px-1 text-red-500">
                {
                  Master.getBarResponse?.data?.find(
                    (bar) => bar.id == item.barId
                  )?.name
                }
              </span>
            </div>
            Stock:{" "}
            <span className="font-bold text-green-500">
              {item.currentCount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return <div>Not Found</div>;
};

export default BarStock;
