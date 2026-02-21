export const dynamic = "force-dynamic";
import PhotosPage from "@/components/PhotosPage/PhotosPage";
import getAllphoto from "@/utils/getAllphoto";

// ১. স্ট্যাটিক মেটাডেটা সেটআপ (SEO এর জন্য)
export const metadata = {
  title: "Photo Gallery | BWDO",
  description:
    "Explore our vibrant photo gallery showcasing the impactful moments and community initiatives of BWDO.",
  openGraph: {
    title: "Photo Gallery | BWDO",
    description:
      "Discover the inspiring moments captured in our photo gallery, highlighting the impact of BWDO's community initiatives.",
    type: "website",
  },
};

const GalleryPage = async () => {
  const photoGallery = await getAllphoto();
  console.log(photoGallery);
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <PhotosPage photoGallery={photoGallery}></PhotosPage>
    </div>
  );
};

export default GalleryPage;
