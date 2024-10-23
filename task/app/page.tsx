"use client";
import { ConfigProvider } from "antd";
import { Layout } from "@/components";
import { antdStyles } from "@/antd";
import { NotesProvider } from "./Context";

export default function Home() {
  return (
    <NotesProvider>
      <ConfigProvider theme={antdStyles}>
        <Layout />
      </ConfigProvider>
    </NotesProvider>
  );
}
