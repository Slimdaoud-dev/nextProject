"use client";
import { ClickedProvider } from "./ClickedContext";
import MiniDrawer from "../../components/navbar/page";
import "./globals.css";

import React from "react";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClickedProvider>
        <div style={{display:'flex', marginTop:80 }}>
          <MiniDrawer/>
          <div style={{ flex:1  ,marginLeft:0}}>
          {children}
          </div>
          </div>
        </ClickedProvider>
      </body>
    </html>
  );
}
