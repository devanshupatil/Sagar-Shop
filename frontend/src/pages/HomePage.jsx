// import React from 'react'
import image from "../assets/images/1.webp"
import image2 from "../assets/images/2.jpg"
import image3 from "../assets/images/3.webp"
import image4 from "../assets/images/4.jpg"
import image5 from "../assets/images/5.jpg"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const HomePage = () => {

    // const cart  = useSelector((state) => state.cart)
    const images = [image, image2, image3, image4, image5]
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((currentIndex + 1) % images.length)
        }, 10000)

        return () => clearInterval(interval)
    }, [currentIndex])

    const handleNext = () => {

        setCurrentIndex((currentIndex + 1) % images.length)
    }

    const handlePrev = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length)
    }

    return (
        <div>

            <button
                onClick={handlePrev}
                className="absolute left-5 top-80 transform -translate-y-1/2 z-10 bg-gray-600  shadow-md hover:bg-gray-700 rounded-full p-2 cursor-pointer">
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-5 top-80 transform -translate-y-1/2 z-10 bg-gray-600  shadow-md hover:bg-gray-700 rounded-full p-2 cursor-pointer">
                <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="relative  h-96 overflow-hidden cursor-pointer bg-black ml-10 mr-10">

                {/* Navigation Arrows */}

                {/* Background Image Container */}
                <div className="absolute inset-0">


                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-black/30">
                        <div className="flex flex-col items-center justify-center h-full text-white">

                            <img className="absolute inset-0 w-full h-full object-cover object-center" src={images[currentIndex]} alt="" />

                        </div>
                    </div>
                </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex py-2 bottom-4 space-x-2 cursor-pointer align-center justify-center">
                {[...Array(images.length)].map((_, i) => (
                    <div
                        key={i}
                        className={`h-2 w-2 rounded-full  ${i === currentIndex ? 'bg-orange-400' : 'bg-gray-300'
                            }`}
                    />
                ))}
            </div>



        </div>
    )
}

export default HomePage
