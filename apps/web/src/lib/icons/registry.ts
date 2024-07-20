import {
  Loader2Icon,
  XIcon,
  SearchIcon,
  ChevronRightIcon,
} from "lucide-react";

type IconLibrary = "lucide" | "remix" | "radix" | "heroicons" | "feather";

interface IconDefinition {
  name: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>>;
}

interface Icons {
  [key: string]: {
    [key in IconLibrary]?: IconDefinition;
  };
}

const icons: Icons = {
  LoaderIcon: {
    lucide: { name: "Loader2Icon", icon: Loader2Icon },
  },
  XIcon: {
    lucide: { name: "XIcon", icon: XIcon },
  },
  SearchIcon: {
    lucide: { name: "SearchIcon", icon: SearchIcon },
  },
  ChevronRightIcon: {
    lucide: { name: "ChevronRightIcon", icon: ChevronRightIcon },
  },
};

export { icons };

