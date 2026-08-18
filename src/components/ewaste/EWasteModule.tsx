"use client"

import * as React from "react"
import { EwasteIntro } from "./EwasteIntro"
import { EarthCalculator } from "./EarthCalculator"
import { ActivityWall } from "./ActivityWall"

export function EWasteModule() {
  return (
    <div className="w-full flex flex-col font-sans">
      <EwasteIntro />
      <EarthCalculator />
      <ActivityWall />
    </div>
  )
}
