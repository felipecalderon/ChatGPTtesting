import React from 'react';
import Image from 'next/image';
import { fetchimg } from "@/app/img/fetchimg"

export default async function Button(){
    try {
        const {data} = await fetchimg()
        return <Image src={data.msje} width={512} height={512} alt='probando chatgpt'/>
    } catch (error) {
        return error
    }
}