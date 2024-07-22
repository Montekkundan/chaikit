"use client";
import { Shoutout } from "@/components/shoutout";
import TeamTag from "@/components/tag";
import WordUp from "@/components/word-up";
import React from "react";


function TeamTagdemo() {
    return (
        <main>
            <div className="items-center justify-center h-[30vh] md:h-[70vh] lg:h-[90vh] dark:bg-black bg-white relative w-full">
                <TeamTag />
                <WordUp
                    className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
                    words="Meet our team!"
                />
                <div className="mx-auto p-2 md:p-20 w-full flex flex-col items-center gap-6 max-w-7xl 2xl:max-w-[1400px]">
                    <div className="flex w-full flex-col items-start gap-1 pl-6 pt-6 md:p-0">
                        <span className="w-full font-bold text-2xl">
                            Maker Shoutouts
                        </span>
                        <span className="w-full">
                            This couldn&#39;t have been built this without...
                        </span>
                    </div>
                    <div className="flex m-6 md:m-0 flex-col flex-wrap items-center gap-4 rounded border border-solid border-white shadow-sm">
                        <div className="flex w-full items-center gap-4 flex-col md:flex-row">
                            <Shoutout
                                image="/images/vercel.svg"
                                title="Vercel"
                                desc="For the tag tutorial."
                            />
                            <div className="flex w-px flex-none flex-col items-center gap-2 self-stretch" />
                            <Shoutout
                                image="/images/basementstudio.png"
                                title="Basement Studio"
                                desc="For the blogs and tutorial."
                            />
                            <div className="flex w-px flex-none flex-col items-center gap-2 self-stretch " />
                            <Shoutout
                                image="/images/shadcn.svg"
                                title="Shadcn UI"
                                desc="For the inspiration."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
}

export default TeamTagdemo;