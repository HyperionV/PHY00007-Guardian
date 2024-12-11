import React from "react";
import { Layout } from "../components/layout";

export default function About() {
    return (
        <Layout>
            <div className="flex">
                <img src="../../public/intro1.png" alt="intro" className="w-full h-1/6"/>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-7">
                <img src= "../../public/intro2.png" alt="intro" className="w-full h-full"/>
                <img src= "../../public/intro3.png" alt="intro" className="w-full h-full"/>
            </div>
        </Layout>
    );
}