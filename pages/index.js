import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Tabs } from "../components/Tabs";
import {useRouter} from 'next/router'
export default function Home({query}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Testing-app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Tabs initialTab={query}>
          <div label="Tab 1">
            <h2>Title 1</h2>
            <p>Text 1</p>
          </div>
          <div label="Tab 2">
            <h2>Title 2</h2>
            <p>Text 2</p>
          </div>
          <div label="Tab 3">
            <h2>Title 3</h2>
            <p>Text 3</p>
          </div>
        </Tabs>
      </main>
    </div>
  );
}

Home.getInitialProps = ({query}) =>{
  return {query};
}