"use client";

import BoneList from "@/components/bone-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const BonesPage = () => {
  return ( 
    <div className="container mx-auto py-10">
      <BoneList/>
    </div>
   );
}
 
export default BonesPage;
