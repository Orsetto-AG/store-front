import Image from "next/image";

const BannerSection = () => {
  return (
    <div className="bg-gray-50 py-5"> 
      <div className="container mx-auto px-4">
        <div className="flex gap-1.5"> 
          <div className="basis-[67%] relative h-[192px] rounded-lg overflow-hidden group"> 
            <a
              href="/home"
              className="relative block w-full h-full"
            >
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop"
                alt="Special Offers"
                fill
                className="object-cover transition-transform transform group-hover:scale-105 group-hover:translate-y-[-5%] cursor-pointer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
              <div className="absolute bottom-3 w-full text-center text-white"> 
                <h2 className="text-xl sm:text-2xl font-bold mb-1"> 
                  Winter Sale
                </h2>
                <p className="text-xs sm:text-sm"> 
                  Up to 70% off on selected items
                </p>
              </div>
            </a>
          </div>

          <div className="basis-[33%] relative h-[192px] rounded-lg overflow-hidden group"> 
            <a
              href="/home"
              className="relative block w-full h-full"
            >
              <Image
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=600&fit=crop"
                alt="New Arrivals"
                fill
                className="object-cover transition-transform transform group-hover:scale-105 group-hover:translate-y-[-5%] cursor-pointer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 w-full text-center text-white"> 
                <h3 className="text-sm sm:text-lg font-bold mb-1"> 
                  New Arrivals
                </h3>
                <p className="text-xs"> 
                  Discover the latest trends
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
