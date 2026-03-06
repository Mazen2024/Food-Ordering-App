
const MainHeading = ({title, subtitle} : {title : string, subtitle : string}) => {
  return (
    <>
        <span className="uppercase text-gray-400 font-semibold leading-4">{subtitle}</span> 
        <h2 className="text-primary font-bold text-4xl italic mt-4">{title}</h2>
    </>
  )
}

export default MainHeading
