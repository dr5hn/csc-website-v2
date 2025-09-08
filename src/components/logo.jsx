import WorldIcon from "@/icons/World";

export default function Logo() {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <WorldIcon />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-dark">CountryStateCityAPI</span>
        {/* <span className="text-xs text-lightgray -mt-1">by Nexus Labs</span> */}
      </div>
    </div>
  );
}
