import NewAndArticle from "@/components/NewAndArtical/NewAndArticle";
import FocusArea from "@/components/ourfouceArea/FocusArea";
import Slider from "@/components/slider/Slider";
import Volunteerism from "@/components/Volunteerism/Volunteerism";
import WhoAreWe from "@/components/WhoAreWe/WhoAreWe";

export default function Home() {
  return (
    <div>
      <Slider></Slider>
      <WhoAreWe></WhoAreWe>
      <FocusArea></FocusArea>
      <Volunteerism></Volunteerism>
      <NewAndArticle></NewAndArticle>
    </div>
  );
}
