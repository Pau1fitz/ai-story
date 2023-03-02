import Head from "next/head";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { BodyText, HeaderText } from "@/components/Typography";
import styled from "@emotion/styled";
import { ChangeEvent, useState } from "react";

const BlackBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: #000;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #000;
    }
  }
`;

const Main = styled.main`
  min-width: 100%;
  min-height: 100vh;
  height: 100%;
  padding-bottom: 16px;
  background: linear-gradient(45deg, #aaffa9, #11ffbd);
`;

type StoryData = {
  text: string;
};

type ImagesData = {
  images: [string];
};

export default function Home() {
  const [text, setText] = useState("");
  const [story, setStory] = useState<StoryData>();
  const [images, setImages] = useState<ImagesData>();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: any) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const storyResponse = await fetch(`api/story`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const imagesResponse = await fetch(`api/images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const storyResponseData = await storyResponse.json();
      const imagesResponseData = await imagesResponse.json();

      if (storyResponse.status !== 200 || imagesResponse.status !== 200) {
        throw (
          storyResponseData.error ||
          imagesResponseData.error ||
          new Error(`Request failed with status ${storyResponse.status}`)
        );
      }

      setStory(storyResponseData.result);
      setImages(imagesResponseData.result);
      setText("");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const splitStory = story?.text
    .replace(/^[^A-Za-z]+/, "")
    .split(/\r?\n/)
    .filter((item: any) => item !== ", " && Boolean(item));

  return (
    <>
      <Head>
        <title>Story AI</title>
        <meta name="description" content="This is a story for AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? (
        <Main
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: "#000" }} />
        </Main>
      ) : (
        <Main>
          {!story ? (
            <Container maxWidth="lg" sx={{ height: "100vh" }}>
              <HeaderText sx={{ marginBottom: "16px" }}>StoryAI</HeaderText>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  maxWidth: "450px",
                  margin: "1rem 0",
                }}
              >
                <BlackBorderTextField
                  sx={{ width: "100%" }}
                  color="secondary"
                  rows={4}
                  label="Story Description"
                  id="outlined-textarea"
                  placeholder="Story description should go here... Stefan, Katie and their little Grayson went to the zoo and saw many animals"
                  multiline
                  onChange={handleInput}
                />
              </Box>

              <Button
                sx={{ background: "#000" }}
                variant="contained"
                onClick={onSubmit}
              >
                Create story
              </Button>
            </Container>
          ) : (
            <Container maxWidth="lg">
              <HeaderText sx={{ marginBottom: "16px" }}>StoryAI</HeaderText>
              <Grid container spacing={2}>
                {splitStory?.map((item: string, index: number) => (
                  <Grid key={index} item xs={12} sm={6}>
                    <Box style={{ flex: 1 }}>
                      <BodyText sx={{ marginBottom: "16px" }}>{item}</BodyText>
                      {images?.images?.length! > index && (
                        <Box>
                          <img
                            style={{ width: "100%", borderRadius: 6 }}
                            key={index}
                            src={`${images?.images[index]}`}
                          />
                        </Box>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          )}
        </Main>
      )}
    </>
  );
}
