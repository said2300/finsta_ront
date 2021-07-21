import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Image,
  Link,
  Center,
} from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box w="100%" h={["590px", "220px"]} bg="#F8F8FF" mt="50px">
      <Flex
        justifyContent={["space-between", "space-around"]}
        flexDirection={["column", "row"]}
        alignItems={["initial", "center"]}
      >
        <Box
          w={["100%", "18%", "20%", "18%"]}
          display={["flex", "initial", "initial", "initial"]}
          justifyContent="center"
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box w={["100px", "150px"]} mr="">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 172 183"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M34.928 39.962c6.684 7.92 13.942-.33 13.942-.33-8.366-8.328-13.942.33-13.942.33zm4.765 66.486c7.688 3.19 9.004-3.95 9.004-3.95-6.48-3.375-9.004 3.95-9.004 3.95zm-17.664-9.82c1.373 8.209 8.124 5.539 8.124 5.539-.577-7.284-8.124-5.538-8.124-5.538zM66.647 44.73c10.043 3.619 11.297-5.61 11.297-5.61-8.51-3.928-11.297 5.61-11.297 5.61zM91.95 31.038c-3.076 10.22 6.204 10.979 6.204 10.979 3.468-8.705-6.204-10.98-6.204-10.98zM129.63 50.2c-10.61 1.178-7.667 10.013-7.667 10.013 9.367-.223 7.666-10.013 7.666-10.013zm-.092-16.45c-11.695 1.627-8.156 13.637-8.156 13.637 13.112-3 8.156-13.637 8.156-13.637zm-6.324 84.88c13.45-.221 10.802-11.655 10.802-11.655-11.779-.826-10.802 11.656-10.802 11.656zm-40.342-80.1c7.261-1.646 4.532-7.54 4.532-7.54-6.476.888-4.532 7.54-4.532 7.54zm64.772 57.289c-7.311 1.409-4.774 7.389-4.774 7.389 6.502-.678 4.774-7.389 4.774-7.389zm-36.416 39.916c6.502-.678 4.774-7.39 4.774-7.39-7.311 1.41-4.774 7.39-4.774 7.39zm-44.043-3.27c-1.55 7.195 6.236 7.694 6.236 7.694 1.051-8.318-6.236-7.694-6.236-7.694zm-24.873-47.03c-7.71 1.571-4.857 9.41-4.857 9.41 8.596-2.542 4.857-9.41 4.857-9.41zm69.498-.208c8.596-2.542 4.858-9.411 4.858-9.411-7.712 1.57-4.858 9.411-4.858 9.411zM41.228 70.432c3.455-6.1-2.383-7.934-2.383-7.934-3.484 5.074 2.383 7.934 2.383 7.934zm17.274 18.282c-3.485 5.073 2.382 7.934 2.382 7.934 3.453-6.102-2.382-7.934-2.382-7.934zm.539 39.954c5.883 3.815 8.063-1.901 8.063-1.901-4.857-3.783-8.063 1.901-8.063 1.901zm41.86-90.122c.092 10.467 11.052 8.733 11.052 8.733-1.134-11.87-11.052-8.733-11.052-8.733zm9.137-1.092c6.697-9.864-2.942-13.775-2.942-13.775-6.606 8.118 2.942 13.775 2.942 13.775zm36.093 29.957c2.693-6.837-3.632-7.884-3.632-7.884-2.872 5.777 3.632 7.884 3.632 7.884zM83.893 22.163c3.267 7.55 10.672 2.942 10.672 2.942-4.451-8.247-10.672-2.942-10.672-2.942z"
                  fill="#c74d4d"
                />
                <path
                  d="M36.71 76.356c1.373 8.208 8.125 5.538 8.125 5.538-.577-7.283-8.125-5.538-8.125-5.538zm83.014 54.527c8.036-2.386 4.534-8.807 4.534-8.807-7.21 1.476-4.534 8.807-4.534 8.807zm-19.639-5.238c-7.212 1.476-4.534 8.807-4.534 8.807 8.037-2.387 4.534-8.807 4.534-8.807zm37.228-11.397c5.691-2.276 2.71-6.718 2.71-6.718-5.152 1.56-2.71 6.718-2.71 6.718zm-37.055 23.449c4.743 2.546 6.67-2.825 6.67-2.825-5.63-2.423-6.67 2.825-6.67 2.825zm11.905-50.968c-6.437 4.525-.683 10.567-.683 10.567 6.86-5.77.683-10.567.683-10.567zm-66.29-21.138c7.006-.241 5.521-6.174 5.521-6.174-6.147-.323-5.521 6.174-5.521 6.174zM22.59 82.971c9.233-4.706 2.853-13.651 2.853-13.651-10.015 6.248-2.853 13.65-2.853 13.65zm48.194 33.24c-6.429 6.395 1.283 12.136 1.283 12.136 6.667-7.893-1.283-12.137-1.283-12.137zM33.109 59.76c-5.867 4.477-.253 9.93-.253 9.93 6.219-5.66.253-9.93.253-9.93zm41.74-9.99c10.043 3.62 11.295-5.61 11.295-5.61-8.507-3.927-11.295 5.61-11.295 5.61zm33.89 22.778c10.042 3.62 11.294-5.61 11.294-5.61-8.507-3.926-11.295 5.61-11.295 5.61zM62.627 42.35c8.01-10.803-2.671-15.663-2.671-15.663-7.827 8.842 2.671 15.663 2.671 15.663zm39.222 85.072c12.44 5.112 14.529-6.434 14.529-6.434-10.492-5.418-14.53 6.434-14.53 6.434zm-42.151-5.346c8.361-.138 6.717-7.246 6.717-7.246-7.325-.514-6.717 7.246-6.717 7.246zm58.032-89.784c-6.253 3.856-1.821 8.486-1.821 8.486 5.761-2.9 1.821-8.486 1.821-8.486zm-17.448 10.992c-7.225 1.336-4.763 7.257-4.763 7.257 6.42-.623 4.763-7.257 4.763-7.257zm39.007 7.322c-8.967 1.659-5.914 9.008-5.914 9.008 7.97-.772 5.914-9.008 5.914-9.008zM128.32 80.482c2.719 10.49 13.293 5.995 13.293 5.995-4.119-11.634-13.293-5.995-13.293-5.995zM26.726 66.458c5.16-3.87.293-8.676.293-8.676-5.473 4.9-.293 8.676-.293 8.676zm32.59 64.714c-1.915 5.395 4.042 6.558 4.042 6.558 1.642-6.31-4.042-6.558-4.042-6.558zm-4.7-55.375c-4.09 6.12 2.965 9.45 2.965 9.45 4.04-7.347-2.966-9.45-2.966-9.45zM52.639 124.804c4.262 2.762 5.842-1.377 5.842-1.377-3.52-2.74-5.842 1.377-5.842 1.377zm-14.34-78.448C26.66 44.392 27.11 54.68 27.11 54.68c10.03 2.602 11.188-8.324 11.188-8.324zm4.674 67.564c-6.416 5.473.328 11.344.328 11.344 6.741-6.844-.328-11.344-.328-11.344zm106.39-30.72c6.5-6.75-1.597-12.509-1.597-12.509-6.71 8.3 1.597 12.509 1.597 12.509zM56.95 73.56c5.339-7.2-1.779-10.438-1.779-10.438-5.216 5.891 1.78 10.439 1.78 10.439zm-5.353-31.41C48.764 55.23 62.924 56.152 62.924 56.152 64.853 41.03 51.598 42.15 51.598 42.15zm26.444-21.015c-6.624 7.483 2.26 13.256 2.26 13.256 6.779-9.143-2.26-13.256-2.26-13.256zM50.915 37.79c4.434-5.981-1.48-8.67-1.48-8.67-4.332 4.892 1.48 8.67 1.48 8.67zm60.904 14.014c-6.467-.954-6.455 5.978-6.455 5.978 7.432.445 6.455-5.978 6.455-5.978zm7.383-4.935c-5.623 3.332-1.249 8.707-1.249 8.707 6.053-4.335 1.25-8.707 1.25-8.707zM21.966 84.92c-1.703 6.31 5.18 7.109 5.18 7.109 1.313-7.33-5.18-7.11-5.18-7.11zm24.379 39.213c-1.705 6.31 5.18 7.109 5.18 7.109 1.314-7.328-5.18-7.11-5.18-7.11zm85.51-82.956c-4.044 5.136 1.973 8.573 1.973 8.573 4.084-6.228-1.973-8.573-1.973-8.573zm11.197 33.547c-5.06.138-4.02 4.43-4.02 4.43 4.437.265 4.02-4.43 4.02-4.43zm-2.234-11.353c-5.06.138-4.019 4.43-4.019 4.43 4.438.263 4.02-4.43 4.02-4.43zM29.57 106.38c-1.168 9.712 9.2 9.415 9.2 9.415.366-11.137-9.2-9.415-9.2-9.415zm103.515-10.884c.282-7.441-6.115-6.323-6.115-6.323-.814 6.487 6.115 6.323 6.115 6.323zm13.92-2.088c5.86-2.895 1.907-8.588 1.907-8.588-6.365 3.863-1.908 8.588-1.908 8.588zm-24.811 7.897c-.812 6.487 6.116 6.323 6.116 6.323.284-7.44-6.116-6.323-6.116-6.323zm17.335-8.653c4.662.394 4.147-3.655 4.147-3.655-4.048-.698-4.147 3.655-4.147 3.655zm-40.799 30.5c8.035-2.386 4.534-8.805 4.534-8.805-7.211 1.475-4.534 8.805-4.534 8.805zm30.14 2.135c8.287-1.266 5.694-8.104 5.694-8.104-7.343.477-5.694 8.104-5.694 8.104zm-18.068-12.097c8.028 6.17 11.825-1.805 11.825-1.805-6.552-6.006-11.825 1.805-11.825 1.805zM47.737 116.4c8.028 6.17 11.823-1.804 11.823-1.804-6.55-6.007-11.823 1.804-11.823 1.804zM65.32 57.697c.069 7.869 8.31 6.566 8.31 6.566-.852-8.923-8.31-6.566-8.31-6.566zm33.273-.464c-2.932 7.302 5.185 9.232 5.185 9.232 2.608-8.576-5.185-9.232-5.185-9.232zM30.163 79.24c-2.931 7.304 5.186 9.233 5.186 9.233 2.606-8.576-5.185-9.233-5.185-9.233zm102.519-16.27c-5.698 1.16-3.587 6.953-3.587 6.953 6.35-1.878 3.587-6.953 3.587-6.953zm-32.436-40.353c-6.09 4.497-.421 10.178-.421 10.178 6.467-5.702.42-10.178.42-10.178zM49.28 57.67c-3.973-8.035-10.1-3.177-10.1-3.177 2.863 7.33 10.1 3.177 10.1 3.177zm-1.638-11.492c-6.795-2.797-7.938 3.51-7.938 3.51 5.73 2.963 7.938-3.51 7.938-3.51zm21.53-9.644c6.42-.62 4.763-7.256 4.763-7.256-7.223 1.337-4.763 7.256-4.763 7.256zm20.097 12.57c5.763-2.898 1.82-8.487 1.82-8.487-6.252 3.855-1.82 8.487-1.82 8.487zM73.618 23.737c-6.643-3.14-8.107 3.101-8.107 3.101 5.57 3.25 8.107-3.101 8.107-3.101zM86.41 81.271v6.009h6.008v-6.009H86.41zm-8.466 6.007h6.007V81.27h-6.007v6.008zm8.467 8.532h6.007v-6.007H86.41v6.007zm-8.467 0h6.007v-6.007h-6.007v6.007z"
                  fill="#8ae98a"
                />
                <path
                  d="M86.004 148.852c-3.633-3.544-6.626-7.758-8.384-12.539-3.38 5.153-2.546 11.705-.55 17.215-.64-.924-1.251-1.877-1.862-2.83-2.082 3.093-4.38 6.222-6.99 9.005-14.054.92-22.654 2.801-22.654 2.801h77.065a227.772 227.772 0 00-22.033-2.669c-5.255-3.125-10.218-6.677-14.592-10.983zm4.728-21.522c-2.731-4.201-7.233-6.788-11.786-8.58-2.755 6.747-1.679 14.533 1.886 20.76 4.895 8.626 12.8 15.233 21.5 19.798-5.879-5.89-8.985-13.8-11.462-21.592 1.649 2.009 2.355 4.56 3.634 6.782.039-5.873-.465-12.128-3.772-17.168zm45.818-27.157c3.2-2.74 6.856-4.93 10.89-6.183-4.93-.01-9.31 2.445-13.506 4.716-4.3-.387-8.486-1.528-12.449-3.22-.703-5.45-.265-11.51 3.342-15.921 3.922-4.849 10.269-6.744 16.237-7.437-6.041-.387-12.56.387-17.552 4.095 1.193-4.135-.926-8.057-3.3-11.277 1.385 3.057 2.557 6.408 1.854 9.81-.684 4.33-3.893 7.763-4.32 12.174-.844 3.28.468 7.05-1.587 9.983-1.905 2.841-5.074 4.432-8.09 5.827-.49-4.126-.643-8.282-.805-12.428l.031-3.077c.04-4.737.04-9.484.154-14.22.713-6.183 4.095-11.593 7.487-16.656-4.41 4.267-8.221 9.381-10.034 15.321-5.704-2.934-11.41-5.888-17.124-8.811 5.928-3.78 11.99-7.355 17.908-11.145-4.167 1.977-8.252 4.127-12.387 6.164-1.721-2.252-4.248-3.626-6.866-4.554 2.068 1.467 4.208 2.975 5.532 5.206-2.098 1.059-4.207 2.088-6.286 3.188a662.863 662.863 0 01-7.018-3.739c1.324-1.904 3.24-3.239 5.072-4.604-2.332.896-4.573 2.14-6.254 4.044-4.177-2.007-8.2-4.33-12.418-6.296 6.02 4.003 12.245 7.692 18.234 11.734-5.888 2.955-11.817 5.868-17.725 8.812-1.792-5.798-5.399-10.89-9.81-15.006 3.312 4.97 6.58 10.288 7.264 16.35.112 3.88.173 7.803.183 11.684v5.603c-.143 4.268-.326 8.546-.804 12.805-3.657-1.955-6.938-5.124-8.007-9.219.55-4.993-.378-10.187-2.945-14.537-2.384-4.187-2.14-9.28-.306-13.619-2.293 2.914-3.728 6.652-2.751 10.361-5.011-3.688-11.51-4.452-17.551-4.003 5.825.703 12.029 2.446 16.002 7.05 3.81 4.432 4.33 10.675 3.575 16.248-3.983 1.58-8.15 2.994-12.479 3.087-4.267-2.008-8.474-4.727-13.385-4.533 4.044 1.14 7.569 3.453 10.778 6.111a55.633 55.633 0 00-5.949 6.06c2.841-1.954 5.572-4.36 9.034-5.123 4.514-.591 9.078-.876 13.6-1.416.979.947 2.008 1.885 2.69 3.076-1.507 2.639-4.472 4.095-6.875 5.867 3.148-.652 6.121-2.027 8.505-4.196 3.83 3.535 8.354 6.203 13.112 8.261 6.041 2.75 12.622 4.615 17.847 8.864 2.18 1.71 3.78 4.004 5.39 6.235 1.353-2.496 2.434-5.492 1.241-8.283-1.477-4.217-5.907-6.06-9.655-7.803-5.666-2.476-11.522-4.472-17.298-6.673 0-9.779-.01-19.57.01-29.348 6.204-3.759 12.357-7.6 18.52-11.4 6.01 3.77 11.95 7.66 17.98 11.39.021 9.565.021 19.13-.01 28.685-4.91 1.61-9.922 2.995-14.678 5.063-.827.419-1.793.734-2.325 1.539 2.548 1.426 5.124 2.883 7.152 5.022 2.61-1.965 5.41-3.678 8.456-4.859 4.625-1.915 9.944-2.77 13.549-6.54 2.384 2.262 5.481 3.413 8.609 4.238-2.578-1.691-5.135-3.444-7.214-5.745 1.081-1.233 1.955-3.453 3.912-3.158 3.78.345 7.559.764 11.328 1.11 3.85.266 6.885 2.915 9.911 5.013-1.591-2.19-3.65-3.954-5.626-5.767z"
                  fill="#c74d4d"
                />
              </svg>
            </Box>
            <Heading color="#c74d4d" fontSize="22px">
              AtypikHouse
            </Heading>
          </Box>
        </Box>
        <Box mt="10px" fontSize="" ml={["30px", "0"]} mt="20px">
          <Text fontSize="xl">À propos</Text>

          <Text mt="15px">
            <Link href="/apropos/qui-sommes-nous">Qui sommes nous? </Link>
          </Text>

          <Text mt="5px">
            <Link href="/apropos/CGUV">C.G.U.V</Link>
          </Text>
          <Text mt="5px">
            <Link href="/apropos/politique-confidentialite">
              Politique de confidentialité
            </Link>
          </Text>
          <Text mt="5px">
            <Link href="/apropos/mention-legale">Mentions légales</Link>
          </Text>
        </Box>
        <Box mt="10px" fontSize="" ml={["30px", "0"]} mt="20px">
          <Text fontSize="xl">Assistance</Text>
          <Text mt="15px">
            <Link href="/apropos/informations-covid">
              Informations COVID 19
            </Link>
          </Text>
          <Text mt="5px">
            <Link href="/apropos/faq">F.A.Q</Link>
          </Text>
          <Text mt="5px">
            <Link href="/apropos/informations-proprietaires">
              Informations propriétaires
            </Link>
          </Text>
          <Link href="/formulaire-de-contact">
            <Text mt="5px">Contactez nous</Text>
          </Link>
        </Box>
        <Box
          mr={["0", "80px", "20px", "80px"]}
          fontSize="xl"
          display={["flex", "initial"]}
          justifyContent={["space-around", "initial"]}
          mb={["10px", "0"]}
          w={["100%", "initial"]}
          p={[5, 0]}
          mt={["0", "15px"]}
        >
          <Link
            target="_blank"
            href="https://www.facebook.com/AtypikHouse-100485912175952"
          >
            <Image
              w="50px"
              mt={["10px", "5px"]}
              src="/facelogo.png"
              alt="logo-facebook"
            ></Image>
          </Link>
          <Link target="_blank" href="https://www.twitter.com/house_atypik">
            <Image
              w="50px"
              mt={["10px", "10px"]}
              src="/twitterlogo.png"
              alt="logo-twitter"
            ></Image>
          </Link>
          <Link target="_blank" href="https://www.instagram.com/atypik_house">
            <Image
              w="50px"
              mt={["10px", "10px"]}
              src="/instagramlogo.png"
              alt="logo-instagram"
            ></Image>
          </Link>
        </Box>
      </Flex>
      <Flex
        justifyContent="center"
        textAlign="center"
        pt={["10px", "10px", "10px", "5px"]}
      >
        <Text w="100%" color="#000" bg="##C0C0C0" fontSize="14px">
          © 2021 Atypikhouse All rights reserved · Confidentialité ·
          Informations sur l'entreprise
        </Text>
      </Flex>
    </Box>
  );
};
