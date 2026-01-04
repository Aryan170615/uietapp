'use client'
import AnalystRoadmap from "@/components/dashboard/AnalystRoadmap";
import BackendRoadmap from "@/components/dashboard/BackendRoadmap";
import FrontendRoadmap from "@/components/dashboard/FrontendRoadmap";
import { useParams } from "next/navigation";

export default function RoadmapPage() {
  const params = useParams()
  // @ts-ignore
  console.log(params.specific[0])
  // @ts-ignore
  const choosen = params.specific[0] ?? "frontend"

  return <>
    {choosen == "frontend" && <FrontendRoadmap />}
    {choosen == "backend" && <BackendRoadmap />}
    {choosen == "data" && <AnalystRoadmap />}
  </>  

}
