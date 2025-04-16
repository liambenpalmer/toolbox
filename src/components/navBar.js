

export default function SideNav({showComponent, setShowComponent}) {
const links = [
    {name: 'SVG to PATH', value: 'svg-to-path'},
    {name: 'SVG to CSS', value: 'svg-to-css'},
    {name: 'Colour scheme', value: 'colour-scheme'},
    {name: 'Hex to paint', value: 'hex-to-paint'},
    {name: 'JSON Editor', value: 'json-editor'}
]
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">

        <div className="w-32 text-white md:w-40">
          {/* <AcmeLogo /> */}
          ALMA TOOLBOX
        </div>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {links.map((link)=> <span
            key={link.name}
            onClick={()=> setShowComponent(link.value)}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <p className="">{link.name}</p>
          </span>)}
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
