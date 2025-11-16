import PhotosPage from "@/components/PhotosPage/PhotosPage";
import getAllphoto from "@/utils/getAllphoto";


// const photoGallery = [
//   {
//     id: 1,
//     src: "https://i.ibb.co.com/5XXXDsqv/photo1.jpg",
    
//     subtitle: "Majestic Mountain Range at Sunrise"
//   },
//   {
//     id: 2,
//     src: "https://i.ibb.co.com/1fMPXfTg/gallerycover-webp.webp",
   
//     subtitle: "Artistic Gallery Exhibition Space"
//   },
//   {
//     id: 3,
//     src: "https://i.ibb.co.com/RTcSvjF/premium-photo-1661677425561-ac8dda0082b2.jpg",
    
//     subtitle: "Professional Studio Photography Setup"
//   },
// ];

const GalleryPage = async () => {
  const photoGallery = await getAllphoto();
  console.log(photoGallery)
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <PhotosPage photoGallery={photoGallery}></PhotosPage>
    </div>
  );
};

export default GalleryPage;