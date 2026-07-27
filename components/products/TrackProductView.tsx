"use client"

import {useEffect} from "react"
import {trackProductView} from "@/actions/recentlyViewed"


export function TrackProductView({productId}:{ productId:string }){

    useEffect(()=>{trackProductView(productId)},[productId])
    
    return null
}