/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import AffiliateLayout from "@/layout/affiliate-layout";



export default function Affiliate() {
  return (
    <div className="flex flex-row justify-center">
      <div className="w-full max-w-[1440px] px-5 py-9 relative flex justify-center">
        <AffiliateLayout />
      </div>
    </div>
  );
}
