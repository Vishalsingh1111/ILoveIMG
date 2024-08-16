import React from 'react';
import { FaCompress, FaExpandArrowsAlt, FaCrop, FaFileImage, FaMagic, FaSmile, FaSyncAlt } from 'react-icons/fa';
import Footer from '../Components/Footer';

const ToolCard = ({ icon, title, description, link }) => (
    <a href={link} className="block hover:shadow-lg transition-shadow duration-300 bg-white rounded-md">
        <div className="flex flex-col justify-between items-start border rounded-lg p-6 h-full space-y-2">
            <div>
                {icon}
            </div>
            <div className="flex items-center">
                <h2 className="text-gray-800 text-xl mt-1">{title}</h2>
            </div>
            <p className="text-gray-600 text-sm flex-grow">{description}</p>
        </div>
    </a>
);

const ToolGrid = () => {
    const tools = [
        {
            icon: <FaCompress className="text-green-500 text-5xl" />,
            title: 'Compress Image',
            description: 'Compress JPG, PNG, SVG, and GIFs while saving space and maintaining quality.',
            link: '/compressimg'
        },
        {
            icon: <FaExpandArrowsAlt className="text-blue-500 text-5xl" />,
            title: 'Resize Image',
            description: 'Define your dimensions, by percent or pixel, and resize your JPG, PNG, SVG, and GIF images.',
            link: '/resizeimg'
        },
        {
            icon: <FaCrop className="text-red-500 text-5xl" />,
            title: 'Crop Image',
            description: 'Crop JPG, PNG, or GIFs with ease. Choose pixels to define your rectangle or use our visual editor.',
            link: '/cropimage'
        },
        {
            icon: <FaFileImage className="text-yellow-500 text-5xl" />,
            title: 'Convert IMG to PDF',
            description: 'Turn PNG, GIF, TIF, PSD, SVG, WEBP, HEIC, or RAW format images to PDF in bulk with ease.',
            link: '/img2pdf'
        },
        {
            icon: <FaFileImage className="text-green-500 text-5xl" />,
            title: 'Convert JPG to PNG',
            description: 'Convert JPG images to PNG format with ease in bulk.',
            link: '/jpg2png'
        },
        {
            icon: <FaFileImage className="text-blue-500 text-5xl" />,
            title: 'Convert PNG to JPG',
            description: 'Convert PNG images to JPG format in bulk.',
            link: '/png2jpg'
        },
        {
            icon: <FaFileImage className="text-red-500 text-5xl" />,
            title: 'Convert PNG to GIF',
            description: 'Convert PNG images to GIF format. Create animated GIFs in seconds!',
            link: '/png2gif'
        },
        {
            icon: <FaFileImage className="text-gray-500 text-5xl" />,
            title: 'Convert Color to Black & White',
            description: 'Convert Colored images to Black & white Image. Change in seconds!',
            link: '/blackwhiteimage'
        },
        {
            icon: <FaMagic className="text-purple-500 text-5xl" />,
            title: 'Photo Editor',
            description: 'Enhance your pictures with text, effects, frames, or stickers. Simple editing tools for your image needs.',
            link: '/photoeditor'
        },
        {
            icon: <FaSmile className="text-pink-500 text-5xl" />,
            title: 'Meme Generator',
            description: 'Create memes online with ease. Caption meme images or upload your pictures to create memes.',
            link: '/memegenerator'
        },
        {
            icon: <FaSyncAlt className="text-blue-500 text-5xl" />,
            title: 'Rotate Image',
            description: 'Rotate JPG, PNG, or GIF images in bulk. Rotate only landscape or portrait images if needed.',
            link: '/rotateimage'
        }
    ];

    return (
        <>
            <div className="container mx-auto px-4 py-8 ">
                <h1 className="text-4xl font-semibold text-center mt-20 mb-8">Every tool you could want to edit images in bulk</h1>
                <p className="text-2xl text-center text-gray-600 mb-12">Your online photo editor is here and forever free!</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {tools.map((tool, index) => (
                        <ToolCard key={index} icon={tool.icon} title={tool.title} description={tool.description} link={tool.link} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ToolGrid;
