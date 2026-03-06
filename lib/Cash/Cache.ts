import { unstable_cache as nextcash } from "next/cache";
import {cache as reactcash } from 'react'

/// Next Js Cashing & React Caching 

export function cache(cp : any, keyparts : string [], options : {
 revalidate?: number | false; tags?: string[]; 
}){
    return  nextcash (reactcash(cp), keyparts, options)
}