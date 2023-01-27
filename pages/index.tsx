import Head from "next/head";
import StitchesLogo from "../components/StitchesLogo";
import { styled } from "../stitches.config";
import { Client, Mnemonic } from "jmes";

const Box = styled("div", {});

const Text = styled("p", {
  fontFamily: "$system",
  color: "$hiContrast",
});

const Button = styled("button", {});

const Link = styled("a", {
  fontFamily: "$system",
  textDecoration: "none",
  color: "$purple600",
});

const Container = styled("div", {
  marginX: "auto",
  paddingX: "$3",

  variants: {
    size: {
      1: {
        maxWidth: "300px",
      },
      2: {
        maxWidth: "585px",
      },
      3: {
        maxWidth: "865px",
      },
    },
  },
});

const client = new Client({
  providers: {
    faucetAPI: {
      endpoint: {
        api_url: "http://localhost:3002",
      },
    },
  },
});

const mnemonic = new Mnemonic(
  "shrimp various silver merge kidney kitten winter pluck smooth kidney enemy bulb script plug private margin leader repair enact clever duck woman luxury muscle"
);

const sendTransaction = async () => {
  const wallet = await client.createWallet(mnemonic);
  const account = await wallet.getAccount();

  const res = await account.sendTransaction(
    {
      recipientAddress: "jmes1jg4hs0qnytzl873zme2hp378na64z2e75v8xn7",
      recipientAmount: 200,
    },
    "http://51.38.52.37:1889"
  );
  console.log({ res });
  return res;
};

export default function Home() {
  return (
    <Box css={{ paddingY: "$6" }}>
      <Head>
        <title>Use Stitches with Next.js</title>
      </Head>
      <Container size={{ "@initial": "1", "@bp1": "2" }}>
        <Button
          onClick={async () => {
            await sendTransaction();
          }}
        >
          Send
        </Button>
      </Container>
    </Box>
  );
}
