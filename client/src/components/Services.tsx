
import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';
import { ReactNode } from 'react';
import { IconContainer } from '../globals/Globals';

const ServiceCard = ({ color, title, icon, subtitle }: { color: string, title: string, icon: ReactNode, subtitle: string }) => (
    <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className="ml-5 flex flex-col flex-1">
            <h3 className="mt-2 text-white text-lg">{title}</h3>
            <p className="mt-1 text-white text-sm md:w-9/12">
                {subtitle}
            </p>
        </div>
    </div>
)
const Services = () => {
    return (
        <div className="flex-col md:flex-row justify-center items-center flex w-full gradient-bg-services">
            <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
                <div className="flex-1 flex-col flex justify-start items-start">
                    <h1 className='text-white text-3xl sm:text-5xl text-gradient'>Services that we<br />
                        continue to imporve
                    </h1>
                    <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
                        The best choice for sending crypto with a gif of your choice
                    </p>
                </div>
                <div className="flex flex-1 flex-col justify-start items-center">
                    <ServiceCard
                        color="bg-[#2952E3]"
                        title="Security gurantee"
                        icon={
                            <IconContainer className="text-white">
                                <BsShieldFillCheck size={21} />
                            </IconContainer>
                        }
                        subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
                    />
                    <ServiceCard
                        color="bg-[#8945F8]"
                        title="Best exchange rates"
                        icon={
                            <IconContainer className="text-white" >
                                <BiSearchAlt size={21} />
                            </IconContainer>
                        }
                        subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
                    />
                    <ServiceCard
                        color="bg-[#F84550]"
                        title="Fastest transactions"
                        icon={
                            <IconContainer className="text-white" >
                                <RiHeart2Fill size={21} />
                            </IconContainer>
                        }
                        subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
                    />
                </div>
            </div>
        </div>
    )
}

export default Services