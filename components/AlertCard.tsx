import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";

import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Image from "next/image";

interface AlertCardProps {
  companyName: string;
  symbol: string;
  price: number;
  changePercent: number;

  closingPrice: number;
  icon?: React.ReactNode; // optional custom icon
}

const AlertCard = ({
  companyName,
  symbol,
  price,
  changePercent,
  closingPrice,

  icon,
}: AlertCardProps) => {
  const alertConditions = ["Once a day", "Once a month", "Once a minute"];
  const selectedCondition =
  alertConditions[Math.floor(Math.random() * alertConditions.length)];

  return (
    <Card className="w-full max-w-sm mx-auto border-[0.5px]!">
      <CardContent>
        <div className="flex gap-1">
          <div className="p-2  rounded-sm flex items-center justify-center">
            {icon && typeof icon === "string" ? (
              <Image src={icon} alt={companyName} width={48} height={48} />
            ) : (
              <span className="text-white font-bold">{symbol[0]}</span>
            )}
          </div>
          <section className="flex items-center justify-between w-full">
            <div>
              <h4 className="text-[#CCDADC]  max-w-24 truncate">{companyName}</h4>
              <p className="text-[#FFFFFF]">${price.toFixed(2)}</p>
            </div>
            <div>
              <h4 className="text-[#CCDADC]">{symbol}</h4>
              <p
                className={
                  changePercent >= 0 ? "text-[#0FEDBE]" : "text-red-400"
                }
              >
                {changePercent >= 0 ? "+" : ""}
                {changePercent.toFixed(2)}%
              </p>
            </div>
          </section>
        </div>

        
        <div className="h-[0.5px] w-full bg-[#313234] my-2"></div>

        
        <CardFooter className="flex gap-2 w-full">
          <section className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center">
              <p className="text-[#CCDADC]">Alert:</p>
              <span className="flex gap-2">
                <FaPencilAlt color="white" className="cursor-pointer" />
                <FaTrash color="white" className="cursor-pointer" />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[#FFFFFF] font-bold text-base">
                {`Price>$${closingPrice}`}
              </p>
              <span className="bg-[#FDD45833] text-[#FDD458] text-[10px] font-semibold py-1 px-2 rounded-sm">
               {selectedCondition}
              </span>
            </div>
          </section>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default AlertCard;
