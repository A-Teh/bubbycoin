function Coin() {
  return (
    <div className="flex justify-center items-center py-12 [perspective:1000px]">
      <div className="relative w-40 h-40 transition-transform duration-500">
        <div className="w-full h-full relative [transform-style:preserve-3d] animate-spin-y">
          
          {/* Front of the Coin */}
          <div className="absolute inset-0 w-full h-full rounded-full bg-yellow-500 border-4 border-yellow-600 shadow-[0_0_20px_rgba(234,179,8,0.5)] [backface-visibility:hidden]">
            <img 
              src="./BabyBubby.jpeg" 
              className="w-full h-full p-2 object-contain rounded-full" 
              alt="coin front" 
            />
          </div>

          {/* Back of the Coin (Rotated 180 degrees) */}
          <div className="absolute inset-0 w-full h-full rounded-full bg-yellow-600 border-4 border-yellow-700 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <img 
              src="./BabyBubby.jpeg" 
              className="w-full h-full p-2 object-contain rounded-full opacity-80" 
              alt="coin back" 
            />
          </div>
          
          {/* Optional: Coin Edge (gives it thickness) */}
          <div className="absolute inset-0 rounded-full border-[6px] border-yellow-700 [transform:translateZ(-1px)]"></div>
        </div>
      </div>
    </div>
  );
}

export default Coin