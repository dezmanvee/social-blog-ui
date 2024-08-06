import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { Cancel02Icon } from "hugeicons-react";
import { Button } from "../../components/ui/button";

const SearchAndFilter = ({
  SubmitHandlerFilterByCategoryInput,
  filterByCategoryInputHandler,
  searchTerm,
  clearFilterHandler,
}) => {
  return (
    // <form
    //   onSubmit={SubmitHandlerFilterByCategoryInput}
    //   className="flex flex-col md:flex-row items-center gap-2 mb-4"
    // >
    //   <div className="flex-grow flex items-center border border-gray-300 rounded-lg overflow-hidden">
    //     <input
    //       type="text"
    //       placeholder="Search posts..."
    //       value={searchTerm}
    //       onChange={filterByCategoryInputHandler}
    //       className="flex-grow p-2 text-sm focus:outline-none"
    //     />
    //     <button
    //       type="submit"
    //       className="p-2 text-white bg-orange-500 hover:bg-blue-600 rounded-r-lg"
    //     >
    //       <FaSearch className="h-5 w-5" />
    //     </button>
    //   </div>
    //   <button
    //     onClick={clearFilterHandler}
    //     className="p-2 text-sm text-orange-500 border border-blue-500 rounded-lg hover:bg-blue-100 flex items-center gap-1"
    //   >
    //     <MdClear className="h-4 w-4" />
    //     Clear Filters
    //   </button>
    // </form>
    <div className="w-full lg:w-[16.25rem] lg:max-w-[19.5rem] xl:w-full xl:max-w-[25rem]">
      <form
        className="relative w-full"
        onSubmit={SubmitHandlerFilterByCategoryInput}
      >
        <div className="relative h-12 items-center rounded-xl !bg-background-subtle !px-3 lg:border lg:py-1 lg:backdrop-blur-[3.75rem] mx-2 lg:mx-auto lg:rounded-2xl flex px-4 overflow-hidden bg-surface-float border border-transparent cursor-text field-placeholder-color">
          {/* Handle Lense */}
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 pointer-events-none mr-3 text-gray-400"
          >
            <path
              d="M10 3.347c1.138 0 2.213.266 3.163.739-.255.462-.74.764-1.283.787l-.87.036A5.636 5.636 0 0010 4.818c-3.038 0-5.5 2.415-5.5 5.394 0 2.906 2.344 5.276 5.279 5.39l.221.004.221-.004c2.935-.114 5.279-2.484 5.279-5.39l-.003-.13.082-.215c.2-.524.676-.893 1.234-.967l.058-.005a6.771 6.771 0 01-.803 4.742 2.849 2.849 0 012.076.657l.157.143 1.872 1.836a2.731 2.731 0 010 3.916 2.864 2.864 0 01-3.852.13l-.14-.13-1.872-1.836a2.732 2.732 0 01-.818-2.19 7.062 7.062 0 01-3.491.914c-3.866 0-7-3.073-7-6.865 0-3.791 3.134-6.865 7-6.865zm5.37 12.13a1.28 1.28 0 00-.097 1.73l.096.106 1.872 1.836c.241.236.552.362.868.378h.135l.135-.013c.269-.04.527-.162.733-.365a1.28 1.28 0 00.097-1.73l-.097-.106-1.871-1.835a1.342 1.342 0 00-1.872 0zm.05-12.056l.044 1.013a2.493 2.493 0 001.648 2.225l.97.355c.457.167.35.83-.138.85l-1.033.044a2.592 2.592 0 00-.304.03l-.05.01c-.08.014-.159.032-.236.054l-.147.046-.18.07-.168.08-.113.063-.141.09-.164.121-.032.026c-.323.27-.579.62-.734 1.026l-.361.95a.43.43 0 01-.373.285h-.078l-.077-.012a.429.429 0 01-.34-.407l-.044-1.014a2.493 2.493 0 00-1.648-2.224l-.97-.355c-.457-.167-.35-.83.138-.85l1.034-.044c.3-.013.588-.077.855-.185l.109-.048c.175-.08.34-.178.49-.294l.148-.122.12-.114.136-.152.045-.056.078-.104.055-.082-.03.046a2.47 2.47 0 00.262-.505l.362-.95c.17-.45.846-.345.867.134z"
              fill="currentcolor"
              fill-rule="evenodd"
            ></path>
          </svg>
          {/* Serach Input */}
          <input
            type="text"
            placeholder="Search"
            autocomplete="off"
            data-search-panel-item="true"
            className="h-full flex-1 !placeholder-text-gray-400 text-gray-400 hover:text-white min-w-0  bg-transparent caret-text-link focus:outline-none "
            value={searchTerm}
            onChange={filterByCategoryInputHandler}
          />
          <div className="flex h-full items-center bg-background-subtle" />
          {/* Clear button*/}
          <div className="z-1 items-center gap-3 flex">
            <Button
              className="flex flex-1 h-10 rounded-xl text-gray-400 hover:text-white bg-surface-float hover:bg-slate-800"
              onClick={clearFilterHandler}
            >
              <Cancel02Icon className="text-[#FC538D] text-base" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default SearchAndFilter;
