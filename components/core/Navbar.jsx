import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import useAuth from "@auth/context";

const MenuItems = ({ children }) => (
  <Text color="gray.500" mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const linksVisibleForAdmin = (
  <>
    <MenuItems>
      <Link href="/admin">Dashboard</Link>
    </MenuItems>
    <MenuItems>
      <Link href="/admin/gestionuser">Utilisateurs</Link>
    </MenuItems>
    <MenuItems>
      <Link href="/admin/gestionbien">Biens</Link>
    </MenuItems>
    <MenuItems>
      <Link href="/admin/gestionuser">Commentaires</Link>
    </MenuItems>
    <MenuItems>
      <Link href="/admin/gestioncategorie">Catégories</Link>
    </MenuItems>
  </>
);

const linksVisibleForHebergeur = (
  <>
    <MenuItems>
      <Link href="/hebergeurs">Dashboard</Link>
    </MenuItems>
    <MenuItems>
      <Link href="/hebergeurs">Dashboard</Link>
    </MenuItems>
  </>
);

export const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => setScroll(window.pageYOffset);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      color="white"
      // position={scroll ? "fixed" : "block"}
      // width="1500px"
      bg="rgba(255,255,255,0.8)"
      boxShadow="1px 1px 10px 0px #656565"
    >
      <IconButton
        size={"md"}
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        aria-label={"Open Menu"}
        display={{ md: !isOpen ? "none" : "inherit" }}
        onClick={isOpen ? onClose : onOpen}
      />
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          <Link href="/">
            <img
              src="/logotest.png"
              alt="Image of the logo"
              width={250}
              height={70}
            />
          </Link>
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="black"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
      >
        {user?.roles === "ROLE_ADMIN" && linksVisibleForAdmin}

        {user?.roles === "ROLE_PROPRIO" && linksVisibleForHebergeur}

        {user?.roles === "ROLE_USER" && (
          <>
            <MenuItems>
              <Link href="/categories">Nos biens Atypik</Link>
            </MenuItems>
            <MenuItems>
              <Link href="/inscription/hebergeur">Espace hébergeur</Link>
            </MenuItems>
          </>
        )}

        {isAuthenticated ? (
          <MenuItems>
            <div onClick={() => logout()}>Deconnexion</div>
          </MenuItems>
        ) : (
          <>
            <MenuItems>
              <Link href="/categories">Nos biens Atypik</Link>
            </MenuItems>
            <MenuItems>
              <Link href="/inscription/hebergeur">Espace hébergeur</Link>
            </MenuItems>
            <MenuItems>
              <Link href="/connexion">Se connecter</Link>
            </MenuItems>
            <MenuItems>
              <Link href="/inscription/utilisateur">S'inscrire</Link>
            </MenuItems>
          </>
        )}
        <MenuItems>
          <img
            src="/drapeau.png"
            alt="Image of the logo"
            width={25}
            height={25}
          />
        </MenuItems>
      </Box>
    </Flex>
  );
};
