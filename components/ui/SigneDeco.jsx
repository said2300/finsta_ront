import { useRouter } from "next/router";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Center,
  Wrapper,
  Text,
  Link,
  Img,
} from "@chakra-ui/react";

export default function SigneDeco() {
  const router = useRouter();
  return (
    <Box
      w={["50px"]}
      h="40px"
      ml={["10px", "100px"]}
      pt={["20px", "10px"]}
      mb="50px"
    >
      <Box w={["50px", "50px"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 64 64"
        >
          <rect width="100%" height="100%" fill="none" />
          <g class="currentLayer">
            <g fill="#67e767">
              <path d="M36 29a1 1 0 001.707.707A12.573 12.573 0 0146.657 26H48v-2h-1.343c-3.136 0-6.12.978-8.607 2.79a15.957 15.957 0 014.657-10.083l-1.414-1.414A17.956 17.956 0 0036 28.071z" />
              <path d="M38 61V40.925c.331.041.664.075 1 .075a8.032 8.032 0 006.738-3.701A7.955 7.955 0 0049 38c4.411 0 8-3.589 8-8a7.926 7.926 0 00-1.757-5A7.926 7.926 0 0057 20c0-4.097-3.096-7.484-7.07-7.946.047-.349.07-.701.07-1.054 0-4.411-3.589-8-8-8a7.895 7.895 0 00-3.836.984A5.963 5.963 0 0033 1a6.007 6.007 0 00-5.051 2.792A5.919 5.919 0 0025 3c-1.85 0-3.593.876-4.721 2.331A7.948 7.948 0 0018 5c-4.411 0-8 3.589-8 8 0 1.419.381 2.812 1.09 4.029A8.03 8.03 0 007 24c0 2.852 1.557 5.486 4 6.906V36a1 1 0 001 1h1v2h-2v2h2v10h-2v2h2v4h2v-4h4v4h2v-4h2v-2h-2V41h2v-2h-2v-2h2.666A5.717 5.717 0 0126 41.605V61H1v2h62v-2zM13 35v-2h4v2zm13.899-6H31v2h-4v-1c0-.342-.035-.677-.101-1zM31 27h-5.026c-.914-1.207-2.348-2-3.974-2-1.641 0-3.088.806-4 2.031V27h-5v-4h18zm-13.899 2A4.995 4.995 0 0017 30v1h-4v-2zM19 30c0-1.654 1.346-3 3-3s3 1.346 3 3v5h-6zm8 3h4v2h-4zM14.414 21L22 13.414 29.586 21zM19 47h-4v-2h4zm-4 4v-2h4v2zm4-8h-4v-2h4zm0-4h-4v-2h4zm7.471-2H32a1 1 0 001-1V22a.994.994 0 00-.294-.708l-9.999-9.999a.999.999 0 00-1.414 0l-9.999 9.999A.994.994 0 0011 22v6.467A6.031 6.031 0 019 24c0-2.5 1.58-4.76 3.932-5.625a.998.998 0 00.428-1.572A6.008 6.008 0 0112 13c0-3.309 2.691-6 6-6 .792 0 1.563.153 2.293.456a1.002 1.002 0 001.251-.427A4.002 4.002 0 0125 5c.967 0 1.909.367 2.653 1.032a1.002 1.002 0 001.606-.401A4.007 4.007 0 0133 3a3.983 3.983 0 013.783 2.77c.101.309.345.55.655.646.31.095.648.034.905-.164A5.94 5.94 0 0142 5c3.309 0 6 2.691 6 6 0 .583-.086 1.164-.255 1.727a1 1 0 001.001 1.288L49 14c3.309 0 6 2.691 6 6a5.955 5.955 0 01-1.805 4.286 1 1 0 000 1.428A5.955 5.955 0 0155 30c0 3.309-2.691 6-6 6a5.982 5.982 0 01-3.138-.895 1 1 0 00-1.431.428A6.02 6.02 0 0139 39c-.332 0-.66-.032-.984-.086a9.17 9.17 0 012.691-6.207A9.18 9.18 0 0147.242 30H48v-2h-.758a11.164 11.164 0 00-7.949 3.293A11.169 11.169 0 0036 39.242V61h-4v-9h-2v9h-2V41.605A7.72 7.72 0 0026.471 37z" />
              <path d="M35 19l.056-.001c.283-.016.548-.152.726-.374l4-5-1.562-1.249-3.302 4.127-3.21-3.21-1.414 1.414 4 4A.993.993 0 0035 19zM32 41h2v9h-2z" />
            </g>
          </g>
        </svg>
      </Box>
    </Box>
  );
}