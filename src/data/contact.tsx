import Contact from "@/types/contact";
import USER from "./user";
import {
  SiSpotify,
  SiSpotifyHex,

  SiX,
} from "@icons-pack/react-simple-icons";
import Linkedin from "@/components/icons/linkedin";
import {InstagramIcon} from "lucide-react";

const CONTACT: Contact[] = [
    {
        title: "Instagram",
        url: USER.social.instagram,  // Corrected the path to the URL
        icon: <InstagramIcon />,          // Use the imported icon component
        color: "#E4405F",             // Added a brand color for Instagram
    },
  {
    title: "Linkedin",
    url: USER.social.linkedin,
    icon: <Linkedin />,
    color: "#0a66c2",
  },
  {
    title: "Twitter",
    url: USER.social.twitter,
    icon: <SiX />,
    color: "",
  },
  {
    title: "Spotify",
    url: USER.social.spotify,
    icon: <SiSpotify />,
    color: SiSpotifyHex,
  },
];


export default CONTACT;
