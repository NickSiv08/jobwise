import Image from "next/image";
import React from "react";

interface RoleChoiceProps {
  title: String;
  isActive: Boolean;
  icon: String;
  onClick: () => void;
  description: string;
}

const RoleChoice = ({
  title,
  isActive,
  icon,
  onClick,
  description,
}: RoleChoiceProps) => {
  return (
    <div
      className={`w-full md:w-1/2 transition duration-500 px-6 md:px-16 py-4 xl:py-18 border border-2 rounded-md ${isActive && "border-blue-400"} flex flex-col items-center`}
      onClick={onClick}
    >
      <Image
        src={`/${icon}.png`}
        alt="Candidate"
        width={200}
        height={200}
        className="object-cover"
      />
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      <p className="text-gray-400 text-center mt-6 text-lg">{description}</p>
    </div>
  );
};

export default RoleChoice;
