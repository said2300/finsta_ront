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

export default function ArrowBack() {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()}>
      <Box
        w={["50px"]}
        h="40px"
        pl={["10px", "80px"]}
        pt={["20px", "30px"]}
        mb="10px"
      >
        <Box w={["50px", "60px"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 443.52 443.52"
          >
            <rect width="100%" height="100%" fill="none" />
            <g class="currentLayer">
              <path
                d="M143.492 221.863L336.226 29.129c6.663-6.664 6.663-17.468 0-24.132-6.665-6.662-17.468-6.662-24.132 0l-204.8 204.8c-6.662 6.664-6.662 17.468 0 24.132l204.8 204.8c6.78 6.548 17.584 6.36 24.132-.42 6.387-6.614 6.387-17.099 0-23.712L143.492 221.863z"
                fill="#8ae98a"
              />
            </g>
          </svg>
        </Box>
      </Box>
    </Button>
  );
}
