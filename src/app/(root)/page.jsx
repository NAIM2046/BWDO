import NewAndArticle from "@/components/NewAndArtical/NewAndArticle";
import FocusArea from "@/components/ourfouceArea/FocusArea";
import Slider from "@/components/slider/Slider";
import Volunteerism from "@/components/Volunteerism/Volunteerism";
import WhoAreWe from "@/components/WhoAreWe/WhoAreWe";
import { getSlideInfo } from "@/utils/getSlideInfo";

export default async function Home() {
  const slides = await getSlideInfo();
  return (
    <div>
      <Slider slides={slides}></Slider>
      <WhoAreWe></WhoAreWe>
      <FocusArea></FocusArea>
      <Volunteerism></Volunteerism>
      <NewAndArticle></NewAndArticle>
    </div>
  );
}
