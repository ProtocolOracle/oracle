"use client";
import { Bone, getBoneList } from "@/lib/consts";
import BoneCard from "./bone-card";
import { use, useEffect, useState } from "react";

const ActivityBones = () => {
  const [data, setData] = useState<Bone[]>();
  useEffect(() => {
    getBoneList().then((data) => setData(data));
  }
  , []);

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {data && data.map((bone) => (
          <BoneCard bone={bone} key={bone.tick} />
        ))}
      </div>
    </div>
  );
};

export default ActivityBones;
