import { BadgeCheck, MapPin } from "lucide-react";
import USER from "@/data/user";
import { Section } from "@/components/layout/section";
import { useAppScroll } from "../providers/scroll";

export default function Introduction() {
    const { appSectionRefs } = useAppScroll();

    return (
        <Section ref={appSectionRefs.introduction}>
            <div className="flex flex-col gap-4">
                <img
                    src={`https://i.postimg.cc/SN4gLr2s/20250913-153846.jpg`}
                    className="w-24 rounded-full ring-1 ring-primary ring-offset-4 ring-offset-background"
                />

                <div className="flex gap-2 items-center">
                    <span className="text-2xl font-semibold">{USER.displayName}</span>
                    <BadgeCheck className="size-4 text-primary" />
                </div>

                <span className="text-muted-foreground">{USER.bio}</span>

                <div className="flex gap-1 flex-wrap items-center text-muted-foreground">
                    <MapPin className="size-4" />
                    <span>{USER.location}</span>
                </div>
            </div>
        </Section>
    );
}