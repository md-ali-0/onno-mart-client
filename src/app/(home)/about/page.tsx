
import AboutUsSection from "@/components/about/about-us";
import Breadcumb from "@/components/shared/breadcumb";
import { FC } from "react";

const AboutUsPage: FC = () => {
    return (
        <>
            <Breadcumb/>
            <AboutUsSection />
        </>
    );
};

export default AboutUsPage;
