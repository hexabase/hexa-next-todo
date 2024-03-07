import Head from 'next/head';
import styles from '../styles/Home.module.css';
import client, { Item } from './hexabase';
import SubTitle from "./tasks";

import { useState, useEffect } from 'react';

export default function Home() {
  // Input value
  const [login, setLogin] = useState(false);
  // Todo table
  const [datastore, setDatastore] = useState(null);
  // Tasks
  const [items, setItems] = useState<Item[]>([]);
  // Item
  const [item, setItem] = useState<Item>(null);
  // Status
  const [status, setStatus] = useState<string>(null);

  // 初期設定
  const init = async () => {
    await client.setToken(process.env.NEXT_PUBLIC_TOKEN!);
    await client.setWorkspace(process.env.NEXT_PUBLIC_WORKSPACE_ID!);
    setLogin(true);

    // プロジェクトの取得
    const project = await client.currentWorkspace.project(
        process.env.NEXT_PUBLIC_PROJECT_ID!
    );
    // データストアの取得
    const datastore = await project.datastore(
        process.env.NEXT_PUBLIC_DATASTORE_ID!
    );
    // Set datastore
    setDatastore(datastore);

    // Get tasks
    const items = await datastore.items();
    // Set tasks
    setItems(items);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Hexabase Demo - ToDo</title>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Hexabase Demo - ToDo</h1>
          <SubTitle />
          {login ? (
            <>
                <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.get<string>('Title')},
                        {item.get<string>('Assignee')},
                        {item.get<string>('Status')}
                    </li>
                ))}
                </ul>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </main>
      </div>
    </>
  );
}
