export default function NavigationBar() {
    return(
        <div className="flex flex-row justify-between px-4 pt-3">
            <img src="logo.svg" alt="logo" className="w-10 h-auto"/>
            <div className="flex flex-row gap-3 ">
                <div className="rounded-full bg-components_bg flex items-center justify-center w-11 h-11 bg-component_bg">
                    <img src="home.svg" alt="home" className="w-6 h-6" />
                </div>

                <div className="flex flex-row relative">
                    <input type="text" className="rounded-3xl w-96 pl-10  bg-component_bg focus:outline-none focus:border-blue-500 focus:ring-2" placeholder="What do you want to listen?"/>
                    <img src="search.svg" alt="search" className="w-5 h-auto absolute top-3 left-3 border-none"/>
                </div>
            </div>
            <h1>Weclome!</h1>
        </div>
    );
}